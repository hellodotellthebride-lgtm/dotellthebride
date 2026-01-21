'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const navItems = [
  { label: 'App', href: '/#experience' },
  { label: 'Features', href: '/#services' },
  { label: 'Inside the app', href: '/#inside' },
  { label: 'Journal', href: '/journal' },
  { label: 'Early Access', href: '/early-access' }
];

export default function Header() {
  const pathname = usePathname();
  const isBlogRoute = pathname?.startsWith('/blog');
  const isMinimal = pathname === '/early-access';

  return (
    <header className={`site-header${isMinimal ? ' site-header--minimal' : ''}`}>
      <div className="site-header__inner">
        <Link href="/" className="brand">
          <Image src="/logo.svg" alt="Do Tell The Bride logo" width={32} height={32} priority />
          <span>Do Tell The Bride</span>
        </Link>
        {!isMinimal ? (
          <>
            <nav className="primary-nav">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={item.href === '/blog' && isBlogRoute ? 'active' : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="header-cta">
              <Link href="/journal" className="ghost-button">
                Journal
              </Link>
              <Link href="/#contact" className="primary-button">
                Join early access
              </Link>
            </div>
          </>
        ) : null}
      </div>
    </header>
  );
}
