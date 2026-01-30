import type { Metadata } from 'next';
import FeatureDetail from '@/components/FeatureDetail';

export const metadata: Metadata = {
  title: 'Budget Buddy | Do Tell The Bride',
  description: 'See your wedding spending clearly with Budget Buddy - calm tracking, gentle prompts, and no messy spreadsheets.'
};

export default function BudgetBuddyPage() {
  return (
    <FeatureDetail
      title="Budget Buddy"
      intro="The calm way to see your wedding spending, understand trade-offs, and keep decisions in sync without spreadsheets."
      helps={[
        'See what’s allocated, spent, and flexible at a glance',
        'Spot trade-offs before they become stressful',
        'Share the current picture with your partner in seconds',
        'Protect the parts of the budget that matter most'
      ]}
      difference="Budget Buddy keeps the tone gentle. No flashing alerts, no guilt. Just a clear view of where your money is going so you can decide once and move on."
      audience={[
        'You’ve tried spreadsheets but they feel heavy',
        'You want to avoid surprise invoices later',
        'You’re planning with a partner and need one calm source of truth',
        'You’d rather understand trade-offs than chase receipts'
      ]}
    />
  );
}
