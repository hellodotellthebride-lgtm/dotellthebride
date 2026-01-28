import type { Metadata } from 'next';
import EarlyAccessForm from '@/components/EarlyAccessForm';

export const metadata: Metadata = {
  title: 'Early Access | Do Tell The Bride',
  description:
    'Start with clarity via Do Tell The Bride — a calm wedding planning system for decisions, budgets, guests, and timelines without overwhelm.'
};

const whyPoints = [
  {
    title: 'Wedding planning is mentally heavy',
    copy: 'Most tools add tasks. This one removes noise.'
  },
  {
    title: 'Decisions are the real stress',
    copy: 'Not inspiration. Not checklists. The constant “are we doing this right?”'
  },
  {
    title: 'You shouldn’t need five apps and a spreadsheet',
    copy: 'Everything lives in one calm system.'
  }
];

const earlyAccessBenefits = [
  'Early access to the Do Tell The Bride app',
  'Free planning tools and templates (Wedding Hub)',
  'Updates as new features roll out',
  'A calmer, more intentional planning experience from day one'
];

export default function EarlyAccessPage() {
  return (
    <div className="focus-page">
      <section className="focus-hero">
        <p className="eyebrow">Start with clarity</p>
        <h1>Plan your wedding without the overwhelm.</h1>
        <p>
          One calm place to organise decisions, budgets, guests, and timelines — without spreadsheets, chaos, or constant
          second-guessing.
        </p>
        <EarlyAccessForm />
        <p className="focus-microcopy">No spam. Only thoughtful updates when clarity matters.</p>
      </section>

      <section className="focus-section">
        <div className="section-heading">
          <p className="eyebrow">Why this exists</p>
        </div>
        <div className="focus-point-grid">
          {whyPoints.map((point) => (
            <article key={point.title} className="focus-card">
              <h3>{point.title}</h3>
              <p>{point.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="focus-section">
        <p className="eyebrow">What you get</p>
        <h2>When you start with clarity, you’ll get:</h2>
        <ul className="focus-list">
          {earlyAccessBenefits.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="focus-section">
        <p>
          Built by brides who found existing planning tools overwhelming, scattered, or emotionally tone-deaf — and
          decided to build something better.
        </p>
      </section>

      <section className="focus-final">
        <h2>If planning your wedding feels heavier than it should, this is for you.</h2>
        <EarlyAccessForm />
        <p className="focus-microcopy">No spam. Only thoughtful updates when clarity matters.</p>
    </section>
  </div>
);
}
