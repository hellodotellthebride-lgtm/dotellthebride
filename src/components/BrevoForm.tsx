'use client';

import { FormEvent, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function BrevoForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

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
    <form ref={formRef} className="cta__form" onSubmit={handleSubmit} noValidate>
      <label>
        Name
        <input type="text" name="name" placeholder="Your name(s)" required />
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
    </form>
  );
}
