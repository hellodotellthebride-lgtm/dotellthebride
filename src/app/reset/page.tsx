import type { Metadata } from 'next';
import ResetLandingForm from '@/components/reset/ResetLandingForm';
import ResetShell from '@/components/reset/ResetShell';

export const metadata: Metadata = {
  title: 'Wedding Overwhelm Reset | Do Tell The Bride',
  description: 'A calm, 10-minute reset for wedding planning overwhelm.'
};

export default function ResetLandingPage() {
  return (
    <ResetShell>
      <section className="reset-hero">
        <h1>Wedding planning taking over your brain?</h1>
        <p className="reset-subhead">You don’t need more advice. You need the noise to stop.</p>
        <p className="reset-subhead">
          This 10-minute reset helps you clear your head and leave with one calm next step.
        </p>
        <div className="reset-steps">
          <div className="reset-step-card">Messy thoughts welcome</div>
          <div className="reset-step-card">Built around your actual wedding stage</div>
          <div className="reset-step-card">One clear next step — nothing more</div>
        </div>
      </section>
      <ResetLandingForm />
      <p className="reset-proof">
        Designed using our stage-by-stage wedding roadmap — so you’re never guessing what matters right now.
      </p>
      <section className="reset-how" id="reset-how">
        <h2>What you’ll do in the 10 minutes</h2>
        <ul className="reset-how-list">
          <li>Get clear on where you are in the roadmap.</li>
          <li>Focus on what matters at this stage.</li>
          <li>Leave with one calm next step.</li>
        </ul>
      </section>
    </ResetShell>
  );
}
