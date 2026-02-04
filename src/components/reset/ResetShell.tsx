import type { ReactNode } from 'react';

export default function ResetShell({ children }: { children?: ReactNode }) {
  return <div className="reset-shell">{children}</div>;
}
