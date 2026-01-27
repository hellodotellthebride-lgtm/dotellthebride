'use client';

import { useEffect, useMemo, useState } from 'react';

const timelinePhases = [
  { value: 0, label: 'Just engaged (12+ months)', key: 'justEngaged' },
  { value: 1, label: 'Early planning (9–12 months)', key: 'earlyPlanning' },
  { value: 2, label: 'Decision season (6–9 months)', key: 'decisionSeason' },
  { value: 3, label: 'Details mode (3–6 months)', key: 'detailsMode' },
  { value: 4, label: 'Final stretch (4–8 weeks)', key: 'finalStretch' },
  { value: 5, label: 'Almost there (1–3 weeks)', key: 'almostThere' },
  { value: 6, label: 'Wedding week', key: 'weddingWeek' }
];

const headspaceLevels = ['Calm, I’ve got this', 'Mostly okay', 'A bit much', 'Overloaded', 'Please make it stop'];

type OutputState = {
  headline: string;
  grounding: string;
  tip: string;
  building: string;
};

const state = (headline: string, grounding: string, tip: string, building: string): OutputState => ({
  headline,
  grounding,
  tip,
  building
});

const canonicalLines = {
  core: [
    'A calm planning system that adapts as timing and pressure change.',
    'A single planning flow that reshapes itself based on what matters now.',
    'An experience designed to reduce decisions before adding tasks.'
  ],
  orientation: [
    'A way to turn vague ideas into clear priorities before planning begins.',
    'A starting point that helps couples understand what actually matters to them.',
    'Early planning support that focuses on direction, not action.'
  ],
  decision: [
    'Decision support that helps couples choose once - and move on.',
    'Structured comparisons that make trade-offs clearer, not louder.',
    'A decision layer that prevents endless re-thinking.'
  ],
  pace: [
    'Planning support that intentionally narrows as the wedding gets closer.',
    'An experience that hides non-essential decisions when pressure is high.',
    'A system that protects energy during the final stretch.'
  ],
  overwhelm: [
    'Built-in limits that prevent planning overload.',
    'A calmer alternative to endless lists, tabs, and spreadsheets.',
    'Planning logic that knows when to stop asking for more input.'
  ]
} as const;

type TimelineKey = (typeof timelinePhases)[number]['key'];

const stageIndexByKey = timelinePhases.reduce<Record<TimelineKey, number>>((acc, phase, index) => {
  acc[phase.key as TimelineKey] = index;
  return acc;
}, {} as Record<TimelineKey, number>);

const selectCanonicalLine = (stageKey: TimelineKey, headspaceIndex: number): string => {
  const stageIndex = stageIndexByKey[stageKey] ?? 0;
  let group: keyof typeof canonicalLines = 'core';

  if (headspaceIndex >= 4) {
    group = 'overwhelm';
  } else if (headspaceIndex === 3) {
    group = stageIndex <= 3 ? 'decision' : 'pace';
  } else {
    if (stageIndex <= 1) group = 'orientation';
    else if (stageIndex <= 3) group = headspaceIndex === 2 ? 'decision' : 'decision';
    else group = 'pace';
  }

  if (headspaceIndex <= 2) {
    if (stageIndex <= 1) group = 'orientation';
    else if (stageIndex <= 3) group = 'decision';
    else group = 'pace';
  }

  const lines = canonicalLines[group] ?? canonicalLines.core;
  const line = lines[(stageIndex + headspaceIndex) % lines.length];
  return line ?? canonicalLines.core[0];
};

const stageCopy: Record<TimelineKey, Array<{ headline: string; grounding: string; tip: string }>> = {
  justEngaged: [
    { headline: 'Just engaged - everything feels possible.', grounding: 'Orientation, not planning. Nothing needs deciding yet.', tip: 'Write down three words you want the day to feel like.' },
    { headline: 'Just engaged - exploring gently.', grounding: 'Light structure is enough; you’re allowed to wander.', tip: 'Keep a “love / like / no thanks” note while you scroll.' },
    { headline: 'Just engaged - already noisy.', grounding: 'You can slow everything down; most choices can wait.', tip: 'Choose one thing (season or vibe) and ignore the rest.' },
    { headline: 'Just engaged - suddenly rushed.', grounding: 'Back to basics protects your headspace.', tip: 'Write a “not doing” list with three opt-outs.' },
    { headline: 'Just engaged - feeling overwhelmed.', grounding: 'Pausing is still progress.', tip: 'Block a 72-hour planning pause and honour it.' }
  ],
  earlyPlanning: [
    { headline: 'Early planning - steady for now.', grounding: 'Direction comes before decisions.', tip: 'Pick the two priorities you refuse to compromise on.' },
    { headline: 'Early planning - gently shaping.', grounding: 'High-level choices are enough right now.', tip: 'Set a guest range before you peek at venues.' },
    { headline: 'Early planning - starting to sprawl.', grounding: 'Less research equals more clarity.', tip: 'Freeze new inspo until you settle those priorities.' },
    { headline: 'Early planning - too much input.', grounding: 'Clarity beats volume every time.', tip: 'Move everything into one doc and archive the rest.' },
    { headline: 'Early planning - already feeling the weight.', grounding: 'Resetting expectations is allowed.', tip: 'Ask one person to pause the inspo DMs for a week.' }
  ],
  decisionSeason: [
    { headline: 'Decision season - surprisingly calm.', grounding: 'Make the big calls once and move forward.', tip: 'List two splurges and two save areas before you book.' },
    { headline: 'Decision season - focused, not frantic.', grounding: 'Shortlists keep trade-offs visible.', tip: 'Cap every vendor shortlist at three names.' },
    { headline: 'Decision season - too many choices at once.', grounding: 'Constraints bring calm.', tip: 'Choose “best overall” or “best value” before reading quotes.' },
    { headline: 'Decision season - the noise is loud.', grounding: 'When everything is possible, clarity needs limits.', tip: 'Pick a decision date and stop researching after it.' },
    { headline: 'Decision season - feeling stuck.', grounding: 'Momentum beats perfection.', tip: 'Make the easiest decision just to get moving.' }
  ],
  detailsMode: [
    { headline: 'Details mode - still in control.', grounding: 'Details should support decisions already made.', tip: 'Keep a single “final choices” list in view.' },
    { headline: 'Details mode - tidying loose ends.', grounding: 'Finishing beats perfecting.', tip: 'Limit admin to two 30-minute blocks this week.' },
    { headline: 'Details mode - a lot to hold at once.', grounding: 'Sequencing lowers mental load.', tip: 'Split tasks into “waiting on” versus “can do now.”' },
    { headline: 'Details mode - everything suddenly feels urgent.', grounding: 'Optional extras can simply vanish.', tip: 'Cancel one add-on you don’t truly care about.' },
    { headline: 'Details mode - energy feels thin.', grounding: 'Tiny steps still count.', tip: 'Choose one 15-minute task and call it enough.' }
  ],
  finalStretch: [
    { headline: 'Final stretch - steady energy.', grounding: 'Confirmation beats change.', tip: 'Make a “waiting on” list and chase nothing else.' },
    { headline: 'Final stretch - almost there.', grounding: 'Momentum needs protection.', tip: 'Stop saving new inspo-bookmark it for anniversaries instead.' },
    { headline: 'Final stretch - everything feels urgent.', grounding: 'Only a few things truly matter now.', tip: 'List three non-negotiables for the next two weeks.' },
    { headline: 'Final stretch - spiralling a bit.', grounding: 'Delegating creates oxygen.', tip: 'Hand one tiny task to someone else today.' },
    { headline: 'Final stretch - energy is running low.', grounding: 'Pacing beats pushing.', tip: 'Remove one planning session from this week.' }
  ],
  almostThere: [
    { headline: 'Almost there - holding steady.', grounding: 'Protect the energy you have left.', tip: 'Write a “no more tweaks” note and keep it visible.' },
    { headline: 'Almost there - running low.', grounding: 'Reminders beat new tasks.', tip: 'Put every final deadline into one note and close the rest.' },
    { headline: 'Almost there - feeling stretched.', grounding: 'Good enough is a strategy.', tip: 'Label one area “good enough” today.' },
    { headline: 'Almost there - hard to think clearly now.', grounding: 'Reassurance beats action now.', tip: 'Choose rest over spreadsheets tonight.' },
    { headline: 'Almost there - fiercely protecting calm.', grounding: 'Freeze the plan and let it be.', tip: 'Declare “no new decisions” for the rest of the week.' }
  ],
  weddingWeek: [
    { headline: 'Wedding week - focusing on what matters most.', grounding: 'Only reminders still matter.', tip: 'Gather key contacts and timings into one simple note.' },
    { headline: 'Wedding week - staying present.', grounding: 'Planning can fade into the background.', tip: 'Name one “question catcher” so people stop pinging you.' },
    { headline: 'Wedding week - emotions running high.', grounding: 'Your headspace comes first.', tip: 'Schedule a 30-minute no-wedding zone each day.' },
    { headline: 'Wedding week - everything’s loud.', grounding: 'Support should feel invisible now.', tip: 'Reply “ask the point person” to anything new.' },
    { headline: 'Wedding week - just getting through the days.', grounding: 'There is nothing left to decide.', tip: 'Pick one grounding ritual and repeat it daily.' }
  ]
};

type PlanningMatrix = Record<TimelineKey, OutputState[]>;

const planningLogic = Object.entries(stageCopy).reduce<PlanningMatrix>((acc, [stageKey, entries]) => {
  acc[stageKey as TimelineKey] = entries.map((copy, headspaceIndex) =>
    state(copy.headline, copy.grounding, copy.tip, selectCanonicalLine(stageKey as TimelineKey, headspaceIndex))
  );
  return acc;
}, {} as PlanningMatrix);

export default function ClarityPreview() {
  const [timelineIndex, setTimelineIndex] = useState(2);
  const [headspaceIndex, setHeadspaceIndex] = useState(2);
  const [isAnimating, setIsAnimating] = useState(false);

  const outputKey = `${timelineIndex}-${headspaceIndex}`;

  const output = useMemo(() => planningLogic[timelinePhases[timelineIndex].key][headspaceIndex], [timelineIndex, headspaceIndex]);

  useEffect(() => {
    setIsAnimating(true);
    const timeout = setTimeout(() => setIsAnimating(false), 280);
    return () => clearTimeout(timeout);
  }, [outputKey]);

  return (
    <div className="clarity-preview">
      <div className="clarity-preview__controls">
        <label>
          Roughly how far away is your wedding?
          <span>{timelinePhases[timelineIndex].label}</span>
          <input type="range" min={0} max={timelinePhases.length - 1} step={1} value={timelineIndex} onChange={(event) => setTimelineIndex(Number(event.target.value))} />
          <div className="clarity-preview__ticks" aria-hidden="true">
            {timelinePhases.map((phase) => (
              <span key={phase.key}>{phase.label}</span>
            ))}
          </div>
        </label>
        <label>
          How heavy does planning feel right now?
          <span>{headspaceLevels[headspaceIndex]}</span>
          <input type="range" min={0} max={headspaceLevels.length - 1} step={1} value={headspaceIndex} onChange={(event) => setHeadspaceIndex(Number(event.target.value))} />
        </label>
      </div>
      <div className="clarity-preview__card">
        <div className={`clarity-preview__panel ${isAnimating ? 'is-updating' : ''}`}>
          <p className="clarity-preview__headline">{output.headline}</p>
          <p className="clarity-preview__grounding">{output.grounding}</p>
          <div className="clarity-preview__boxes">
            <div className="clarity-preview__box clarity-preview__box--building">
              <span className="clarity-preview__label clarity-preview__label--soft">What we’re building</span>
              <p>{output.building}</p>
            </div>
            {headspaceIndex >= 2 && (
              <div className="clarity-preview__box clarity-preview__box--tip">
                <span className="clarity-preview__label">Helpful tip</span>
                <p>{output.tip}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <p className="clarity-preview__micro">Early access means first to know when it’s ready - not a flood of emails.</p>
    </div>
  );
}
