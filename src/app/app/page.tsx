import Image from 'next/image';
import Link from 'next/link';

import heroStripOne from '@/assets/App mockup-4.png';
import heroStripTwo from '@/assets/App mockup-11.png';
import heroStripThree from '@/assets/App mockup-8.png';
import budgetMock from '@/assets/App mockup-18.png';
import journalMock from '@/assets/App mockup-13.png';
import askIvyMock from '@/assets/App mockup-13.png';

const heroShots = [heroStripOne, heroStripTwo, heroStripThree];

const workflowStories = [
  {
    title: 'Budget Buddy',
    copy: 'Clarity-first budgeting that shows trade-offs before they turn stressful.',
    image: budgetMock
  },
  {
    title: 'Ask Ivy',
    copy: 'On-demand planning support plus conversation scripts when opinions arrive loudly.',
    image: journalMock
  },
  {
    title: 'Inspiration Station',
    copy: 'Curated looks that help you decide what to keep, skip, or adapt - not a dumping ground.',
    image: askIvyMock
  }
];

const pains = [
  'Decision fatigue from tabs, screenshots, and contradicting advice.',
  'Family opinions growing louder than your own voice.',
  'Budgets that feel like guesswork every time you open a spreadsheet.',
  'Guest list conversations that spiral into drama.',
  'That constant sense you are already behind (you’re not).'
];

const shifts = [
  {
    title: 'One home for the decisions that matter',
    copy: 'Guests, budget, timelines, and key choices in one calm place so the mental tabs can finally close.'
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

const featureHighlights = [
  {
    title: 'Wedding Roadmap',
    copy: 'Step-by-step planning so you always know what matters this week and what can happily wait.'
  },
  {
    title: 'Ask Ivy',
    copy: 'Planning support plus conversation scripts when you need the right words fast.'
  },
  {
    title: 'Budget Buddy',
    copy: 'Clarity, trade-offs, and impact tracking - without juggling five spreadsheets.'
  },
  {
    title: 'Guest Nest',
    copy: 'RSVP clarity, grouping, and light guest notes so relationships stay thoughtful.'
  }
];

export default function AppPage() {
  return (
    <div>
      <section className="hero hero--gradient hero--centered">
        <div className="hero__content">
          <p className="eyebrow">Decision clarity platform</p>
          <h1>The calm OS for modern wedding planning.</h1>
          <p>
            Do Tell The Bride keeps couples, budgets, timelines, and vendors aligned so every decision feels deliberate,
            not frantic. No chaos, no guesswork, just clarity at every step.
          </p>
          <div className="hero__actions">
            <Link href="#early-access" className="primary-button">
              Start with clarity
            </Link>
            <Link href="#how-it-works" className="ghost-button">
              See how it works
            </Link>
          </div>
        </div>
        <div className="hero__strip">
          {heroShots.map((shot, index) => (
            <div className="hero__strip-frame" key={index}>
              <Image src={shot} alt="Do Tell The Bride app preview" className="hero__strip-img" />
            </div>
          ))}
        </div>
      </section>

      <section id="start-here" className="start-here">
        <div className="start-here__panel">
          <p className="eyebrow">START HERE</p>
          <h2>Overwhelmed by wedding planning? You’re not behind.</h2>
          <p>
            Too many tabs, loud family opinions, and timelines that all disagree - it’s a lot. This is the calmer
            starting point that recentres your plan and your headspace.
          </p>
          <div className="start-here__actions">
            <Link href="#early-access" className="primary-button">
              Start with clarity
            </Link>
            <Link href="#how-it-works" className="ghost-button">
              See how it works
            </Link>
          </div>
        </div>

        <div className="start-here__card">
          <p className="eyebrow">IF THIS IS YOU…</p>
          <h3>You’re in the right place.</h3>
          <ul className="start-here__pills">
            {pains.map((pain) => (
              <li key={pain}>{pain}</li>
            ))}
          </ul>
        </div>

        <div className="start-here__card">
          <p className="eyebrow">LET’S BE HONEST</p>
          <h3>Why it feels so hard</h3>
          <p>
            Wedding planning is hundreds of connected decisions, layered with emotion, timelines that clash, and advice
            coming from every corner of your life. You don’t need to hustle harder; you need a calmer way to decide once
            and move on.
          </p>
        </div>

        <div className="start-here__card">
          <p className="eyebrow">WHAT HELPS (WITHOUT DOING MORE)</p>
          <h3>Four shifts that change everything</h3>
          <div className="start-here__grid">
            {shifts.map((shift) => (
              <article key={shift.title}>
                <h4>{shift.title}</h4>
                <p>{shift.copy}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="start-here__card">
          <p className="eyebrow">How Do Tell The Bride helps</p>
          <h3>Clarity tools, not screenshot dumps</h3>
          <p>Focused workflows that keep your decisions connected and calm.</p>
          <div className="start-here__grid start-here__grid--features">
            {featureHighlights.map((feature) => (
              <article key={feature.title}>
                <h4>{feature.title}</h4>
                <p>{feature.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="services" id="how-it-works">
        <div className="section-heading">
          <p className="eyebrow">Workflows</p>
          <h2>Plan your wedding, step by step</h2>
          <p>The structured paths that keep planning moving and every decision grounded.</p>
        </div>
        <div className="services__grid">
          {workflowStories.map((module) => (
            <article key={module.title}>
              <div className="media-frame">
                <Image src={module.image} alt={module.title} width={420} height={860} className="media-image" />
              </div>
              <h3>{module.title}</h3>
              <p>{module.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cta" id="early-access">
        <div>
          <p className="eyebrow">Ready when you are</p>
          <h2>Wedding planning, minus the chaos.</h2>
          <p>The clarity-first app built for overwhelmed couples who want calm decisions, not endless tabs.</p>
        </div>
        <form
          className="cta__form"
          action="https://formsubmit.co/hello@dotellthebride.com"
          method="post"
          noValidate
        >
          <label>
            Name
            <input type="text" name="name" placeholder="Your name(s)" required />
          </label>
          <label>
            Email
            <input type="email" name="email" placeholder="hello@email.com" required />
          </label>
          <label>
            Tell us about your wedding
            <input type="text" name="focus" placeholder="For example, a small countryside wedding next summer" />
          </label>
          <label>
            What would be most helpful right now?
            <textarea
              rows={4}
              name="message"
              placeholder="For example, guest lists, budgets, timelines, or just getting started"
            ></textarea>
          </label>
          <button type="submit" className="primary-button">
            Join early access
          </button>
        </form>
      </section>
    </div>
  );
}
