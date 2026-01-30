'use client';

import { FormEvent, useRef, useState } from 'react';

const pushEvent = (eventName: string) => {
  if (typeof window === 'undefined') return;
  const w = window as typeof window & { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: eventName, timestamp: Date.now() });
};

const scrollToTarget = (id: string) => {
  if (typeof document === 'undefined') return;
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

type Status = 'idle' | 'loading' | 'success' | 'error';

export function QuickJoinForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [email, setEmail] = useState('');

  const handleQuickSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    setFeedback(null);

    try {
      const response = await fetch('/api/brevo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error ?? 'Something went wrong. Please try again.');
      }

      setEmail('');
      setStatus('success');
      setFeedback('Thanks for joining. You’re on the list.');
    } catch (err) {
      setStatus('error');
      setFeedback(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="quick-join">
      <p className="quick-join__title">Start with clarity updates</p>
      <form className="quick-join-form" onSubmit={handleQuickSubmit} aria-label="Quick clarity signup">
        <label htmlFor="quick-email" className="sr-only">
          Email
        </label>
        <input
          id="quick-email"
          type="email"
          name="email"
          placeholder="Your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <button type="submit" className="primary-button" disabled={status === 'loading'}>
          {status === 'loading' ? 'Submitting…' : 'Start with clarity'}
        </button>
      </form>
      {feedback ? (
        <p className={`form-status ${status === 'success' ? 'form-status--success' : 'form-status--error'}`}>{feedback}</p>
      ) : null}
      <p className="form-microcopy">No spam - just thoughtful updates when clarity matters.</p>
    </div>
  );
}

export default function BrevoForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const handleStepOne = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email')?.toString() ?? '';
    if (!email) {
      setStatus('error');
      setError('Please add your email.');
      return;
    }

    try {
      const response = await fetch('/api/brevo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error ?? 'Something went wrong. Please try again.');
      }

      setStatus('idle');
      pushEvent('early_access_step1_submit');
      setStep(2);
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  const handleStepTwo = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    setError(null);

    const formData = new FormData(event.currentTarget);
    const answer = formData.get('fallback')?.toString() ?? '';
    pushEvent('early_access_step2_submit');

    if (answer) {
      await fetch('/api/brevo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ extra: answer })
      }).catch(() => null);
    }

    setStep(3);
  };

  const handleSkip = () => {
    pushEvent('early_access_step2_skip');
    setStep(3);
  };

  return (
    <div className="cta__form">
      {step === 1 && (
        <form ref={formRef} onSubmit={handleStepOne} noValidate>
          <label>
            Email
            <input type="email" name="email" placeholder="you@email.com" required />
          </label>
          {status === 'error' && <p className="form-status form-status--error">{error}</p>}
          <button type="submit" className="primary-button" disabled={status === 'loading'}>
            {status === 'loading' ? 'Submitting…' : 'Start with clarity'}
          </button>
          <p className="form-microcopy">No spam - just thoughtful updates when clarity matters.</p>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleStepTwo} noValidate>
          <h3>One quick question (optional)</h3>
          <label>
            If this didn’t exist, what would you do instead?
            <textarea name="fallback" rows={3} placeholder="Google, spreadsheets, ask friends, avoid it, hire a planner…"></textarea>
          </label>
          {status === 'error' && <p className="form-status form-status--error">{error}</p>}
          <div className="cta__actions">
            <button type="submit" className="primary-button" disabled={status === 'loading'}>
              {status === 'loading' ? 'Sending…' : 'Send'}
            </button>
            <button type="button" className="cta__skip" onClick={handleSkip}>
              Skip for now
            </button>
          </div>
        </form>
      )}

      {step === 3 && (
        <div className="cta__success">
          <h3>You’re in.</h3>
          <p>We’ll email when the next step is worth your attention.</p>
          <button type="button" onClick={() => scrollToTarget('top')} className="cta__success-link">
            Back to the page
          </button>
        </div>
      )}
    </div>
  );
}
