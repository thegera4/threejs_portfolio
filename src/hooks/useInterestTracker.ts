import { useEffect, useState, useCallback, useRef } from 'react';

export interface InterestScores {
  frontend: number;
  backend: number;
  mobile: number;
  fullstack: number;
  ai: number;
  devtools: number;
}

const INITIAL_SCORES: InterestScores = {
  frontend: 0.1,
  backend: 0.1,
  mobile: 0.1,
  fullstack: 0.2,
  ai: 0.2,
  devtools: 0.1,
};

export function useInterestTracker() {
  const [interests, setInterests] = useState<InterestScores>(() => {
    try {
      const saved = sessionStorage.getItem('visitor_interests');
      return saved ? JSON.parse(saved) : INITIAL_SCORES;
    } catch {
      return INITIAL_SCORES;
    }
  });

  const interestsRef = useRef<InterestScores>(interests);
  interestsRef.current = interests;

  const recordInterest = useCallback((category: keyof InterestScores, weight = 0.2) => {
    setInterests((prev) => {
      const updated = {
        ...prev,
        [category]: Math.min(1.0, Number((prev[category] + weight).toFixed(2))),
      };
      try {
        sessionStorage.setItem('visitor_interests', JSON.stringify(updated));
      } catch {
        // ignore storage errors
      }
      return updated;
    });
  }, []);

  // Section observer to track reading time
  useEffect(() => {
    const sectionCategories: Record<string, keyof InterestScores> = {
      about: 'fullstack',
      projects: 'devtools',
      work: 'backend',
    };

    const timers: Record<string, ReturnType<typeof setTimeout>> = {};

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.id;
          const category = sectionCategories[sectionId];
          if (!category) return;

          if (entry.isIntersecting) {
            // If visitor dwells on this section for 4+ seconds, record interest
            timers[sectionId] = setTimeout(() => {
              recordInterest(category, 0.25);
            }, 4000);
          } else {
            if (timers[sectionId]) {
              clearTimeout(timers[sectionId]);
              delete timers[sectionId];
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    ['about', 'projects', 'work'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Listen to custom interest events (from chat or clicks)
    const handleCustomInterest = (e: Event) => {
      const customEvent = e as CustomEvent<{ category: keyof InterestScores; weight?: number }>;
      if (customEvent.detail?.category) {
        recordInterest(customEvent.detail.category, customEvent.detail.weight ?? 0.3);
      }
    };

    window.addEventListener('record-interest', handleCustomInterest);

    return () => {
      observer.disconnect();
      Object.values(timers).forEach(clearTimeout);
      window.removeEventListener('record-interest', handleCustomInterest);
    };
  }, [recordInterest]);

  return {
    interests,
    recordInterest,
  };
}
