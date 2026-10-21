import React, { useState } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
}

// Each source pair owns its loading/fallback state. A product switch mounts a fresh
// image, so late load/error events from the previous product cannot affect it.
export const SafeImage: React.FC<SafeImageProps> = props => (
  <SourceImage key={JSON.stringify([props.src, props.fallbackSrc])} {...props} />
);

const SourceImage: React.FC<SafeImageProps> = ({
  src,
  fallbackSrc,
  alt,
  className = '',
  onLoad,
  onError,
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(src);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleError = () => {
    if (!hasError && fallbackSrc) {
      setHasError(true);
      setCurrentSrc(fallbackSrc);
    }
  };

  return (
    <div className={`relative overflow-hidden bg-[#f0ede9] ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#ebe8e3] animate-pulse" />
      )}
      <img
        src={currentSrc}
        alt={alt}
        referrerPolicy="no-referrer"
        onLoad={event => { setIsLoaded(true); onLoad?.(event); }}
        onError={event => { handleError(); onError?.(event); }}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        {...props}
      />
    </div>
  );
};
