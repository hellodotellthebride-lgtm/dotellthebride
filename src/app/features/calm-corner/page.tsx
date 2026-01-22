import type { Metadata } from 'next';
import FeatureDetail from '@/components/FeatureDetail';

export const metadata: Metadata = {
  title: 'Calm Corner | Do Tell The Bride',
  description: 'Calm Corner offers grounded breathing room and emotional support inside the planning experience.'
};

export default function CalmCornerPage() {
  return (
    <FeatureDetail
      title="Calm Corner"
      intro="A quiet space within the app that offers grounding prompts and reassurance when planning starts to feel heavy."
      helps={[
        'Reset when opinions or timelines feel loud',
        'Reflect on the day you are building, not just the tasks',
        'Access gentle pep talks and breathing guidance',
        'Return to planning with a steadier mindset'
      ]}
      difference="Calm Corner treats wedding planning as a human experience, not a checklist. It acknowledges the emotional weight and offers practical ways to pause, breathe, and keep going with intention."
      audience={[
        'You notice anxious spirals when decisions stack up',
        'You value emotional check-ins as much as timelines',
        'You want a reminder that you are allowed to pause',
        'You lead planning but need a moment of care for yourself'
      ]}
    />
  );
}
