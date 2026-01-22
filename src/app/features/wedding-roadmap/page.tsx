import type { Metadata } from 'next';
import FeatureDetail from '@/components/FeatureDetail';

export const metadata: Metadata = {
  title: 'Your Wedding Roadmap | Do Tell The Bride',
  description: 'Your Wedding Roadmap guides you through calm, ordered planning stages so decisions feel paced and grounded.'
};

export default function WeddingRoadmapPage() {
  return (
    <FeatureDetail
      title="Your Wedding Roadmap"
      intro="Seven calm planning stages that show you what matters now, what can wait, and how to stay aligned along the way."
      helps={[
        'Know which tasks belong in each month or phase',
        'Understand dependencies before booking vendors',
        'Keep both partners aligned on progress',
        'Reduce the urge to compare your pace to others'
      ]}
      difference="The roadmap replaces the noisy, all-at-once checklists with a paced, thoughtful flow. It celebrates the progress you are making and keeps focus on the next right thing."
      audience={[
        'You feel behind even when you are on track',
        'You want a calm plan instead of mixed advice',
        'You prefer structure without pressure',
        'You appreciate seeing the journey laid out clearly'
      ]}
    />
  );
}
