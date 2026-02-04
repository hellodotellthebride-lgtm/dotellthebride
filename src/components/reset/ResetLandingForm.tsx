'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const STORAGE_KEY = 'dttb_overwhelm_reset_v1';

type DraftState = {
  email?: string;
  detectedStage?:
    | 'beginning'
    | 'earlyDecisions'
    | 'dreamTeam'
    | 'guestsInvites'
    | 'weddingStyle'
    | 'finalDetails'
    | 'weddingWeek'
    | 'wrapUp';
  q1WhereAreYou?: string;
  q2HardestPart?: string;
  step?: number;
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

const isValidEmail = (value: string) => /.+@.+\..+/.test(value);

export default function ResetLandingForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const handleScroll = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof document === 'undefined') return;
    const target = document.getElementById('reset-how');
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const draft = readDraft();
    if (draft.email) {
      setEmail(draft.email);
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = email.trim();

    if (!isValidEmail(trimmed)) {
      setError('Please enter a valid email.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed })
      });

      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) {
        setError(data.error ?? 'Something went wrong. Please try again.');
        setSubmitting(false);
        return;
      }

      const existing = readDraft();
      writeDraft({ ...existing, email: trimmed, step: 1 });
      router.push('/reset/tool');
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Something went wrong. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <form className="reset-email-card" onSubmit={handleSubmit}>
      <label className="reset-label" htmlFor="reset-email">
        Enter your email to start the Wedding Overwhelm Reset
      </label>
      <div className="reset-email-row">
        <input
          id="reset-email"
          type="email"
          className="reset-input"
          placeholder="Enter your email to start the Wedding Overwhelm Reset"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <button className="reset-button reset-button--large" type="submit" disabled={submitting}>
          {submitting ? 'Starting...' : 'Start the 10-minute reset'}
        </button>
      </div>
      {error ? <p className="reset-error">{error}</p> : null}
      <p className="reset-microcopy reset-cta-note">Free. No pressure. You can stop anytime.</p>
      <a className="reset-secondary-link" href="#reset-how" onClick={handleScroll}>
        What you’ll do in the 10 minutes →
      </a>
    </form>
  );
}
