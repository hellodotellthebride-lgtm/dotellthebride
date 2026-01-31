'use client';

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';

type Step = 1 | 2 | 3;

const timingOptions = ['12+ months', '9-12 months', '6-9 months', '3-6 months', '4-8 weeks', '1-3 weeks', 'Wedding week'] as const;
const headspaceOptions = ['Light', 'Manageable', 'A bit much', 'Overwhelming', 'Please make it stop'] as const;
const noiseOptions = ['Too many opinions', 'Too many options', 'Budget uncertainty', "I don't know where to start"] as const;

type TimingOption = (typeof timingOptions)[number];
type HeadspaceOption = (typeof headspaceOptions)[number];
type NoiseOption = (typeof noiseOptions)[number];

const timelineMeta: Record<TimingOption, { stageTitle: string; stageLine: string }> = {
  '12+ months': {
    stageTitle: 'Just engaged',
    stageLine: 'You are in the wide-open part of planning where orientation matters more than tasks.'
  },
  '9-12 months': {
    stageTitle: 'Early planning',
    stageLine: 'You are shaping direction before the big decisions lock in.'
  },
  '6-9 months': {
    stageTitle: 'Decision season',
    stageLine: 'You are mid-planning, where trade-offs become real.'
  },
  '3-6 months': {
    stageTitle: 'Details mode',
    stageLine: 'You are managing moving pieces that touch every part of the day.'
  },
  '4-8 weeks': {
    stageTitle: 'Final stretch',
    stageLine: 'You are closing loops and protecting energy before the day arrives.'
  },
  '1-3 weeks': {
    stageTitle: 'Almost there',
    stageLine: 'You are in the final focus window where calm is a priority.'
  },
  'Wedding week': {
    stageTitle: 'Wedding week',
    stageLine: 'You are already in the week of the wedding, where less is more.'
  }
};

const heavinessMeta: Record<HeadspaceOption, { toneLine: string; pacingLine: string; needsProtection: boolean }> = {
  Light: {
    toneLine: 'You have breathing room, so gentle structure is enough.',
    pacingLine: 'Keep choices small and reflective.',
    needsProtection: false
  },
  Manageable: {
    toneLine: 'You are carrying things steadily even if they take effort.',
    pacingLine: 'Plan in small bursts and pause often.',
    needsProtection: false
  },
  'A bit much': {
    toneLine: 'Your brain is asking for clearer order.',
    pacingLine: 'Limit tasks to the ones that move you forward.',
    needsProtection: false
  },
  Overwhelming: {
    toneLine: 'There is no spare capacity right now.',
    pacingLine: 'Reduce the volume before adding anything new.',
    needsProtection: true
  },
  'Please make it stop': {
    toneLine: 'Your energy needs protection more than it needs action.',
    pacingLine: 'Only the calmest decisions stay on the table today.',
    needsProtection: true
  }
};

const noiseMeta: Record<NoiseOption, { problemTitle: string; problemLine: string }> = {
  'Too many opinions': {
    problemTitle: 'carrying too many voices',
    problemLine: 'Other people’s thoughts are taking up the space your voice needs.'
  },
  'Too many options': {
    problemTitle: 'decisions competing for attention',
    problemLine: 'Every option looks possible which keeps you in research mode.'
  },
  'Budget uncertainty': {
    problemTitle: 'money questions blurring decisions',
    problemLine: 'Spending choices are mixing with emotional choices, so nothing feels solid.'
  },
  "I don't know where to start": {
    problemTitle: 'not sure where to begin',
    problemLine: 'Direction disappeared, so even simple steps feel heavy.'
  }
};

const timelineOrder: TimingOption[] = [...timingOptions];
const headspaceOrder: HeadspaceOption[] = [...headspaceOptions];
const noiseOrder: NoiseOption[] = [...noiseOptions];

const tryThisByNoise: Record<NoiseOption, string[]> = {
  'Too many opinions': [
    'Mute the loudest group chat for the next 24 hours.',
    'Ask only the person who will stand beside you to weigh in today.'
  ],
  'Too many options': [
    'Pick one shortlist and ignore every other tab for the day.',
    'Decide in advance how many options you will actively compare.'
  ],
  'Budget uncertainty': [
    'Write the top two priorities before reopening the spreadsheet.',
    'Label spends as must-have or nice-to-have and pause everything else.'
  ],
  "I don't know where to start": [
    'Name one thing that matters by the end of today and let that be enough.',
    'List what is already decided so the next choice feels smaller.'
  ]
};

const tryThisByHeaviness: Record<HeadspaceOption, string[]> = {
  Light: [
    'Add a gentle planning block to your calendar and stop once it ends.',
    'Protect the calm by closing the laptop after one decision.'
  ],
  Manageable: [
    'Set a fifteen minute timer so planning stays contained.',
    'Choose the next step before checking any inspiration feeds.'
  ],
  'A bit much': [
    'Trade one decision for rest and revisit with a clearer head.',
    'Move one choice to tomorrow so today can stay lighter.'
  ],
  Overwhelming: [
    'Step away from planning for one hour before you decide anything.',
    'Ask someone you trust to own the next email or phone call.'
  ],
  'Please make it stop': [
    'Delay every non-essential task until you have slept or eaten.',
    'Give yourself permission to do nothing wedding-related this evening.'
  ]
};

const tryThisByTimeline: Record<TimingOption, string[]> = {
  '12+ months': [
    'Keep ideas in one calm note so they stay organised.',
    'Focus on naming the feeling of the day, not the details.'
  ],
  '9-12 months': [
    'Reconnect to your top values before messaging any suppliers.',
    'Use a single planning doc and archive everything else.'
  ],
  '6-9 months': [
    'Choose trade-offs once, then remind yourself why they matter.',
    'Finish the easiest decision first to build fresh momentum.'
  ],
  '3-6 months': [
    'Batch admin by theme so details stop bleeding into each other.',
    'Confirm one supplier at a time and move on immediately.'
  ],
  '4-8 weeks': [
    'Treat new ideas as optional experiments, not requirements.',
    'If a change does not make the day calmer, skip it.'
  ],
  '1-3 weeks': [
    'Delegate anything that is not strictly yours to decide.',
    'Check the running order once, then put it away.'
  ],
  'Wedding week': [
    'Keep your phone out of reach during rest pockets.',
    'Let someone else handle final questions so you can stay present.'
  ]
};

type TimelineBand = 'early' | 'mid' | 'late';

const timelineBandMap: Record<TimingOption, TimelineBand> = {
  '12+ months': 'early',
  '9-12 months': 'early',
  '6-9 months': 'mid',
  '3-6 months': 'mid',
  '4-8 weeks': 'late',
  '1-3 weeks': 'late',
  'Wedding week': 'late'
};

const orientationPool = [
  'A way to turn vague ideas into clear priorities before planning begins.',
  'A starting point that helps couples understand what actually matters to them.',
  'Early planning support that focuses on direction, not action.'
];

const decisionPool = [
  'Structured comparisons that make trade-offs clearer, not louder.',
  'A decision layer that prevents endless re-thinking.'
];

const pacePool = [
  'Planning support that intentionally narrows as the wedding gets closer.',
  'An experience that hides non-essential decisions when pressure is high.',
  'A system that protects energy during the final stretch.'
];

const overwhelmPool = [
  'Built-in limits that prevent planning overload.',
  'A calmer alternative to endless lists, tabs, and spreadsheets.',
  'Planning logic that knows when to stop asking for more input.'
];

const buildProductLine = (timing: TimingOption, headspace: HeadspaceOption): string => {
  const band = timelineBandMap[timing];
  if (headspace === 'Overwhelming' || headspace === 'Please make it stop') {
    return overwhelmPool[(headspaceOrder.indexOf(headspace) + band.length) % overwhelmPool.length];
  }
  if (band === 'early') {
    return orientationPool[headspaceOrder.indexOf(headspace) % orientationPool.length];
  }
  if (band === 'mid') {
    return decisionPool[headspaceOrder.indexOf(headspace) % decisionPool.length];
  }
  return pacePool[(headspaceOrder.indexOf(headspace) + 1) % pacePool.length];
};

const getTryThis = (timing: TimingOption, headspace: HeadspaceOption, noise: NoiseOption): string => {
  const tIndex = timelineOrder.indexOf(timing);
  const hIndex = headspaceOrder.indexOf(headspace);
  const nIndex = noiseOrder.indexOf(noise);
  const pick = (arr: string[]) => arr[(tIndex + hIndex + nIndex) % arr.length];
  return `${pick(tryThisByNoise[noise])} ${pick(tryThisByHeaviness[headspace])} ${pick(tryThisByTimeline[timing])}`.trim();
};

const getReflectionContent = (timing: TimingOption, headspace: HeadspaceOption, noise: NoiseOption) => {
  const { stageTitle, stageLine } = timelineMeta[timing];
  const { problemTitle, problemLine } = noiseMeta[noise];
  const { toneLine, pacingLine, needsProtection } = heavinessMeta[headspace];
  const titlePrefix = `${stageTitle} — ${problemTitle}`;
  const title = needsProtection ? `${titlePrefix} (go gently)` : titlePrefix;
  const intro = `${stageLine} ${toneLine}`;
  const body = `${problemLine} ${pacingLine}`;
  const building = buildProductLine(timing, headspace);
  const tryThis = getTryThis(timing, headspace, noise);
  return { title, intro, body, building, tryThis };
};

const scrollToSignup = () => {
  if (typeof document === 'undefined' || typeof window === 'undefined') return;
  const section = document.getElementById('signup');
  if (!section) return;
  const headerOffset = 80;
  const offsetTop = section.getBoundingClientRect().top + window.scrollY - headerOffset;
  window.scrollTo({ top: offsetTop, behavior: 'smooth' });
};

export default function HomeCheckIn() {
  const [step, setStep] = useState<Step>(1);
  const [timing, setTiming] = useState<TimingOption | null>(null);
  const [headspace, setHeadspace] = useState<HeadspaceOption | null>(null);
  const [noise, setNoise] = useState<NoiseOption | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [hasAutoScrolled, setHasAutoScrolled] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const cardScrollRef = useRef<HTMLDivElement>(null);

  const canProceed = useMemo(() => {
    if (step === 1) return Boolean(timing);
    if (step === 2) return Boolean(headspace);
    if (step === 3) return Boolean(noise);
    return false;
  }, [step, timing, headspace, noise]);

  const result = useMemo(() => {
    if (!timing || !headspace || !noise) return null;
    const tryThis = getTryThis(timing, headspace, noise);
    return {
      ...getReflectionContent(timing, headspace, noise),
      tryThis
    };
  }, [timing, headspace, noise]);

  const reset = () => {
    setStep(1);
    setTiming(null);
    setHeadspace(null);
    setNoise(null);
    setShowResult(false);
    setHasAutoScrolled(false);
  };

  const handleNext = () => {
    if (!canProceed) return;
    if (step < 3) {
      setStep((prev) => (prev + 1) as Step);
      return;
    }

    if (!showResult) {
      setHasAutoScrolled(false);
    }

    setShowResult(true);
    const button = document.querySelector('[data-event="checkin_completed"]');
    if (button instanceof HTMLElement) button.blur();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleNext();
  };

  const handleBack = () => {
    if (step === 1) return;
    setStep((prev) => (prev - 1) as Step);
  };

  useEffect(() => {
    if (showResult && !hasAutoScrolled) {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setHasAutoScrolled(true);
    }
  }, [showResult, hasAutoScrolled]);

  return (
    <section className="checkin">
      <div className="checkin__intro">
        <p className="eyebrow">A QUICK CHECK-IN</p>
        <h2>Where are you right now?</h2>
        <p>Answer a few gentle questions and we’ll reflect what matters most - without adding more to your plate.</p>
      </div>
      <form onSubmit={handleSubmit} className="checkin__form">
        <div className={`checkin__card${showResult ? ' is-result' : ''}`}>
          <div className="checkin__headerbar">
            <div className="checkin__progress">
              <span>{showResult ? 'Reflection' : `${step} of 3`}</span>
              <div className="checkin__headerbar-actions">
                {!showResult && step > 1 && (
                  <button type="button" className="text-button" onClick={handleBack}>
                    Back
                  </button>
                )}
                <button type="button" className="text-button" onClick={reset}>
                  Restart
                </button>
              </div>
            </div>
          </div>
          <div className="checkin__body" ref={cardScrollRef}>
            {step === 1 && (
              <div>
                <p className="checkin__label">How close is your wedding?</p>
              <p className="checkin__reassure">30 seconds. No email.</p>
              <div className="checkin__options">
                {timingOptions.map((option) => (
                  <label key={option} className={timing === option ? 'is-active' : undefined}>
                    <input type="radio" name="timing" value={option} checked={timing === option} onChange={() => setTiming(option)} />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
            {step === 2 && (
              <div>
                <p className="checkin__label">How heavy does planning feel today?</p>
              <div className="checkin__options">
                {headspaceOptions.map((option) => (
                  <label key={option} className={headspace === option ? 'is-active' : undefined}>
                    <input type="radio" name="headspace" value={option} checked={headspace === option} onChange={() => setHeadspace(option)} />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
            {step === 3 && !showResult && (
              <div>
                <p className="checkin__label">What’s creating the most noise right now?</p>
                <div className="checkin__options">
                  {noiseOptions.map((option) => (
                    <label key={option} className={noise === option ? 'is-active' : undefined}>
                      <input type="radio" name="noise" value={option} checked={noise === option} onChange={() => setNoise(option)} />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
            {!showResult && (
              <div className="checkin__actions">
                <button
                  type="submit"
                  className="primary-button"
                  disabled={!canProceed}
                  data-event={step === 3 ? 'checkin_completed' : undefined}
                >
                  {step === 3 ? 'Show me my check-in' : 'Next'}
                </button>
              </div>
            )}
            <div
              className={`checkin__results${showResult && result ? ' is-visible' : ''}`}
              ref={resultsRef}
              aria-live="polite"
            >
              {showResult && result ? (
                <div>
                  <h3>{result.title}</h3>
                  <p>{result.intro}</p>
                  <p>{result.body}</p>
                  <div className="checkin__boxes">
                    <div className="checkin__box checkin__box--building">
                      <h4>What we’re building</h4>
                      <p>{result.building}</p>
                    </div>
                    <div className="checkin__box checkin__box--tip">
                      <h4>Try this</h4>
                      <p>{result.tryThis}</p>
                    </div>
                  </div>
                  <div className="checkin__cta-block">
                    <button type="button" className="primary-button" data-event="checkin_scroll_to_signup" onClick={scrollToSignup}>
                      Start with clarity
                    </button>
                    <p className="checkin__micro">No spam - just thoughtful updates when clarity matters.</p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
