import { useEffect } from 'react';

/**
 * ScrollOptimizer component to enhance scrolling performance
 * This component applies various optimizations to improve scroll smoothness
 */
const ScrollOptimizer = () => {
  useEffect(() => {
    // Optimize scroll performance
    const optimizeScrolling = () => {
      // Add smooth scrolling to html element
      document.documentElement.style.scrollBehavior = 'smooth';

      // Optimize scroll events with passive listeners
      const handleScroll = () => {
        requestAnimationFrame(() => {
          // Any scroll-based animations or effects can be handled here
          // This ensures they run at 60fps
        });
      };

      // Add passive scroll listener for better performance
      window.addEventListener('scroll', handleScroll, { passive: true });

      // Optimize touch scrolling on mobile
      const handleTouchStart = (e) => {
        // Store initial touch position for momentum scrolling
        window.scrollStartY = e.touches[0].clientY;
      };

      const handleTouchMove = (e) => {
        // Prevent rubber band effect on iOS
        if (window.scrollY === 0 && e.touches[0].clientY > window.scrollStartY) {
          e.preventDefault();
        }
      };

      // Add touch event listeners for mobile optimization
      document.addEventListener('touchstart', handleTouchStart, { passive: true });
      document.addEventListener('touchmove', handleTouchMove, { passive: false });

      // Cleanup function
      return () => {
        window.removeEventListener('scroll', handleScroll);
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchmove', handleTouchMove);
      };
    };

    const cleanup = optimizeScrolling();

    // Apply CSS optimizations
    const style = document.createElement('style');
    style.textContent = `
      /* Optimize scrolling performance */
      * {
        -webkit-overflow-scrolling: touch;
      }
      
      /* Improve scroll smoothness */
      html {
        scroll-behavior: smooth;
      }
      
      /* Optimize transforms for better performance */
      .will-change-transform {
        will-change: transform;
      }
      
      .will-change-scroll {
        will-change: scroll-position;
      }
      
      /* GPU acceleration for smooth animations */
      .gpu-accelerated {
        transform: translateZ(0);
        backface-visibility: hidden;
        perspective: 1000px;
      }
      
      /* Optimize scrollbar appearance */
      ::-webkit-scrollbar {
        width: 8px;
      }
      
      ::-webkit-scrollbar-track {
        background: rgba(16, 21, 34, 0.1);
      }
      
      ::-webkit-scrollbar-thumb {
        background: linear-gradient(180deg, #6366f1 0%, #8b5cf6 100%);
        border-radius: 4px;
        transition: background 0.3s ease;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(180deg, #4f46e5 0%, #7c3aed 100%);
      }
      
      /* Firefox scrollbar */
      * {
        scrollbar-width: thin;
        scrollbar-color: #6366f1 rgba(16, 21, 34, 0.1);
      }
      
      /* Reduce motion for users who prefer it */
      @media (prefers-reduced-motion: reduce) {
        * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
        
        html {
          scroll-behavior: auto;
        }
      }
    `;

    document.head.appendChild(style);

    return () => {
      cleanup && cleanup();
      document.head.removeChild(style);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default ScrollOptimizer;
