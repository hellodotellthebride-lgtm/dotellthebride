import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import Image from 'next/image';
import PhonePreviewRow from '@/components/PhonePreviewRow';
import BrevoForm from '@/components/BrevoForm';
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
    ctaHref: '/#more-features'
  },
  {
    title: 'Ask Ivy',
    copy: 'Get thoughtful, practical answers to planning questions, tailored to where you are in your wedding journey.',
    image: journalMock,
    ctaLabel: 'Read more',
    ctaHref: '/#more-features'
  },
  {
    title: 'Inspiration Station',
    copy: 'Browse curated wedding looks, save your favourites and shape a visual direction you can act on.',
    image: inspirationMock,
    ctaLabel: 'Read more',
    ctaHref: '/#more-features'
  }
];

const extendedFeatures = [
  {
    title: 'Guest Nest',
    copy: 'Manage your guest list, RSVPs, notes, and groupings in one organised space, so nothing gets lost and decisions stay clear.',
    image: guestNestDetailMock
  },
  {
    title: 'Calm Corner',
    copy: 'A dedicated in app space for grounding guidance, reassurance, and perspective when planning starts to feel emotionally heavy.',
    image: collageMock
  },
  {
    title: 'Your Wedding Roadmap',
    copy: 'A clear, step by step planning path that shows what to do, when to do it, and what can wait.', 
    image: roadmapMock
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
          <p>
            One calm app to organise every part of your wedding. From guests and budgets to inspiration and timelines, Do Tell The Bride brings everything together in one considered planning system.
          </p>
          <div className="hero__actions">
            <Link href="/#contact" className="primary-button">
              Join our early access list
            </Link>
            <Link href="/#services" className="ghost-button">
              Explore our features
            </Link>
            <Link href="/overwhelmed-wedding-planning" className="hero-emotion-link">
              <span>Feeling overwhelmed with wedding planning?</span>
              <span>
                This is a calmer place to begin <span aria-hidden="true" className="hero-emotion-link__arrow">→</span>
              </span>
            </Link>
          </div>
        </div>
        <PhonePreviewRow shots={heroShots.map((shot) => ({ src: shot }))} />
      </section>

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
            </article>
          ))}
        </div>
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

      <section className="cta" id="contact">
        <div>
          <p className="eyebrow">Early access</p>
          <h2>A calmer way to plan your wedding</h2>
          <p>
            Early access to the Do Tell The Bride app, designed to bring structure, clarity, and calm to wedding planning.
          </p>
        </div>
        <BrevoForm />
      </section>
    </div>
  );
}
