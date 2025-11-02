import { useEffect } from 'react';

export const useSmoothScroll = () => {
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      // Find the closest anchor link parent
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]');
      
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href.length > 1) {
          const id = href.substring(1);
          const element = document.getElementById(id);
          
          if (element) {
            e.preventDefault();
            const headerOffset = 80; // Approximate height of the fixed header
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);
};
