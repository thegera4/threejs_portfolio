import React, { useState, useEffect, useRef } from 'react';
import { useInterestTracker } from '../../hooks/useInterestTracker';
import gsap from 'gsap';

interface RecommendationData {
  projectIndex: number;
  projectTitle: string;
  pitch: string;
  animation?: string;
  matchReason?: string;
}

export const SmartRecommender: React.FC = () => {
  const { interests } = useInterestTracker();
  const [recommendation, setRecommendation] = useState<RecommendationData | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    // Check if user already dismissed recommendation in this session
    if (sessionStorage.getItem('ai_recommender_dismissed')) {
      return;
    }

    // Trigger recommendation after 12 seconds of browsing or when strong interest signal detected
    const timer = setTimeout(async () => {
      if (hasTriggeredRef.current) return;
      hasTriggeredRef.current = true;

      try {
        const res = await fetch('/api/recommend', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ interests }),
        });

        if (!res.ok) return;

        const data: RecommendationData = await res.json();
        setRecommendation(data);
        setIsVisible(true);

        // Notify 3D avatar in Experience section
        if (data.animation) {
          window.dispatchEvent(
            new CustomEvent('trigger-avatar-animation', {
              detail: { animation: data.animation },
            })
          );
        }
      } catch (err) {
        console.error('Failed to fetch recommendation:', err);
      }
    }, 12000);

    return () => clearTimeout(timer);
  }, [interests]);

  // Animate card entrance using GSAP
  useEffect(() => {
    if (isVisible && cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)' }
      );
    }
  }, [isVisible]);

  const handleDismiss = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        y: 40,
        opacity: 0,
        scale: 0.95,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          setIsVisible(false);
          sessionStorage.setItem('ai_recommender_dismissed', 'true');
        },
      });
    } else {
      setIsVisible(false);
      sessionStorage.setItem('ai_recommender_dismissed', 'true');
    }
  };

  const handleExploreProject = () => {
    if (!recommendation) return;

    // Dispatch event to select this project in the 3D Projects component
    window.dispatchEvent(
      new CustomEvent('select-project', {
        detail: { index: recommendation.projectIndex },
      })
    );

    // Trigger exciting avatar animation
    window.dispatchEvent(
      new CustomEvent('trigger-avatar-animation', {
        detail: { animation: recommendation.animation || 'victory' },
      })
    );

    // Smooth scroll to projects
    const projectsElem = document.getElementById('projects');
    if (projectsElem) {
      projectsElem.scrollIntoView({ behavior: 'smooth' });
    }

    handleDismiss();
  };

  if (!isVisible || !recommendation) return null;

  return (
    <aside
      ref={cardRef}
      aria-label="Personalized project recommendation"
      className="fixed bottom-6 left-6 z-40 max-w-sm sm:max-w-md bg-black-200/95 border border-cyan-500/30 rounded-2xl p-4 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl font-generalsans"
    >
      {/* Decorative top glow border */}
      <div className="absolute -top-[1px] left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

      {/* Header with Sparkles & Dismiss */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-300">
          <svg className="w-4 h-4 text-cyan-400 animate-spin [animation-duration:6s]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6.4-4.8-6.4 4.8 2.4-7.2-6-4.8h7.6z" />
          </svg>
          <span className="tracking-wide uppercase text-[10px] bg-cyan-950/70 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-800/40">
            AI Recommended Match
          </span>
        </div>

        <button
          onClick={handleDismiss}
          className="text-gray-400 hover:text-white p-1 rounded-md hover:bg-white/5 transition-colors cursor-pointer"
          title="Dismiss"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <h5 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
        {recommendation.projectTitle}
      </h5>
      <p className="text-xs text-gray-300 leading-relaxed mb-3">
        {recommendation.pitch}
      </p>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-1 border-t border-white/5">
        <button
          onClick={handleExploreProject}
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 active:scale-95 text-white text-xs font-semibold transition-all shadow-md shadow-cyan-500/20 cursor-pointer select-none"
        >
          <span className="pointer-events-none">View 3D Demo</span>
          <svg className="w-3.5 h-3.5 fill-current pointer-events-none" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>

        <button
          onClick={handleDismiss}
          className="px-3 py-1.5 rounded-xl text-xs text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer select-none"
        >
          Later
        </button>
      </div>
    </aside>
  );
};
