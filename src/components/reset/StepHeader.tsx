import type { ReactNode } from 'react';

export default function StepHeader({
  step,
  title,
  children
}: {
  step: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className="reset-step-header">
      <p className="reset-step-label">{step}</p>
      <h2 className="reset-step-title">{title}</h2>
      {children ? <div className="reset-step-subcopy">{children}</div> : null}
    </header>
  );
}
