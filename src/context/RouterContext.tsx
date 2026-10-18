import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type RouteType = 'home' | 'offers' | 'products' | 'product-detail' | 'about' | 'contact' | 'not-found';

export interface RouteInfo {
  route: RouteType;
  params: {
    slug?: string;
    [key: string]: string | undefined;
  };
  pathname: string;
}

interface RouterContextValue extends RouteInfo {
  navigate: (to: string, options?: { replace?: boolean; scrollToTop?: boolean }) => void;
}

const RouterContext = createContext<RouterContextValue | null>(null);

export function parseRoute(pathname: string): RouteInfo {
  // Normalize pathname: remove trailing slash (except root)
  const normalized = pathname.replace(/\/+$/, '') || '/';

  if (normalized === '/' || normalized === '') {
    return { route: 'home', params: {}, pathname: '/' };
  }

  if (normalized === '/san-pham' || normalized === '/san-pham/') {
    return { route: 'products', params: {}, pathname: '/san-pham' };
  }

  if (normalized === '/uu-dai-20-10' || normalized === '/voucher') {
    return { route: 'offers', params: {}, pathname: '/uu-dai-20-10' };
  }

  const productDetailMatch = normalized.match(/^\/san-pham\/([^/]+)$/);
  if (productDetailMatch) {
    return {
      route: 'product-detail',
      params: { slug: decodeURIComponent(productDetailMatch[1]) },
      pathname: normalized,
    };
  }

  if (normalized === '/ve-alps' || normalized === '/about' || normalized === '/gioi-thieu') {
    return { route: 'about', params: {}, pathname: '/ve-alps' };
  }

  if (normalized === '/lien-he' || normalized === '/contact' || normalized === '/ho-tro') {
    return { route: 'contact', params: {}, pathname: '/lien-he' };
  }

  return { route: 'not-found', params: {}, pathname: normalized };
}

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      try {
        const redirect = sessionStorage.redirect;
        delete sessionStorage.redirect;
        if (redirect && redirect !== window.location.href) {
          const parsedUrl = new URL(redirect);
          window.history.replaceState(null, '', parsedUrl.pathname + parsedUrl.search + parsedUrl.hash);
          return parsedUrl.pathname || '/';
        }
      } catch {}
      return window.location.pathname || '/';
    }
    return '/';
  });

  const routeInfo = parseRoute(currentPath);

  const navigate = useCallback(
    (to: string, options?: { replace?: boolean; scrollToTop?: boolean }) => {
      if (typeof window === 'undefined') return;

      // Handle pure hash links like #catalog-section
      if (to.startsWith('#')) {
        const id = to.slice(1);
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth' });
        return;
      }

      const targetPath = to.split('?')[0].split('#')[0] || '/';
      const shouldScroll = options?.scrollToTop !== false;

      if (options?.replace) {
        window.history.replaceState({}, '', to);
      } else if (window.location.pathname !== targetPath) {
        window.history.pushState({}, '', to);
      }

      setCurrentPath(targetPath);

      if (shouldScroll) {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    },
    []
  );

  useEffect(() => {
    const handlePopState = () => {
      const newPath = window.location.pathname || '/';
      setCurrentPath(newPath);
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <RouterContext.Provider value={{ ...routeInfo, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return ctx;
}

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  replace?: boolean;
  scrollToTop?: boolean;
}

export const Link: React.FC<LinkProps> = ({
  to,
  replace,
  scrollToTop = true,
  onClick,
  children,
  className,
  ...rest
}) => {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If user holds cmd/ctrl or middle click, allow browser default to open new tab
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }

    if (onClick) {
      onClick(e);
    }

    if (!e.defaultPrevented) {
      e.preventDefault();
      navigate(to, { replace, scrollToTop });
    }
  };

  return (
    <a href={to} onClick={handleClick} className={className} {...rest}>
      {children}
    </a>
  );
};
