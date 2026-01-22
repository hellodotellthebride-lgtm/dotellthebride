import type { Metadata } from 'next';
import FeatureDetail from '@/components/FeatureDetail';

export const metadata: Metadata = {
  title: 'Inspiration Station | Do Tell The Bride',
  description: 'Inspiration Station keeps looks, palettes, and references organised so you can shape a visual direction calmly.'
};

export default function InspirationStationPage() {
  return (
    <FeatureDetail
      title="Inspiration Station"
      intro="A considered space for saving, refining, and sharing the visual direction of your day without juggling screenshots."
      helps={[
        'Collect looks, palettes, and textures in one calm board',
        'Spot the threads that actually matter to your story',
        'Share direction with vendors in a clean, clear format',
        'Translate ideas into decisions you can act on'
      ]}
      difference="Inspiration Station focuses on clarity over quantity. It gently nudges you toward thoughtful choices rather than endless scrolling, so you feel confident about the look you are building."
      audience={[
        'You save references everywhere and need one home',
        'You want decisions guided by feeling, not algorithms',
        'You plan with a partner and need a visual shorthand',
        'You like curated, calm inspiration more than chaos'
      ]}
    />
  );
}
