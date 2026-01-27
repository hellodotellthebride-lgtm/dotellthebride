'use client';

import { useCallback } from 'react';

const pushEvent = (eventName: string) => {
  if (typeof window === 'undefined') return;
  const dataLayer = (window as typeof window & { dataLayer?: Record<string, unknown>[] }).dataLayer || [];
  if (!(window as typeof window & { dataLayer?: Record<string, unknown>[] }).dataLayer) {
    (window as typeof window & { dataLayer?: Record<string, unknown>[] }).dataLayer = dataLayer;
  }
  dataLayer.push({ event: eventName, timestamp: Date.now() });
};

const scrollToTarget = (id: string) => {
  if (typeof document === 'undefined') return;
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

type HeroActionsProps = {
  primaryTargetId: string;
  secondaryTargetId: string;
};

export default function HeroActions({ primaryTargetId, secondaryTargetId }: HeroActionsProps) {
  const handlePrimary = useCallback(() => {
    pushEvent('hero_primary_cta_click');
    scrollToTarget(primaryTargetId);
  }, [primaryTargetId]);

  const handleSecondary = useCallback(() => {
    pushEvent('hero_secondary_cta_click');
    scrollToTarget(secondaryTargetId);
  }, [secondaryTargetId]);

  return (
    <div className="hero-actions">
      <button type="button" className="primary-button" onClick={handlePrimary}>
        Yes, I want calmer planning
      </button>
      <button type="button" className="hero-actions__link" onClick={handleSecondary}>
        I’m curious, show me how it works
      </button>
    </div>
  );
}
