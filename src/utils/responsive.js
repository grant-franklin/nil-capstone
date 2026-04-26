/**
 * Mobile-first responsive style utilities
 * Use window.innerWidth to detect breakpoints at runtime
 * Mobile-first approach: base styles are mobile, then override with larger breakpoints
 */

export const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 768;
export const isTablet = () => typeof window !== 'undefined' && window.innerWidth >= 768 && window.innerWidth < 1024;
export const isDesktop = () => typeof window !== 'undefined' && window.innerWidth >= 768;

// Responsive container padding
export const containerPadding = () => {
  if (typeof window === 'undefined') return '0 24px';
  if (window.innerWidth < 480) return '0 16px';
  if (window.innerWidth < 768) return '0 20px';
  return '0 24px';
};

// Responsive section padding (vertical)
export const sectionPaddingY = () => {
  if (typeof window === 'undefined') return '40px';
  if (window.innerWidth < 768) return '24px';
  return '60px';
};

// Responsive gap for flex grids
export const gridGap = () => {
  if (typeof window === 'undefined') return '12px';
  return window.innerWidth < 768 ? '8px' : '12px';
};

// Responsive font sizes
export const heroTitleSize = () => {
  if (typeof window === 'undefined') return '42px';
  if (window.innerWidth < 480) return '24px';
  if (window.innerWidth < 768) return '32px';
  return '42px';
};

export const h1Size = () => {
  if (typeof window === 'undefined') return '42px';
  if (window.innerWidth < 480) return '28px';
  if (window.innerWidth < 768) return '36px';
  return '42px';
};

export const h2Size = () => {
  if (typeof window === 'undefined') return '28px';
  if (window.innerWidth < 768) return '24px';
  return '28px';
};

// Responsive grid columns
export const gridCols = () => {
  if (typeof window === 'undefined') return '2';
  if (window.innerWidth < 768) return '1';
  return '2';
};

// Hook for responsive state
import { useState, useEffect } from 'react';

export const useResponsive = () => {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    width,
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 768,
  };
};
