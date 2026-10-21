import { useCopy } from '../i18n/useCopy';
import React, { useState, useEffect } from 'react';
import {
  Star,
  CheckCircle2,
  ThumbsUp,
  MessageSquare,
  Sparkles,
  Send,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  User,
} from 'lucide-react';
import { Product, ProductReview, UserProfile } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { REVIEWS_I18N } from '../i18n/reviewsTranslations';
import {
  subscribeProductReviews,
  addProductReviewToFirestore,
  voteReviewHelpfulInFirestore,
} from '../services/firebaseService';

interface ProductReviewsSectionProps {
  product: Product;
  user: UserProfile | null;
  onShowToast?: (msg: string) => void;
}

export const ProductReviewsSection: React.FC<ProductReviewsSectionProps> = ({
  product,
  user,
  onShowToast,
}) => {
  const copy = useCopy();
  const { language } = useLanguage();
  const revI18n = REVIEWS_I18N[language] || REVIEWS_I18N.vi;

  const SKIN_TYPES = revI18n.skinTypes;

  // Reviews state with Firestore live sync and local cache fallback
  const [reviews, setReviews] = useState<ProductReview[]>(() => {
    try {
      const saved = localStorage.getItem('alps_product_reviews');
      if (saved) {
        const parsed: ProductReview[] = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter((r) => r.id.startsWith('rev-user-'));
        }
      }
    } catch {}
    return [];
  });

  // Subscribe to real-time reviews in Firestore for this product
  useEffect(() => {
    try {
      const unsubscribe = subscribeProductReviews(product.id, (firestoreReviews) => {
        if (firestoreReviews && firestoreReviews.length > 0) {
          setReviews((prev) => {
            const others = prev.filter((r) => r.productId !== product.id);
            const merged = [...firestoreReviews, ...others];
            try {
              localStorage.setItem('alps_product_reviews', JSON.stringify(merged));
            } catch {}
            return merged;
          });
        }
      });
      return () => unsubscribe();
    } catch (e) {
      console.warn('Could not subscribe to Firestore reviews:', e);
    }
  }, [product.id]);

  // Helpful clicks state
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('alps_liked_reviews');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {};
  });

  // Filter state
  const [selectedRatingFilter, setSelectedRatingFilter] = useState<number | 'all'>('all');

  // Review Form toggle & fields
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [ratingInput, setRatingInput] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [authorNameInput, setAuthorNameInput] = useState(user?.name || '');
  const [skinTypeInput, setSkinTypeInput] = useState(SKIN_TYPES[0]);
  const [titleInput, setTitleInput] = useState('');
  const [commentInput, setCommentInput] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  // Sync author name if user logs in
  useEffect(() => {
    if (user?.name && !authorNameInput) {
      setAuthorNameInput(user.name);
    }
  }, [user]);

  // Persist reviews
  const saveReviews = (newReviews: ProductReview[]) => {
    setReviews(newReviews);
    try {
      localStorage.setItem('alps_product_reviews', JSON.stringify(newReviews));
    } catch {}
  };

  // Persist helpful likes
  const handleToggleHelpful = (reviewId: string) => {
    const isCurrentlyLiked = !!likedReviews[reviewId];
    const newLiked = { ...likedReviews, [reviewId]: !isCurrentlyLiked };
    setLikedReviews(newLiked);
    try {
      localStorage.setItem('alps_liked_reviews', JSON.stringify(newLiked));
    } catch {}

    let updatedCount = 0;
    const updated = reviews.map((r) => {
      if (r.id === reviewId) {
        updatedCount = isCurrentlyLiked ? Math.max(0, r.helpfulCount - 1) : r.helpfulCount + 1;
        return {
          ...r,
          helpfulCount: updatedCount,
        };
      }
      return r;
    });
    saveReviews(updated);

    voteReviewHelpfulInFirestore(reviewId, updatedCount).catch(() => {});
  };

  // Filter reviews by current product
  const productReviews = reviews.filter((r) => r.productId === product.id);

  // Ratings calculation
  const totalCount = productReviews.length;
  const averageRating =
    totalCount > 0
      ? (productReviews.reduce((sum, r) => sum + r.rating, 0) / totalCount).toFixed(1)
      : '0.0';

  const starCounts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  productReviews.forEach((r) => {
    if (starCounts[r.rating] !== undefined) {
      starCounts[r.rating]++;
    }
  });

  // Filtered list
  const displayedReviews =
    selectedRatingFilter === 'all'
      ? productReviews
      : productReviews.filter((r) => r.rating === selectedRatingFilter);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!authorNameInput.trim()) {
      setFormError(revI18n.validationError);
      return;
    }

    if (!commentInput.trim()) {
      setFormError(revI18n.validationError);
      return;
    }

    const defaultTitle =
      language === 'vi'
        ? 'Trải nghiệm rất ưng ý'
        : language === 'de'
        ? 'Sehr zufrieden mit der Wirkung'
        : language === 'es'
        ? 'Experiencia muy positiva'
        : language === 'zh'
        ? '非常满意的护肤体验'
        : 'Very pleasant experience';

    const brandResponse =
      language === 'vi'
        ? 'Alps trân trọng cảm ơn quý khách đã tin dùng và để lại đánh giá quý báu!'
        : language === 'de'
        ? 'Alps bedankt sich herzlich für Ihr Vertrauen und Ihre wertvolle Bewertung!'
        : language === 'es'
        ? '¡Alps le agradece sinceramente su confianza y su valiosa reseña!'
        : language === 'zh'
        ? 'Alps 瑞士团队衷心感谢您的信任与宝贵评价！'
        : 'Alps sincerely thanks you for your trust and thoughtful review!';

    const newReview: ProductReview = {
      id: `rev-user-${Date.now()}`,
      productId: product.id,
      userId: user?.uid || undefined,
      authorName: authorNameInput.trim(),
      rating: ratingInput,
      date: new Date().toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-US'),
      isVerifiedBuyer: true,
      skinType: skinTypeInput,
      title: titleInput.trim() || defaultTitle,
      comment: commentInput.trim(),
      helpfulCount: 0,
      responseFromBrand: brandResponse,
    };

    const updatedList = [newReview, ...reviews];
    saveReviews(updatedList);

    // Save to Cloud Firestore
    addProductReviewToFirestore(newReview).catch((err) => {
      console.warn('Review saved locally, could not push to Firestore:', err);
    });

    // Reset form
    setTitleInput('');
    setCommentInput('');
    setIsFormOpen(false);

    if (onShowToast) {
      onShowToast(revI18n.submitSuccessToast);
    }
  };

  const ratingDescriptions: Record<number, string> = {
    1: language === 'vi' ? '1 sao: Rất thất vọng' : language === 'de' ? '1 Stern: Enttäuscht' : language === 'es' ? '1 estrella: Decepcionado' : language === 'zh' ? '1 星：不推荐' : '1 Star: Disappointed',
    2: language === 'vi' ? '2 sao: Chưa hài lòng' : language === 'de' ? '2 Sterne: Nicht zufrieden' : language === 'es' ? '2 estrellas: Poco satisfecho' : language === 'zh' ? '2 星：一般' : '2 Stars: Fair',
    3: language === 'vi' ? '3 sao: Bình thường' : language === 'de' ? '3 Sterne: Durchschnittlich' : language === 'es' ? '3 estrellas: Aceptable' : language === 'zh' ? '3 星：尚可' : '3 Stars: Average',
    4: language === 'vi' ? '4 sao: Hài lòng & Tốt' : language === 'de' ? '4 Sterne: Gut & wirksam' : language === 'es' ? '4 estrellas: Muy bueno' : language === 'zh' ? '4 星：好评' : '4 Stars: Very Good',
    5: language === 'vi' ? '5 sao: Tuyệt vời, rất khuyên dùng!' : language === 'de' ? '5 Sterne: Hervorragend!' : language === 'es' ? '5 estrellas: ¡Excelente!' : language === 'zh' ? '5 星：极其推荐！' : '5 Stars: Excellent!',
  };

  return (
    <div className="space-y-6 pt-1">
      {/* 1. RATING SUMMARY OVERVIEW BOX */}
      {totalCount === 0 ? (
        <div className="p-6 sm:p-8 bg-white rounded-2xl sm:rounded-3xl border border-[#202022]/8 text-center space-y-3 shadow-2xs">
          <div className="w-12 h-12 rounded-full bg-[#f6f3ee] text-[#74584d] flex items-center justify-center mx-auto">
            <Star className="w-6 h-6 text-[#74584d]" />
          </div>
          <div className="space-y-1">
            <h4 className="font-serif text-lg font-medium text-[#1c1c19]">
              {copy(revI18n.noReviewsTitle)}
            </h4>
            <p className="text-xs text-[#77767b] max-w-md mx-auto leading-relaxed">
              {copy(revI18n.noReviewsDesc)}
            </p>
          </div>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="inline-flex items-center space-x-2 bg-[#1c1c19] hover:bg-black text-white px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#fed8c9]" />
              <span>{copy(isFormOpen ? revI18n.closeFormBtn.toUpperCase() : revI18n.writeReviewBtn.toUpperCase())}</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="p-5 sm:p-6 bg-white rounded-2xl sm:rounded-3xl border border-[#202022]/8 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Average Rating Score */}
            <div className="md:col-span-4 text-center md:text-left md:border-r md:border-[#202022]/8 md:pr-6">
              <div className="text-[11px] uppercase tracking-wider text-[#74584d] font-semibold">
                {copy(language === 'vi' ? 'ĐÁNH GIÁ CHUNG' : language === 'de' ? 'GESAMTBEWERTUNG' : language === 'es' ? 'VALORACIÓN MEDIA' : language === 'zh' ? '综合评分' : 'OVERALL RATING')}
              </div>
              <div className="flex items-baseline justify-center md:justify-start space-x-2 mt-1">
                <span className="font-serif text-4xl sm:text-5xl font-bold text-[#1c1c19]">
                  {copy(averageRating)}
                </span>
                <span className="text-[#77767b] text-base font-light">{"/ 5.0"}</span>
              </div>

              {/* Stars row */}
              <div className="flex items-center justify-center md:justify-start space-x-1 mt-2 text-amber-500">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.round(Number(averageRating))
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-[#e5e2dd]'
                    }`}
                  />
                ))}
              </div>

              <div className="text-xs text-[#77767b] mt-2">
                {copy(language === 'vi' ? `Dựa trên ${totalCount} lượt đánh giá thực tế` : language === 'de' ? `Basierend auf ${totalCount} Kundenbewertungen` : language === 'es' ? `Basado en ${totalCount} opiniones verificadas` : language === 'zh' ? `基于 ${totalCount} 条真实用户评价` : `Based on ${totalCount} authentic reviews`)}
              </div>

              <div className="mt-3 flex items-center justify-center md:justify-start space-x-1 text-[11px] text-[#8a9a86] font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{copy(revI18n.verifiedBuyerBadge)}</span>
              </div>
            </div>

            {/* Star Distribution Progress Bars */}
            <div className="md:col-span-5 space-y-1.5">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = starCounts[stars] || 0;
                const percent = totalCount > 0 ? Math.round((count / totalCount) * 100) : 0;
                const isSelected = selectedRatingFilter === stars;

                return (
                  <button
                    key={stars}
                    type="button"
                    onClick={() =>
                      setSelectedRatingFilter(selectedRatingFilter === stars ? 'all' : stars)
                    }
                    className={`w-full flex items-center space-x-2 text-xs py-0.5 px-1.5 rounded-lg transition-colors group cursor-pointer ${
                      isSelected ? 'bg-[#fed8c9]/25 font-bold text-[#74584d]' : 'hover:bg-[#f6f3ee]'
                    }`}
                  >
                    <div className="flex items-center space-x-1 w-12 shrink-0">
                      <span className="font-medium text-[#1c1c19] group-hover:text-[#74584d]">
                        {copy(stars)}
                      </span>
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    </div>

                    <div className="flex-grow h-2 bg-[#f0ede9] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>

                    <span className="text-[11px] text-[#77767b] w-9 text-right shrink-0">
                      {copy(count)}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Call-to-action button to write review */}
            <div className="md:col-span-3 text-center md:text-right flex flex-col justify-center items-center md:items-end">
              <button
                type="button"
                onClick={() => setIsFormOpen(!isFormOpen)}
                className="px-5 py-3 rounded-full text-xs font-semibold tracking-wider bg-[#1c1c19] hover:bg-black text-white transition-all shadow-sm active:scale-98 flex items-center space-x-2 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#fed8c9]" />
                <span>{copy(isFormOpen ? revI18n.closeFormBtn.toUpperCase() : revI18n.writeReviewBtn.toUpperCase())}</span>
                {isFormOpen ? (
                  <ChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
              </button>
              <span className="text-[10px] text-[#77767b] mt-1.5">
                {copy(language === 'vi' ? 'Nhận ngay 20 điểm Alps Pure Privileges' : language === 'de' ? '+20 Alps Treuepunkte' : language === 'es' ? '+20 Puntos Alps Privileges' : language === 'zh' ? '立享 20 尊享积分' : '+20 Alps Privileges Points')}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 2. EXPANDABLE REVIEW SUBMISSION FORM */}
      {isFormOpen && (
        <form
          onSubmit={handleSubmitReview}
          className="p-5 sm:p-6 bg-white rounded-2xl sm:rounded-3xl border-2 border-[#74584d]/30 shadow-md space-y-4 animate-in fade-in slide-in-from-top-2"
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#202022]/8">
            <h3 className="font-serif text-base font-semibold text-[#1c1c19] flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#74584d]" />
              <span>{copy(revI18n.formTitle)}{": "}{copy(product.name)}</span>
            </h3>
            <span className="text-[11px] text-[#8a9a86] font-medium flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{copy(revI18n.verifiedBuyerBadge)}</span>
            </span>
          </div>

          {formError && (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
              {copy(formError)}
            </div>
          )}

          {/* Star selector */}
          <div>
            <label className="block text-xs font-semibold text-[#1c1c19] mb-1">
              {"1. "}{copy(revI18n.ratingLabel)} {" *"}</label>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRatingInput(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 focus:outline-none transition-transform hover:scale-110 cursor-pointer"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= (hoverRating || ratingInput)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-[#d6d4cf]'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <span className="text-xs font-medium text-[#74584d] ml-2">
                {copy(ratingDescriptions[hoverRating || ratingInput])}
              </span>
            </div>
          </div>

          {/* User info & Skin type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-[#1c1c19] mb-1">
                {"2. "}{copy(revI18n.nameLabel)} {" *"}</label>
              <input
                type="text"
                value={authorNameInput}
                onChange={(e) => setAuthorNameInput(e.target.value)}
                placeholder={copy(revI18n.namePlaceholder)}
                className="w-full px-3.5 py-2 rounded-xl border border-[#202022]/15 text-xs focus:outline-none focus:border-[#74584d] bg-[#fcf9f4]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1c1c19] mb-1">
                {"3. "}{copy(revI18n.skinTypeLabel)}
              </label>
              <select
                value={skinTypeInput}
                onChange={(e) => setSkinTypeInput(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-[#202022]/15 text-xs focus:outline-none focus:border-[#74584d] bg-[#fcf9f4]"
              >
                {SKIN_TYPES.map((st, i) => (
                  <option key={i} value={st}>
                    {copy(st)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Review Title */}
          <div>
            <label className="block text-xs font-semibold text-[#1c1c19] mb-1">
              {"4. "}{copy(language === 'vi' ? 'Tiêu đề ngắn gọn' : language === 'de' ? 'Titel der Bewertung' : language === 'es' ? 'Título breve' : language === 'zh' ? '简短标题' : 'Review Title')}
            </label>
            <input
              type="text"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              placeholder={copy(language === 'vi' ? 'VD: Da căng mướt sau 2 tuần, mùi thảo mộc dịu êm...' : language === 'de' ? 'Z.B. Sehr angenehme Textur...' : language === 'es' ? 'Ej: Piel luminosa en 2 semanas...' : language === 'zh' ? '如：质地清爽好吸收，舒缓褪红...' : 'E.g. Hydrating and soothing...')}
              className="w-full px-3.5 py-2 rounded-xl border border-[#202022]/15 text-xs focus:outline-none focus:border-[#74584d] bg-[#fcf9f4]"
            />
          </div>

          {/* Review Comment Body */}
          <div>
            <label className="block text-xs font-semibold text-[#1c1c19] mb-1">
              {"5. "}{copy(revI18n.commentLabel)} {" *"}</label>
            <textarea
              rows={3}
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder={copy(revI18n.commentPlaceholder)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#202022]/15 text-xs focus:outline-none focus:border-[#74584d] bg-[#fcf9f4] leading-relaxed"
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="px-4 py-2 rounded-full text-xs text-[#77767b] hover:text-[#1c1c19] hover:bg-[#f0ede9] transition-colors cursor-pointer"
            >
              {copy(revI18n.closeFormBtn)}
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider bg-[#1c1c19] hover:bg-black text-white shadow-sm transition-all flex items-center space-x-2 active:scale-95 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 text-[#fed8c9]" />
              <span>{copy(revI18n.submitBtn.toUpperCase())}</span>
            </button>
          </div>
        </form>
      )}

      {/* 3. REVIEWS LIST IF ANY */}
      {displayedReviews.length > 0 && (
        <div className="space-y-3.5">
          {displayedReviews.map((review) => {
            const isLiked = !!likedReviews[review.id];
            const initials =
              review.authorName
                .trim()
                .split(' ')
                .map((part) => part[0])
                .join('')
                .slice(-2)
                .toUpperCase() || 'KH';

            return (
              <div
                key={review.id}
                className="p-4 sm:p-5 bg-white rounded-2xl border border-[#202022]/6 shadow-2xs space-y-3 transition-shadow hover:shadow-xs"
              >
                {/* Header: Author, Rating, Date */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-full bg-[#f0ede9] text-[#74584d] flex items-center justify-center font-serif font-bold text-xs shrink-0 border border-[#202022]/5">
                      {copy(initials)}
                    </div>

                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-xs text-[#1c1c19]">
                          {review.authorName}
                        </span>
                        {review.isVerifiedBuyer && (
                          <span className="inline-flex items-center space-x-1 text-[10px] text-[#8a9a86] bg-[#8a9a86]/10 px-2 py-0.5 rounded-full font-medium">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>{copy(revI18n.verifiedBuyerBadge)}</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center space-x-2 mt-0.5">
                        <div className="flex items-center text-amber-500">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-3 h-3 ${
                                star <= review.rating
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-[#e5e2dd]'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[10px] text-[#77767b]">{review.date}</span>
                      </div>
                    </div>
                  </div>

                  {review.skinType && (
                    <span className="text-[10px] text-[#74584d] bg-[#f7f2ee] px-2.5 py-1 rounded-full font-medium hidden sm:inline-block border border-[#74584d]/15">
                      {review.skinType}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="space-y-1">
                  <h5 className="font-semibold text-xs text-[#1c1c19]">{review.title}</h5>
                  <p className="text-xs text-[#46464a] leading-relaxed font-light whitespace-pre-line">
                    {review.comment}
                  </p>
                </div>

                {/* Brand response if any */}
                {review.responseFromBrand && (
                  <div className="p-3 bg-[#fbf9f6] rounded-xl border border-[#202022]/5 text-xs space-y-1">
                    <div className="flex items-center space-x-1.5 text-[#74584d] font-semibold text-[11px]">
                      <Sparkles className="w-3 h-3" />
                      <span>{copy(language === 'vi' ? 'Phản hồi từ Đội ngũ Chuyên viên Alps:' : language === 'de' ? 'Antwort vom Alps Expertenteam:' : language === 'es' ? 'Respuesta del equipo de especialistas Alps:' : language === 'zh' ? '来自 Alps 瑞士护肤专家的回复：' : 'Response from Alps Specialist Team:')}</span>
                    </div>
                    <p className="text-[#5f5d58] text-[11px] leading-relaxed">
                      {review.responseFromBrand}
                    </p>
                  </div>
                )}

                {/* Helpful count */}
                <div className="flex items-center justify-between pt-1 border-t border-[#202022]/5 text-xs text-[#77767b]">
                  <span className="text-[11px]">{copy(language === 'vi' ? 'Đánh giá này có hữu ích với bạn?' : language === 'de' ? 'War diese Bewertung hilfreich?' : language === 'es' ? '¿Te resultó útil esta reseña?' : language === 'zh' ? '这条评价对您有帮助吗？' : 'Was this review helpful?')}</span>
                  <button
                    type="button"
                    onClick={() => handleToggleHelpful(review.id)}
                    className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs transition-colors cursor-pointer ${
                      isLiked
                        ? 'bg-[#8a9a86]/20 text-[#455742] font-semibold'
                        : 'hover:bg-[#f0ede9] text-[#77767b]'
                    }`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
                    <span>{copy(revI18n.helpfulBtn)} {" ("}{review.helpfulCount}{")"}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
