import type { Metadata } from 'next';
import FeatureDetail from '@/components/FeatureDetail';

export const metadata: Metadata = {
  title: 'Guest Nest | Do Tell The Bride',
  description: 'Guest Nest keeps guests, RSVPs, and notes organised so politics stay quiet and logistics stay calm.'
};

export default function GuestNestPage() {
  return (
    <FeatureDetail
      title="Guest Nest"
      intro="A calm home for every guest detail — from RSVPs to meal notes — so you can plan confidently without spreadsheets."
      helps={[
        'Track RSVPs and updates without digging through emails',
        'Group guests for seating or events with ease',
        'Keep dietary needs and personal notes at hand',
        'See the whole picture when making venue or catering decisions'
      ]}
      difference="Guest Nest keeps the emotional load light. You see exactly who is in, who needs nudging, and how choices affect the people you care about, without the politics taking over."
      audience={[
        'You dislike juggling spreadsheets and text threads',
        'You want guest updates that feel manageable, not frantic',
        'You plan together and need one shared source of truth',
        'You prefer gentle reminders over last-minute scrambles'
      ]}
    />
  );
}
