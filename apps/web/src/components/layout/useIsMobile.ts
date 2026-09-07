import { useState, useEffect } from 'react';

export function useIsMobile(breakpoint: number = 768) {
  const checkIsMobileDevice = () => {
    if (typeof window === 'undefined') return false;
    const isSmallScreen = window.innerWidth < breakpoint;
    const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    return isSmallScreen || isMobileUA;
  };

  const [isScreenMobile, setIsScreenMobile] = useState<boolean>(() => checkIsMobileDevice());

  const [mobileOverride, setMobileOverride] = useState<boolean | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('avg_mobile_preview');
      if (saved !== null) {
        return saved === 'true';
      }
    }
    return null;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsScreenMobile(checkIsMobileDevice());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  const toggleMobileMode = () => {
    setMobileOverride((prev) => {
      const next = prev === null ? !isScreenMobile : !prev;
      localStorage.setItem('avg_mobile_preview', String(next));
      return next;
    });
  };

  const setForceMobileMode = (val: boolean | null) => {
    setMobileOverride(val);
    if (val === null) {
      localStorage.removeItem('avg_mobile_preview');
    } else {
      localStorage.setItem('avg_mobile_preview', String(val));
    }
  };

  const isMobile = mobileOverride !== null ? mobileOverride : isScreenMobile;

  return {
    isMobile,
    isScreenMobile,
    mobileOverride,
    toggleMobileMode,
    setForceMobileMode,
  };
}
