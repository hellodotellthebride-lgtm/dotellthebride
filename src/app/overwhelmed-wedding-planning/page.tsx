import type { Metadata } from 'next';
import Link from 'next/link';
import ClarityPreview from '@/components/ClarityPreview';
import BrevoForm from '@/components/BrevoForm';
import HeroActions from '@/components/HeroActions';

export const metadata: Metadata = {
  title: 'Overwhelmed Wedding Planning? Start Here | Do Tell The Bride',
  description:
    'A calm, emotionally intelligent landing page for overwhelmed brides. Preview how Do Tell The Bride keeps planning grounded, then join early access for gentle guidance.'
};

const reassurancePoints = [
  { title: 'No pressure', copy: 'Move at your pace. The app only surfaces what matters now.' },
  { title: 'No judgement', copy: 'You’re not behind. Planning adjusts to your reality.' },
  { title: 'Fewer decisions', copy: 'We reduce options before you ever feel overwhelmed.' }
];

const benefitPoints = [
  {
    title: 'Clarity feels obvious',
    copy: 'One calm roadmap replaces scattered tabs, screenshots, and notes.'
  },
  {
    title: 'Calm is protected',
    copy: 'Every decision appears in the right order - so nothing feels urgent too early.'
  },
  {
    title: 'Decisions feel confident',
    copy: 'You’ll understand what matters before anything gets locked in.'
  }
];

export default function OverwhelmedWeddingPlanningPage() {
  return (
    <div className="owp-page">
      <section className="owp-hero" id="top">
        <div className="owp-hero__content">
          <p className="owp-eyebrow">Start here</p>
          <h1>Wedding planning feels heavy? Start here instead.</h1>
          <p>A calm decision-making app for couples who want clarity before timelines, budgets, and opinions take over.</p>
          <HeroActions primaryTargetId="contact" secondaryTargetId="planning-logic" />
          <p className="owp-hero__micro">We’re testing this with real couples. No spam. No pressure.</p>
        </div>
      </section>

      <section className="owp-preview" id="planning-logic">
        <div className="owp-preview__intro">
          <p className="owp-eyebrow">Planning logic in progress</p>
          <h2>How we think about wedding planning</h2>
          <p>Adjust the sliders to see how planning adapts to timing and headspace.</p>
        </div>
        <ClarityPreview />
      </section>

      <section className="owp-reassurance">
        <h2>What couples tell us they want instead</h2>
        <p className="owp-reassurance__note">These requests came up again and again.</p>
        <div className="owp-reassurance__grid">
          {reassurancePoints.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="owp-benefits" id="services">
        <div className="owp-benefits__intro">
          <p className="owp-eyebrow">How Do Tell The Bride helps</p>
          <h2>Designed for clarity, calm, confident decisions</h2>
        </div>
        <div className="owp-benefits__list">
          {benefitPoints.map((benefit) => (
            <article key={benefit.title}>
              <h3>{benefit.title}</h3>
              <p>{benefit.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="owp-credibility">
        <p>Built by brides who wanted structure more than spreadsheets. We’re designing this with real couples who asked for clarity they could feel.</p>
      </section>

      <section className="cta" id="contact">
        <div>
          <p className="owp-eyebrow">Ready when you are</p>
          <h2>Start with clarity when you’re ready.</h2>
          <p>We’ll only reach out when the next step genuinely matters.</p>
        </div>
        <BrevoForm />
      </section>
    </div>
  );
}
