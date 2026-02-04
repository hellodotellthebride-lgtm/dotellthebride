import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import Image from 'next/image';
import PhonePreviewRow from '@/components/PhonePreviewRow';
import HomeCheckIn from '@/components/HomeCheckIn';
import heroStripOne from '@/assets/App mockup-4.png';
import heroStripTwo from '@/assets/App mockup-11.png';
import heroStripThree from '@/assets/App mockup-8.png';
import approvalsMock from '@/assets/App mockup-19.png';
import journalMock from '@/assets/App mockup-13.png';
import collageMock from '@/assets/App mockup-3.png';
import inspirationMock from '@/assets/App mockup-20.png';
import roadmapMock from '@/assets/App mockup-16.png';
import guestNestDetailMock from '@/assets/App mockup-17.png';


const workflowStories = [
  {
    title: 'Budget Buddy',
    copy: 'Set your budget with clarity, track it in real time, and understand the impact of every decision before it becomes stressful.',
    image: approvalsMock,
    ctaLabel: 'Read more',
    ctaHref: '/features/budget-buddy'
  },
  {
    title: 'Ask Ivy',
    copy: 'Get thoughtful, practical answers to planning questions, tailored to where you are in your wedding journey.',
    image: journalMock,
    ctaLabel: 'Read more',
    ctaHref: '/features/ask-ivy'
  },
  {
    title: 'Inspiration Station',
    copy: 'Browse curated wedding looks, save your favourites and shape a visual direction you can act on.',
    image: inspirationMock,
    ctaLabel: 'Read more',
    ctaHref: '/features/inspiration-station'
  }
];

const extendedFeatures = [
  {
    title: 'Guest Nest',
    copy: 'Manage your guest list, RSVPs, notes, and groupings in one organised space, so nothing gets lost and decisions stay clear.',
    image: guestNestDetailMock,
    href: '/features/guest-nest'
  },
  {
    title: 'Calm Corner',
    copy: 'A dedicated in app space for grounding guidance, reassurance, and perspective when planning starts to feel emotionally heavy.',
    image: collageMock,
    href: '/features/calm-corner'
  },
  {
    title: 'Your Wedding Roadmap',
    copy: 'A clear, step by step planning path that shows what to do, when to do it, and what can wait.', 
    image: roadmapMock,
    href: '/features/wedding-roadmap'
  }
];

const stats = [
  { label: 'Planning decisions supported in one place', value: '100+' },
  { label: 'Months of guided planning', value: '12' },
  { label: 'Hours simplified through structured planning', value: '50+' },
  { label: 'Calm place to plan it all', value: '1' }
];

const planningPillars = ['Guests', 'Budget', 'Inspiration', 'Timelines', 'Decisions'];
const heroShots = [heroStripOne, heroStripTwo, heroStripThree];

const trustPoints = [
  { label: 'Built for decision clarity' },
  { label: 'No spam - only product updates' },
  { label: 'Designed to reduce overwhelm' }
];

const fitSignals = [
  'You want planning to feel calm, not chaotic.',
  'You’re tired of opinions being louder than your own voice.',
  'You love structure but hate spreadsheets.',
  'You want to make decisions once and stop second guessing.',
  'You want to plan with your partner without playing project manager.'
];

const hiddenHomePosts = [
  'what-to-do-after-getting-engaged',
  'how-to-plan-a-wedding-weekend',
  'finding-your-wedding-voice',
  'the-power-of-an-offline-ceremony',
  'calm-recovery-plan',
  'how-to-plan-a-wedding-without-losing-your-mind'
];

export default function HomePage() {
  const posts = getAllPosts()
    .filter((post) => !hiddenHomePosts.includes(post.slug))
    .slice(0, 3);

  return (
    <div>
      <section className="hero hero--gradient hero--centered" id="experience">
        <div className="hero__content">
          <p className="eyebrow">Wedding OS + Journal</p>
          <h1>Plan your wedding with clarity.</h1>
          <p className="hero__subheading">A calm wedding planning app that keeps decisions clear, overwhelm low, and support easy.</p>
          <div className="hero__actions">
            <Link href="/reset" className="primary-button">
              Start the 10-minute reset
            </Link>
            <Link href="/#services" className="ghost-button">
              I’m curious - show me how it works
            </Link>
            <Link href="/#services" className="hero-secondary-link">
              Discover what’s inside
            </Link>
          </div>
        </div>
        <PhonePreviewRow shots={heroShots.map((shot) => ({ src: shot }))} />
      </section>
      <section className="trust-strip" aria-label="Product reassurance">
        {trustPoints.map((point) => (
          <p className="trust-item" key={point.label}>
            {point.label}
          </p>
        ))}
      </section>
      <HomeCheckIn />

      <section className="calm-intro">
        <div>
          <p className="eyebrow">Everything you need in one place</p>
          <h2>The five parts of wedding planning that actually matter</h2>
          <p>Designed to bring structure, clarity, and calm to wedding planning, without the noise or the pressure to do everything at once.</p>
        </div>
        <div className="calm-intro__chips">
          {planningPillars.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section className="services" id="services">
        <div className="section-heading">
          <p className="eyebrow">Workflows</p>
          <h2>Plan your wedding, step by step</h2>
          <p>Three core tools designed to keep planning moving, decisions clear, and everything in one place.</p>
        </div>
        <div className="services__grid">
          {workflowStories.map((module) => (
            <article key={module.title}>
              <div className="media-frame">
                <Image src={module.image} alt={module.title} width={420} height={860} className="media-image" />
              </div>
              <h3>{module.title}</h3>
              <p>{module.copy}</p>
              <Link href={module.ctaHref} className="text-button">
                {module.ctaLabel}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="services" id="inside">
        <div className="section-heading">
          <p className="eyebrow">More inside the app</p>
          <h2>Support for every part of planning.</h2>
          <p>Thoughtful tools that support your guests, your decisions, and your headspace throughout the planning journey.</p>
        </div>
        <div className="services__grid">
          {extendedFeatures.map((feature) => (
            <article key={feature.title}>
              {feature.image ? (
                <div className="media-frame">
                  <Image src={feature.image} alt={feature.title} width={420} height={860} className="media-image" />
                </div>
              ) : null}
              <h3>{feature.title}</h3>
              <p>{feature.copy}</p>
              {feature.href ? (
                <Link href={feature.href} className="text-button">
                  Read more
                </Link>
              ) : null}
            </article>
          ))}
        </div>
      </section>
      <section className="fit-section">
        <div className="section-heading small">
          <p className="eyebrow">This is for you if…</p>
          <h2>The calm route sounds like relief.</h2>
        </div>
        <ul>
          {fitSignals.map((signal) => (
            <li key={signal}>{signal}</li>
          ))}
        </ul>
      </section>

      <section className="stats" id="collections">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="stat-value">{stat.value}</p>
            <p className="stat-label">{stat.label}</p>
          </div>
        ))}
      </section>

      <section className="blog-preview">
        <div className="section-heading">
          <p className="eyebrow">From the journal</p>
          <h2>Thoughtful reads for modern wedding planning</h2>
          <p>Writing on wedding planning, decision making, and modern expectations, designed to bring perspective, not pressure.</p>
        </div>
        <div className="blog-preview__grid">
          {posts.map((post) => (
            <article key={post.slug}>
              {post.coverImage ? (
                <div className="media-frame">
                  <Image src={post.coverImage} alt={post.title} width={420} height={260} />
                </div>
              ) : null}
              <p className="eyebrow">
                {new Date(post.date).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="text-button">
                Read more
              </Link>
            </article>
          ))}
        </div>
        <div className="center">
          <Link href="/journal" className="ghost-button">
            Visit the journal
          </Link>
        </div>
      </section>
      <section className="cta-repeat">
        <div>
          <h2>Want clarity before you make your next move?</h2>
          <p>We’ll only reach out when the next step genuinely matters.</p>
        </div>
        <Link href="/reset" className="primary-button">
          Start the 10-minute reset
        </Link>
      </section>

      <section className="cta" id="signup">
        <div>
          <p className="eyebrow">Ready when you are</p>
          <h2>Start with clarity when you’re ready.</h2>
          <p>We’ll only reach out when the next step genuinely matters.</p>
        </div>
        <div className="cta__form">
          <Link href="/reset" className="primary-button">
            Start the 10-minute reset
          </Link>
          <p className="form-microcopy">
            You’ll enter your email on the next screen to save your reset + get early access.
          </p>
        </div>
      </section>
    </div>
  );
}
