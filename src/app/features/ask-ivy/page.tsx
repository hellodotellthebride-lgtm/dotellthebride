import type { Metadata } from 'next';
import FeatureDetail from '@/components/FeatureDetail';

export const metadata: Metadata = {
  title: 'Ask Ivy | Do Tell The Bride',
  description: 'Ask Ivy gives you calm, on-demand planning support so decisions stay grounded and stress stays low.'
};

export default function AskIvyPage() {
  return (
    <FeatureDetail
      title="Ask Ivy"
      intro="A calm planning companion that answers questions when you are unsure, stuck, or second guessing the next move."
      helps={[
        'Get clear answers on vendors, timelines, and etiquette',
        'Sense-check a decision before you commit',
        'Find the words for tricky conversations',
        'Move forward without searching endless forums'
      ]}
      difference="Ask Ivy speaks to you the way a calm planner would. Straight answers, gentle assurance, and realistic next steps so you can keep planning without spirals."
      audience={[
        'You want guidance without booking a full planner',
        'You value gut checks before locking in vendors',
        'You’re leading planning but need support on demand',
        'You appreciate thoughtful scripts when family opinions get loud'
      ]}
    />
  );
}
