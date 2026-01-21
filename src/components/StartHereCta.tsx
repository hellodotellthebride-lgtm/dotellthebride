import Link from 'next/link';

export default function StartHereCta() {
  return (
    <div className="start-here-card">
      <p className="eyebrow">Need a reset?</p>
      <h3>Overwhelmed by wedding planning?</h3>
      <p>Start here. Practical clarity, zero judgement.</p>
      <Link href="/overwhelmed-wedding-planning" className="primary-button">
        Read this first
      </Link>
    </div>
  );
}
