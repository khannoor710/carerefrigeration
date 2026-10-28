import { useEffect } from 'react';

const scrollToSection = (hash: string, behavior: ScrollBehavior) => {
  const id = decodeURIComponent(hash.replace(/^#/, ''));
  if (!id) return false;

  const element = document.getElementById(id);
  if (!element) return false;

  const headerOffset = 80;
  const top = element.getBoundingClientRect().top + window.pageYOffset - headerOffset;
  window.scrollTo({ top, behavior });
  return true;
};

export const useSmoothScroll = () => {
  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest('a[href^="#"]');
      const hash = anchor?.getAttribute('href');
      if (!hash || hash.length < 2) return;

      if (scrollToSection(hash, 'smooth')) {
        event.preventDefault();
        if (window.location.hash !== hash) window.history.pushState(null, '', hash);
      }
    };

    const scrollToCurrentHash = () => scrollToSection(window.location.hash, 'auto');
    const frame = window.requestAnimationFrame(scrollToCurrentHash);

    document.addEventListener('click', handleAnchorClick);
    window.addEventListener('hashchange', scrollToCurrentHash);
    window.addEventListener('gallery-loaded', scrollToCurrentHash);
    window.addEventListener('popstate', scrollToCurrentHash);

    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('hashchange', scrollToCurrentHash);
      window.removeEventListener('gallery-loaded', scrollToCurrentHash);
      window.removeEventListener('popstate', scrollToCurrentHash);
    };
  }, []);
};
