import Link from 'next/link';

type FeatureDetailProps = {
  title: string;
  intro: string;
  helps: string[];
  difference: string;
  audience: string[];
};

export default function FeatureDetail({
  title,
  intro,
  helps,
  difference,
  audience
}: FeatureDetailProps) {
  return (
    <div className="feature-detail">
      <section className="feature-detail__hero">
        <p className="eyebrow">Inside the app</p>
        <h1>{title}</h1>
        <p>{intro}</p>
      </section>

      <section className="feature-detail__section">
        <div className="feature-detail__block">
          <h2>What it helps with</h2>
          <ul>
            {helps.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="feature-detail__block">
          <h2>Why it feels different</h2>
          <p>{difference}</p>
        </div>
        <div className="feature-detail__block">
          <h2>Who it is for</h2>
          <ul>
            {audience.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="feature-detail__cta">
        <Link href="/#services" className="feature-detail__back">
          Back to features
        </Link>
        <h3>Ready for calm clarity?</h3>
        <p>No spam. Just calm updates and early access.</p>
        <Link href="/#contact" className="primary-button">
          Join early access
        </Link>
      </section>
    </div>
  );
}
