import React, { useEffect, useRef, useState } from 'react';

const ScrollTextMarquee: React.FC = () => {
  const segmentRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const lastScrollY = useRef<number>(window.scrollY);
  const positionRef = useRef<number>(0);
  const tickingRef = useRef<boolean>(false);
  const [segmentWidth, setSegmentWidth] = useState<number>(0);

  useEffect(() => {
    const updateSegmentWidth = () => {
      if (segmentRef.current) {
        setSegmentWidth(segmentRef.current.offsetWidth);
      }
    };

    updateSegmentWidth();
    window.addEventListener('resize', updateSegmentWidth);

    return () => {
      window.removeEventListener('resize', updateSegmentWidth);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;
      lastScrollY.current = currentScrollY;

      if (!segmentWidth || delta === 0) return;

      positionRef.current += delta * 0.8;
      positionRef.current %= segmentWidth;
      if (positionRef.current < 0) {
        positionRef.current += segmentWidth;
      }

      if (!tickingRef.current) {
        tickingRef.current = true;
        requestAnimationFrame(() => {
          if (trackRef.current) {
            trackRef.current.style.transform = `translateX(${positionRef.current - segmentWidth}px)`;
          }
          tickingRef.current = false;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [segmentWidth]);

  return (
    <section className="overflow-hidden bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative overflow-hidden">
          <div className="relative overflow-hidden py-10">
            <div
              ref={trackRef}
              className="flex items-center gap-16 whitespace-nowrap will-change-transform transition-transform duration-150 ease-out"
              style={{ transform: `translateX(${-segmentWidth}px)` }}
            >
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  ref={index === 0 ? segmentRef : null}
                  className="min-w-full flex-shrink-0"
                >
                  <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-[0.2em] text-kamora-dark">
                    <span>FRESH FOODS</span>{' '}
                    <span className="text-kamora-red">KAMORA</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollTextMarquee;
