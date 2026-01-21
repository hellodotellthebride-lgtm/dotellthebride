import type { Metadata } from 'next';
import Link from 'next/link';
import PhonePreviewRow from '@/components/PhonePreviewRow';
import BrevoForm from '@/components/BrevoForm';

import roadmapMock from '@/assets/App mockup-16.png';
import guestNestMock from '@/assets/App mockup-17.png';
import askIvyMock from '@/assets/App mockup-13.png';

export const metadata: Metadata = {
  title: 'Overwhelmed Wedding Planning? A Calm Start Here Guide | Do Tell The Bride',
  description:
    'Feeling overwhelmed by wedding planning? Get a calm, practical starting point for decisions, family opinions, budgets, and timelines, plus a smarter way to plan everything in one place.',
  alternates: {
    canonical: '/overwhelmed-wedding-planning'
  }
};

const pains = [
  'Decision fatigue from tabs, group chats, and contradicting advice.',
  'Family opinions growing louder than your own voice.',
  'Budgets that feel like guesswork every time you open a spreadsheet.',
  'Guest list conversations that spiral into drama.',
  'That constant sense you are already behind (you’re not).'
];

const shifts = [
  {
    title: 'One home for everything',
    copy: 'Guests, budgets, inspiration, and timelines living together so the mental tabs can finally close. Everything lives inside your Wedding Hub, so nothing gets lost across apps, notes, or open tabs.'
  },
  {
    title: 'One decision at a time',
    copy: 'Structure that keeps focus on the next right thing, not everything at once.'
  },
  {
    title: 'A simple timeline you can trust',
    copy: 'The right tasks in the right order so progress feels calm instead of chaotic.'
  },
  {
    title: 'Scripts for tricky conversations',
    copy: 'Thoughtful language for when people push, question, or assume.'
  }
];

const features = [
  {
    title: 'Roadmap & timelines',
    copy: 'Step-by-step planning in the right order so you know what matters this month and what can wait.'
  },
  {
    title: 'Budget Buddy',
    copy: 'Real-time clarity on what’s allocated, spent, and flexible — without messy spreadsheets.'
  },
  {
    title: 'Guests & seating',
    copy: 'RSVP tracking, grouping, and notes in one calm view so social politics don’t run the guest list.'
  },
  {
    title: 'Ask Ivy',
    copy: 'On-demand planning support plus scripts for the conversations you’re avoiding. Not to do more. To do less, on purpose.'
  }
];

const gallery = [
  { src: roadmapMock, alt: 'Do Tell The Bride wedding roadmap view' },
  { src: guestNestMock, alt: 'Do Tell The Bride guest management view' },
  { src: askIvyMock, alt: 'Do Tell The Bride Ask Ivy conversation view' }
];

export default function OverwhelmedWeddingPlanningPage() {
  return (
    <div>
      <section className="hero hero--gradient hero--centered">
        <div className="hero__content">
          <p className="eyebrow">Start here</p>
          <h1>Overwhelmed by wedding planning? You’re not behind.</h1>
          <p>
            Decision overload, family noise, endless tabs — it’s a lot. This is your calm starting point to
            regroup, breathe, and plan on purpose.
          </p>
          <div className="hero__actions">
            <Link href="#contact" className="primary-button">
              Join early access
            </Link>
            <Link href="#services" className="ghost-button">
              See how it works
            </Link>
          </div>
        </div>
      </section>

      <section className="start-section">
        <div className="section-heading">
          <p className="eyebrow">If this is you…</p>
          <h2>You’re in the right place.</h2>
        </div>
        <ul className="start-bullets">
          {pains.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </section>

      <section className="start-section">
        <div className="section-heading">
          <p className="eyebrow">Let’s be honest</p>
          <h2>Why it feels so hard</h2>
        </div>
        <p>
          Wedding planning isn’t overwhelming because you’re disorganised. It’s overwhelming because you’re asked to
          make hundreds of interconnected decisions with zero structure, a dozen open tabs, and emotional pressure
          coming from every direction. Add in vendors with conflicting timelines and relatives with loud opinions,
          and suddenly the joy of planning disappears. You do not need more hustle. You need a calmer system that reduces
          noise and helps you decide once.
        </p>
      </section>

      <section className="start-section">
        <div className="section-heading">
          <p className="eyebrow">What helps (without doing more)</p>
          <h2>Four shifts that change everything</h2>
        </div>
        <div className="shifts-grid">
          {shifts.map((shift) => (
            <article key={shift.title} className="feature-card">
              <h3>{shift.title}</h3>
              <p>{shift.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="start-section" id="services">
        <div className="section-heading">
          <p className="eyebrow">How Do Tell The Bride helps</p>
          <h2>Clarity tools, not more to-dos</h2>
          <p>
            The calm planning OS that gives you one home, one timeline, and the words you need when conversations get
            awkward.
          </p>
          <p className="section-subtle-line">
            All tools live inside the Do Tell The Bride app — one calm place, not separate downloads.
          </p>
        </div>
        <div className="features-grid">
          {features.map((feature) => (
            <article key={feature.title} className="feature-card">
              <h3>{feature.title}</h3>
              <p>{feature.copy}</p>
            </article>
          ))}
        </div>
        <p className="section-subtle-line center">
          Plus inspiration boards, decision notes, and calm moments when your head’s full.
        </p>
        <div className="phone-strip">
          <div className="phone-strip__inner">
            <PhonePreviewRow
              className="phone-strip__row"
              shots={gallery.map((shot) => ({ src: shot.src, alt: shot.alt }))}
            />
          </div>
        </div>
      </section>

      <section className="cta" id="contact">
        <div>
          <p className="eyebrow">Final step</p>
          <h2>A calmer way to plan your wedding.</h2>
          <p>One place for every decision, answered with clarity instead of noise. We’re saving you a seat.</p>
        </div>
        <BrevoForm />
      </section>
    </div>
  );
}
