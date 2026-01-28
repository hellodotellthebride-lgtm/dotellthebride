'use client';

import { FormEvent, useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function EarlyAccessForm({ className }: { className?: string }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) {
      setFeedback('Please enter an email address.');
      setStatus('error');
      return;
    }

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

      setStatus('success');
      setFeedback('You’re on the list. We’ll be in touch soon.');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setFeedback(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <form className={`focus-form ${className ?? ''}`} onSubmit={handleSubmit}>
      <label htmlFor="early-access-email" className="sr-only">
        Email address
      </label>
      <input
        id="early-access-email"
        type="email"
        name="email"
        placeholder="hello@email.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <button type="submit" className="primary-button" disabled={status === 'loading'}>
        {status === 'loading' ? 'Submitting…' : 'Start with clarity'}
      </button>
      {feedback ? (
        <p className={`form-status ${status === 'success' ? 'form-status--success' : 'form-status--error'}`}>{feedback}</p>
      ) : null}
    </form>
  );
}
