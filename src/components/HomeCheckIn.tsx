'use client';

import { FormEvent, useMemo, useState } from 'react';

type Step = 1 | 2 | 3;

const timingOptions = ['12+ months', '9-12 months', '6-9 months', '3-6 months', '4-8 weeks', '1-3 weeks', 'Wedding week'] as const;
const headspaceOptions = ['Light', 'Manageable', 'A bit much', 'Overwhelming', 'Please make it stop'] as const;
const noiseOptions = ['Too many opinions', 'Too many options', 'Budget uncertainty', "I don't know where to start"] as const;

type TimingOption = (typeof timingOptions)[number];
type HeadspaceOption = (typeof headspaceOptions)[number];
type NoiseOption = (typeof noiseOptions)[number];

const timelineTitleMap: Record<TimingOption, string> = {
  '12+ months': 'Just engaged',
  '9-12 months': 'Early planning',
  '6-9 months': 'Decision season',
  '3-6 months': 'Details mode',
  '4-8 weeks': 'Final stretch',
  '1-3 weeks': 'Almost there',
  'Wedding week': 'Wedding week'
};

const noiseTitleSuffix: Record<NoiseOption, string> = {
  'Too many opinions': 'carrying too many voices',
  'Too many options': 'decisions competing for attention',
  'Budget uncertainty': 'money questions blurring decisions',
  "I don't know where to start": 'not sure where to begin'
};

const timelineContextMap: Record<TimingOption, string> = {
  '12+ months': 'In the just-engaged stage,',
  '9-12 months': 'In early planning,',
  '6-9 months': 'Mid-planning,',
  '3-6 months': 'As details stack up,',
  '4-8 weeks': 'In the final stretch,',
  '1-3 weeks': 'With the day almost here,',
  'Wedding week': 'This week,'
};

const noiseValidationMap: Record<NoiseOption, string> = {
  'Too many opinions': 'it makes sense that other voices feel louder than your own',
  'Too many options': 'every option is fighting for your attention',
  'Budget uncertainty': 'money questions keep blurring even simple choices',
  "I don't know where to start": 'not being sure where to begin makes everything feel bigger than it is'
};

const headspaceFeelingMap: Record<HeadspaceOption, string> = {
  Light: 'You have breathing room — keep it gentle.',
  Manageable: 'You’re holding it, but it still deserves care.',
  'A bit much': 'Your headspace is asking for clearer order.',
  Overwhelming: 'There isn’t any spare capacity right now.',
  'Please make it stop': 'Your energy needs protection before more input.'
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

const reframingMatrix: Record<NoiseOption, Record<TimelineBand, string>> = {
  'Too many opinions': {
    early: 'When your vision is still forming, outside voices rush in — filtering slowly is the work.',
    mid: 'Once choices are visible, more people weigh in. Restricting who gets input keeps things humane.',
    late: 'Closer to the day, opinions spike because change feels urgent. Narrowing the circle protects your energy.'
  },
  'Too many options': {
    early: 'Exploration is useful now, but the ideas need a container so possibilities don’t multiply forever.',
    mid: 'Mid-planning needs constraints, not more research — choosing trade-offs is forward motion.',
    late: 'Late in planning, new options mostly create rework. Closing the door on extras is progress.'
  },
  'Budget uncertainty': {
    early: 'Before timelines kick in, money worries are your brain asking for priorities first.',
    mid: 'Midway through, budgets feel blurry because every decision connects. Revisiting what matters keeps you steady.',
    late: 'Near the finish line, budget wobbles are about protection. Only adjust if it truly changes the day.'
  },
  "I don't know where to start": {
    early: 'At the very start, direction comes before action. Structure is the missing ingredient.',
    mid: 'Even mid-planning, losing the starting thread means the roadmap needs simplifying.',
    late: 'This close to the day, you don’t need a new plan — just reconnect to the next visible step.'
  }
};

const overwhelmLineMap: Record<NoiseOption, string> = {
  'Too many opinions': 'Planning logic that knows when to stop asking for more input.',
  'Too many options': 'Built-in limits that prevent planning overload.',
  'Budget uncertainty': 'A calmer alternative to endless lists, tabs, and spreadsheets.',
  "I don't know where to start": 'Planning support that intentionally narrows as the wedding gets closer.'
};

const orientationLines: Record<NoiseOption, string> = {
  'Too many opinions': 'A starting point that helps couples understand what actually matters to them.',
  'Too many options': 'Early planning support that focuses on direction, not action.',
  'Budget uncertainty': 'A way to turn vague ideas into clear priorities before planning begins.',
  "I don't know where to start": 'A starting point that helps couples understand what actually matters to them.'
};

const decisionLines: Record<NoiseOption, string> = {
  'Too many opinions': 'Decision support that helps couples choose once — and move on.',
  'Too many options': 'Structured comparisons that make trade-offs clearer, not louder.',
  'Budget uncertainty': 'A decision layer that prevents endless re-thinking.',
  "I don't know where to start": 'Decision support that helps couples choose once — and move on.'
};

const paceLines: Record<NoiseOption, string> = {
  'Too many opinions': 'An experience that hides non-essential decisions when pressure is high.',
  'Too many options': 'Planning support that intentionally narrows as the wedding gets closer.',
  'Budget uncertainty': 'A system that protects energy during the final stretch.',
  "I don't know where to start": 'A system that protects energy during the final stretch.'
};

const nextStepMap: Record<HeadspaceOption, string> = {
  Light: 'Capture the calm by noting one thing that already feels steady — nothing more.',
  Manageable: 'Write down the smallest next step and pause once it’s on paper.',
  'A bit much': 'Pick one decision to pause and one to move forward — no extra tabs.',
  Overwhelming: 'Close the tabs and revisit only the choice that truly shapes this week.',
  'Please make it stop': 'Step away for an hour; nothing new deserves your energy until you’ve rested.'
};

const buildProductLine = (timing: TimingOption, headspace: HeadspaceOption, noise: NoiseOption): string => {
  if (headspace === 'Overwhelming' || headspace === 'Please make it stop') {
    return overwhelmLineMap[noise];
  }

  const band = timelineBandMap[timing];
  if (band === 'early') {
    return orientationLines[noise];
  }
  if (band === 'mid') {
    return decisionLines[noise];
  }
  return paceLines[noise];
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

  const canProceed = useMemo(() => {
    if (step === 1) return Boolean(timing);
    if (step === 2) return Boolean(headspace);
    if (step === 3) return Boolean(noise);
    return false;
  }, [step, timing, headspace, noise]);

  const result = useMemo(() => {
    if (!timing || !headspace || !noise) return null;
    const baseTitle = `${timelineTitleMap[timing]} — ${noiseTitleSuffix[noise]}`;
    const title = headspace === 'Overwhelming' || headspace === 'Please make it stop' ? `${baseTitle} (go gently)` : baseTitle;
    const validation = `${timelineContextMap[timing]} ${noiseValidationMap[noise]}. ${headspaceFeelingMap[headspace]}`;
    const reframing = reframingMatrix[noise][timelineBandMap[timing]];
    const building = buildProductLine(timing, headspace, noise);
    const nextStep = nextStepMap[headspace];

    return {
      title,
      validation,
      reframing,
      building,
      nextStep
    };
  }, [timing, headspace, noise]);

  const reset = () => {
    setStep(1);
    setTiming(null);
    setHeadspace(null);
    setNoise(null);
    setShowResult(false);
  };

  const handleNext = () => {
    if (!canProceed) return;
    if (step < 3) {
      setStep((prev) => (prev + 1) as Step);
      return;
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

  return (
    <section className="checkin">
      <div className="checkin__intro">
        <p className="eyebrow">A QUICK CHECK-IN</p>
        <h2>Where are you right now?</h2>
        <p>Answer a few gentle questions and we’ll reflect what matters most - without adding more to your plate.</p>
      </div>
      <div className="checkin__grid">
        <form className="checkin__panel" onSubmit={handleSubmit}>
          <div className="checkin__progress">
            <span>
              {step} of 3
            </span>
            {step > 1 && (
              <button type="button" className="text-button" onClick={handleBack}>
                Back
              </button>
            )}
          </div>
          {step === 1 && (
            <div>
              <p className="checkin__label">How close is your wedding?</p>
              <p className="checkin__reassure">30 seconds. No email.</p>
              <div className="checkin__options">
                {timingOptions.map((option) => (
                  <label key={option}>
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
                  <label key={option}>
                    <input type="radio" name="headspace" value={option} checked={headspace === option} onChange={() => setHeadspace(option)} />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
          {step === 3 && (
            <div>
              <p className="checkin__label">What’s creating the most noise right now?</p>
              <div className="checkin__options">
                {noiseOptions.map((option) => (
                  <label key={option}>
                    <input type="radio" name="noise" value={option} checked={noise === option} onChange={() => setNoise(option)} />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
          <div className="checkin__actions">
            <button type="button" className="text-link" onClick={reset}>
              Reset
            </button>
            <button
              type="submit"
              className="primary-button"
              disabled={!canProceed}
              data-event={step === 3 ? 'checkin_completed' : undefined}
            >
              {step === 3 ? 'Show me my check-in' : 'Next'}
            </button>
          </div>
        </form>
        <div className="checkin__result">
          {showResult && result ? (
            <div className="checkin__card">
              <div className="checkin__card-header">
                <p className="eyebrow">Reflection</p>
                <button type="button" className="text-link" onClick={reset}>
                  Restart
                </button>
              </div>
              <h3>{result.title}</h3>
              <p>{result.validation}</p>
              <p>{result.reframing}</p>
              <p className="checkin__building">What we’re building: {result.building}</p>
              <p className="checkin__tip">Try this: {result.nextStep}</p>
              <button type="button" className="primary-button" data-event="checkin_scroll_to_signup" onClick={scrollToSignup}>
                Start with clarity
              </button>
              <p className="checkin__micro">No spam - just thoughtful updates when clarity matters.</p>
            </div>
          ) : (
            <div className="checkin__placeholder">
              <p>Results will appear here after your check-in.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
