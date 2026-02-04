'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import ResetShell from '@/components/reset/ResetShell';
import StepHeader from '@/components/reset/StepHeader';

const STORAGE_KEY = 'dttb_overwhelm_reset_v1';

type DetectedStage =
  | 'beginning'
  | 'earlyDecisions'
  | 'dreamTeam'
  | 'guestsInvites'
  | 'weddingStyle'
  | 'finalDetails'
  | 'weddingWeek'
  | 'wrapUp';

type DraftState = {
  email?: string;
  detectedStage?: DetectedStage;
  q1WhereAreYou?: string;
  q2HardestPart?: string;
  step?: number;
};

const stageLabels: Record<DetectedStage, string> = {
  beginning: 'Your Beginning',
  earlyDecisions: 'Your Early Decisions',
  dreamTeam: 'Your Dream Team',
  guestsInvites: 'Guests & Invitations',
  weddingStyle: 'Your Wedding Style',
  finalDetails: 'Final Details & Personal Touches',
  weddingWeek: 'Wedding Week',
  wrapUp: 'Wedding Wrap-Up'
};

const roadmapStages = [
  { key: 'beginning', label: 'Your Beginning' },
  { key: 'earlyDecisions', label: 'Your Early Decisions' },
  { key: 'dreamTeam', label: 'Your Dream Team' },
  { key: 'guestsInvites', label: 'Guests & Invitations' },
  { key: 'weddingStyle', label: 'Your Wedding Style' },
  { key: 'finalDetails', label: 'Final Details & Personal Touches' },
  { key: 'weddingWeek', label: 'Wedding Week' },
  { key: 'wrapUp', label: 'Wedding Wrap-Up' }
] as const;

const stageIndexMap: Record<DetectedStage, number> = {
  beginning: 0,
  earlyDecisions: 1,
  dreamTeam: 2,
  guestsInvites: 3,
  weddingStyle: 4,
  finalDetails: 5,
  weddingWeek: 6,
  wrapUp: 7
};

const q1Options = [
  { value: 'A', label: 'We’re engaged but haven’t really started', stage: 'beginning' },
  { value: 'B', label: 'We’ve set some basics like date or venue', stage: 'earlyDecisions' },
  { value: 'C', label: 'We’re booking suppliers', stage: 'dreamTeam' },
  { value: 'D', label: 'We’re dealing with guests and invitations', stage: 'guestsInvites' },
  { value: 'E', label: 'We’re deep in outfits, styling and details', stage: 'weddingStyle' },
  { value: 'F', label: 'We’re finalising everything', stage: 'finalDetails' },
  { value: 'G', label: 'The wedding is imminent', stage: 'weddingWeek' },
  { value: 'H', label: 'The wedding has just happened', stage: 'wrapUp' }
] as const;

const q2Options = [
  { value: '1', label: 'Knowing where to start' },
  { value: '2', label: 'Making decisions without second-guessing' },
  { value: '3', label: 'Getting suppliers booked' },
  { value: '4', label: 'Managing guests and opinions' },
  { value: '5', label: 'Making style decisions without spiralling' },
  { value: '6', label: 'Keeping track of all the final details' },
  { value: '7', label: 'Staying calm in the final run-up' },
  { value: '8', label: 'Dealing with the aftermath and admin' }
] as const;

const stageContent: Record<DetectedStage, { 
  focus: { doNext: string[]; decideSetup: string[]; oneThing: string }; 
  canWait: { later: string[]; onlyIfEnergy: string[] };
}> = {
  beginning: {
    focus: {
      doNext: [
        'Set budget boundaries (who pays what, rough max)',
        'Get a ballpark guest count (must-invites first)',
        'Choose 2–3 non-negotiables (what you care about most)'
      ],
      decideSetup: [
        'Pick your “wedding vibe” in one sentence (so decisions are easier)',
        'Agree what you’re NOT doing (e.g., no favours / no late night buffet)',
        'Start a simple notes doc for ideas (no rabbit holes yet)',
        'If venue not booked: define location + season preferences'
      ],
      oneThing: 'Write your one-sentence wedding vibe + 3 non-negotiables.'
    },
    canWait: {
      later: [
        'Décor shopping and styling details',
        'Seating plan and table layout',
        'Wedding day timeline',
        'Favours, signage, little extras'
      ],
      onlyIfEnergy: ['Pinterest boards', 'Name/place settings details']
    }
  },
  earlyDecisions: {
    focus: {
      doNext: [
        'Lock venue/date basics (or confirm they’re realistic)',
        'Do a guest count + capacity reality check',
        'Decide ceremony vs reception structure (one place vs two)'
      ],
      decideSetup: [
        'Start a simple budget split (top 3 spend areas)',
        'Decide wedding party roles (if any) + expectations',
        'Logistics: travel, accommodation, accessibility notes',
        'Decide kids/plus-ones approach (even provisional)'
      ],
      oneThing: 'Do the guest count reality check (must-invites + venue capacity).'
    },
    canWait: {
      later: [
        'Final colour palette decisions',
        'Styling accessories and décor add-ons',
        'Seating plan',
        'Day-of timeline'
      ],
      onlyIfEnergy: ['Stationery design deep dives', 'Outfit accessories']
    }
  },
  dreamTeam: {
    focus: {
      doNext: [
        'Choose the next supplier you’re booking (one at a time)',
        'Create a shortlist (3–5) + send enquiries',
        'Compare like-for-like quotes (what’s included, payment stages)'
      ],
      decideSetup: [
        'Write your must-haves (max 5) for each vendor',
        'Track deposits + payment dates somewhere simple',
        'Start a transport plan (who needs to get where)',
        'Confirm any venue/vendor restrictions early'
      ],
      oneThing: 'Pick ONE supplier to book next and send 3 enquiry emails.'
    },
    canWait: {
      later: [
        'Seating plan',
        'Favours, signage, tiny décor purchases',
        'Final styling decisions',
        'Wedding week schedule'
      ],
      onlyIfEnergy: ['Extra supplier add-ons', 'Honeymoon admin (if it stresses you)']
    }
  },
  guestsInvites: {
    focus: {
      doNext: [
        'Finalise guest list structure (day/evening if relevant)',
        'Collect addresses/contact details in one place',
        'Pick RSVP method (website/form/post) + set a deadline'
      ],
      decideSetup: [
        'Draft your key info/FAQ (travel, parking, timings, dress code)',
        'Plan accessibility/dietary capture (ask once, store it)',
        'Decide kids/plus-ones wording + stick to it',
        'Create a simple RSVP tracker (names, status, meal, notes)'
      ],
      oneThing: 'Write your FAQ + set your RSVP deadline.'
    },
    canWait: {
      later: [
        'Styling tweaks and décor accessories',
        'Big design changes',
        'Seating plan (unless you must)',
        'Wedding morning logistics'
      ],
      onlyIfEnergy: ['Extra stationery upgrades', 'Favour ideas']
    }
  },
  weddingStyle: {
    focus: {
      doNext: [
        'Set outfit timelines (order/alterations deadlines)',
        'Choose your style direction (3 words that describe it)',
        'Align photo/video priorities (what must be captured)'
      ],
      decideSetup: [
        'Decide wedding party style approach (matching vs coordinated)',
        'Pick key “hero” details (flowers / lighting / table vibe)',
        'Decide hair/makeup direction (trial timing)',
        'Choose meaningful traditions you’re keeping (skip the rest)'
      ],
      oneThing: 'Pick your 3 style words + 3 hero details (that’s your filter).'
    },
    canWait: {
      later: [
        'Seating plan',
        'Final week timeline',
        'Day-of logistics',
        'Speech/vow polishing'
      ],
      onlyIfEnergy: ['Extra décor add-ons', 'Last-minute styling swaps']
    }
  },
  finalDetails: {
    focus: {
      doNext: [
        'Confirm suppliers + arrival/delivery times',
        'Final payments checklist (what’s due when)',
        'Lock the running order (ceremony → reception flow)'
      ],
      decideSetup: [
        'Build your “final week folder” (contacts, invoices, timeline)',
        'Assign roles (who handles what on the day)',
        'Prepare an emergency kit / comfort plan (shoes, snacks, meds)',
        'Confirm transport/accommodation final numbers'
      ],
      oneThing: 'Create the final week folder (contacts + timeline + payments).'
    },
    canWait: {
      later: [
        'New supplier research',
        'Big styling changes',
        'New projects (DIY, signage, extras)',
        'Guest list reshuffles (unless necessary)'
      ],
      onlyIfEnergy: ['Extra purchases', 'Upgrades that add complexity']
    }
  },
  weddingWeek: {
    focus: {
      doNext: [
        'Final confirmations (supplier check-ins, contacts)',
        'Weather plan + backups (umbrellas, indoor plan)',
        'Wedding morning timeline (simple, realistic)'
      ],
      decideSetup: [
        'Choose your buffer person (who answers questions)',
        'Pack essentials (documents, rings, outfits, chargers)',
        'Put key info in one place (timeline + contacts)',
        'Decide your “no new decisions” rule'
      ],
      oneThing: 'Pick your buffer person + send them the timeline.'
    },
    canWait: {
      later: [
        'Any new major decisions',
        'Big styling swaps',
        'New suppliers',
        'Major guest list changes'
      ],
      onlyIfEnergy: ['Playlist tweaks', 'Tiny finishing touches']
    }
  },
  wrapUp: {
    focus: {
      doNext: [
        'Start thank-you list (names + gifts)',
        'Gather photos/videos + back them up',
        'Close loose ends (final invoices, returns)'
      ],
      decideSetup: [
        'Choose what to keep/sell/donate',
        'Track photo delivery dates + album plan',
        'Leave vendor reviews (when you have headspace)',
        'Plan a proper rest day (seriously)'
      ],
      oneThing: 'Start the thank-you list (names + what they gave).'
    },
    canWait: {
      later: [
        'Big admin tasks (name change etc.) until you’re ready',
        'Deep sorting of décor/items',
        'Photo album design'
      ],
      onlyIfEnergy: ['Social posts', 'Extra organising']
    }
  }
};

const readDraft = (): DraftState => {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as DraftState) : {};
  } catch {
    return {};
  }
};

const writeDraft = (draft: DraftState) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
};

const detectStage = (q1: string | null, q2: string | null): DetectedStage | null => {
  const primary = q1Options.find((option) => option.value === q1)?.stage ?? null;
  if (!primary) return null;

  if ((primary === 'earlyDecisions' || primary === 'dreamTeam') && q2 === '5') {
    return 'weddingStyle';
  }

  if ((primary === 'earlyDecisions' || primary === 'dreamTeam') && q2 === '6') {
    return 'finalDetails';
  }

  if ((primary === 'earlyDecisions' || primary === 'dreamTeam') && q2 === '7') {
    return 'weddingWeek';
  }

  return primary;
};

export default function ResetToolPage() {
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);
  const [email, setEmail] = useState('');
  const [q1WhereAreYou, setQ1WhereAreYou] = useState<string | null>(null);
  const [q2HardestPart, setQ2HardestPart] = useState<string | null>(null);
  const [detectedStage, setDetectedStage] = useState<DetectedStage | null>(null);
  const [step, setStep] = useState(1);
  const [savingState, setSavingState] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [savingMessage, setSavingMessage] = useState('');

  useEffect(() => {
    const draft = readDraft();
    if (!draft.email) {
      router.replace('/reset');
      return;
    }

    setEmail(draft.email);
    setQ1WhereAreYou(draft.q1WhereAreYou ?? null);
    setQ2HardestPart(draft.q2HardestPart ?? null);
    setDetectedStage(draft.detectedStage ?? null);
    setStep(draft.step && draft.step >= 1 ? draft.step : 1);
    setHydrated(true);
  }, [router]);

  const draftSnapshot = useMemo(
    () => ({
      email,
      detectedStage: detectedStage ?? undefined,
      q1WhereAreYou: q1WhereAreYou ?? undefined,
      q2HardestPart: q2HardestPart ?? undefined,
      step
    }),
    [email, detectedStage, q1WhereAreYou, q2HardestPart, step]
  );

  useEffect(() => {
    if (!hydrated) return;
    const handle = window.setTimeout(() => {
      writeDraft(draftSnapshot);
    }, 300);
    return () => window.clearTimeout(handle);
  }, [draftSnapshot, hydrated]);

  const handleDetectContinue = () => {
    const nextStage = detectStage(q1WhereAreYou, q2HardestPart);
    setDetectedStage(nextStage);
    setStep(2);
  };

  const handleSave = async () => {
    if (!email || !detectedStage) return;

    setSavingState('saving');
    setSavingMessage('');

    try {
      const response = await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          detectedStage,
          q1WhereAreYou: q1WhereAreYou ?? '',
          q2HardestPart: q2HardestPart ?? '',
          createdAt: new Date().toISOString()
        })
      });

      const data = (await response.json()) as { ok?: boolean; resetId?: string; error?: string };

      if (!response.ok || !data.ok) {
        setSavingState('error');
        setSavingMessage(data.error ?? 'Unable to save right now. Please try again.');
        return;
      }

      setSavingState('saved');
      setSavingMessage('Saved. You know what matters next.');
    } catch (error) {
      setSavingState('error');
      setSavingMessage(error instanceof Error ? error.message : 'Unable to save right now. Please try again.');
    }
  };

  const handleStartOver = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    router.push('/reset');
  };

  if (!hydrated) {
    return <ResetShell />;
  }

  const stageIndex = detectedStage ? stageIndexMap[detectedStage] : -1;

  return (
    <ResetShell>
      <div className="reset-card">
        {step === 1 ? (
          <div className="reset-step">
            <StepHeader step="Step 1" title="Answer these quickly">
              <p>No overthinking. Just pick what’s closest.</p>
            </StepHeader>
            <div className="reset-stage-section">
              <p className="reset-label">What best describes where you are right now?</p>
              <div className="reset-option-list">
                {q1Options.map((option) => (
                  <label key={option.value} className="reset-option">
                    <input
                      type="radio"
                      name="q1"
                      value={option.value}
                      checked={q1WhereAreYou === option.value}
                      onChange={() => setQ1WhereAreYou(option.value)}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="reset-stage-section">
              <p className="reset-label">What feels hardest right now?</p>
              <div className="reset-option-list">
                {q2Options.map((option) => (
                  <label key={option.value} className="reset-option">
                    <input
                      type="radio"
                      name="q2"
                      value={option.value}
                      checked={q2HardestPart === option.value}
                      onChange={() => setQ2HardestPart(option.value)}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <button
              className="reset-button"
              type="button"
              onClick={handleDetectContinue}
              disabled={!q1WhereAreYou || !q2HardestPart}
            >
              Show me my roadmap
            </button>
          </div>
        ) : null}

        {step === 2 && detectedStage ? (
          <div className="reset-step">
            <StepHeader step="Step 2" title="You’re here">
              <p>You’re currently in: {stageLabels[detectedStage]}</p>
              <p>You’re not behind — this is exactly where most couples are at this point.</p>
            </StepHeader>
            <div className="reset-roadmap">
              {roadmapStages.map((stage, index) => {
                const state = index < stageIndex ? 'complete' : index === stageIndex ? 'active' : 'upcoming';
                return (
                  <div key={stage.key} className={`reset-roadmap-step reset-roadmap-step--${state}`}>
                    <span className="reset-roadmap-dot" aria-hidden="true" />
                    <span className="reset-roadmap-label">{stage.label}</span>
                  </div>
                );
              })}
            </div>
            <p className="reset-microcopy">
              You don’t need to think about all of this at once. This roadmap shows what matters now — and what can wait.
            </p>
            <div className="reset-step-actions">
              <button className="reset-button reset-button--ghost" type="button" onClick={() => setStep(1)}>
                Back
              </button>
              <button className="reset-button" type="button" onClick={() => setStep(3)}>
                Continue
              </button>
            </div>
          </div>
        ) : null}

        {step === 3 && detectedStage ? (
          <div className="reset-step">
            <StepHeader step="Step 3" title="What to focus on right now" />
            <div className="reset-stage-section">
              <p className="reset-label">Do next</p>
              <ul className="reset-checklist">
                {stageContent[detectedStage].focus.doNext.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="reset-stage-section">
              <p className="reset-label">Decide/Set up</p>
              <ul className="reset-checklist">
                {stageContent[detectedStage].focus.decideSetup.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <p className="reset-reminder">
              If you only do one thing this week: {stageContent[detectedStage].focus.oneThing}
            </p>
            <div className="reset-step-actions">
              <button className="reset-button reset-button--ghost" type="button" onClick={() => setStep(2)}>
                Back
              </button>
              <button className="reset-button" type="button" onClick={() => setStep(4)}>
                Continue
              </button>
            </div>
          </div>
        ) : null}

        {step === 4 && detectedStage ? (
          <div className="reset-step">
            <StepHeader step="Step 4" title="What can wait (for now)">
              <p>These are things from later stages of the roadmap. You’ll come back to them — just not yet.</p>
            </StepHeader>
            <div className="reset-stage-section">
              <p className="reset-label">Later</p>
              <ul className="reset-checklist">
                {stageContent[detectedStage].canWait.later.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="reset-stage-section">
              <p className="reset-label">Only if you have energy</p>
              <ul className="reset-checklist">
                {stageContent[detectedStage].canWait.onlyIfEnergy.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="reset-step-actions">
              <button className="reset-button reset-button--ghost" type="button" onClick={() => setStep(3)}>
                Back
              </button>
              <button className="reset-button" type="button" onClick={() => setStep(5)}>
                Continue
              </button>
            </div>
          </div>
        ) : null}

        {step === 5 ? (
          <div className="reset-step">
            <StepHeader step="Step 5" title="Save your reset" />
            <button className="reset-button" type="button" onClick={handleSave} disabled={savingState === 'saving'}>
              Save my reset
            </button>
            {savingState === 'saving' ? <p className="reset-muted">Saving…</p> : null}
            {savingState === 'saved' ? (
              <div className="reset-confirmation-block">
                <h3>Saved. You know what matters next.</h3>
                <p>
                  Inside the Do Tell The Bride app, this roadmap updates as you go — so you’re never guessing what to
                  focus on.
                </p>
                <button className="reset-button reset-button--ghost" type="button" onClick={handleStartOver}>
                  Start again
                </button>
              </div>
            ) : null}
            {savingMessage && savingState !== 'saved' ? <p className="reset-confirmation">{savingMessage}</p> : null}
            {savingState === 'error' ? (
              <button className="reset-button reset-button--ghost" type="button" onClick={handleSave}>
                Try again
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    </ResetShell>
  );
}
