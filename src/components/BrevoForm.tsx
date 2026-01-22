'use client';

import { FormEvent, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

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
      <p className="quick-join__title">Get early access updates</p>
      <form className="quick-join-form" onSubmit={handleQuickSubmit} aria-label="Quick early access signup">
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
          {status === 'loading' ? 'Submitting…' : 'Join early access'}
        </button>
      </form>
      {feedback ? (
        <p className={`form-status ${status === 'success' ? 'form-status--success' : 'form-status--error'}`}>{feedback}</p>
      ) : null}
      <p className="form-microcopy">No spam — only app updates and early access.</p>
    </div>
  );
}

export default function BrevoForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const [showFullForm, setShowFullForm] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    setError(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get('name')?.toString() ?? '',
      email: formData.get('email')?.toString() ?? '',
      focus: formData.get('focus')?.toString() ?? '',
      message: formData.get('message')?.toString() ?? ''
    };

    try {
      const response = await fetch('/api/brevo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error ?? 'Something went wrong. Please try again.');
      }

      formRef.current?.reset();
      setStatus('success');
      router.push('/thank-you');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <button type="button" className="form-toggle" onClick={() => setShowFullForm((prev) => !prev)}>
        Want to tell us more? (optional) {showFullForm ? '−' : '+'}
      </button>
      <form
        ref={formRef}
        className={`cta__form${showFullForm ? '' : ' cta__form--collapsed'}`}
        onSubmit={handleSubmit}
        noValidate
      >
        <label>
          Name
          <input type="text" name="name" placeholder="Your name(s)" />
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

        {status === 'success' && <p className="form-status form-status--success">Thanks for joining. You’re on the list.</p>}
        {status === 'error' && <p className="form-status form-status--error">{error}</p>}

        <button type="submit" className="primary-button" disabled={status === 'loading'}>
          {status === 'loading' ? 'Submitting…' : 'Join early access'}
        </button>
        <p className="form-microcopy">No spam — just app updates and early access.</p>
      </form>
    </>
  );
}
