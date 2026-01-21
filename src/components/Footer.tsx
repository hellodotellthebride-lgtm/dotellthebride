'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaInstagram, FaPinterest, FaFacebook, FaTiktok, FaEnvelope } from 'react-icons/fa';

const followLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/dotellthebride/', external: true, icon: <FaInstagram /> },
  { label: 'Pinterest', href: 'https://uk.pinterest.com/dotellthebride/', external: true, icon: <FaPinterest /> },
  { label: 'Facebook', href: 'https://www.facebook.com/dotellthebride', external: true, icon: <FaFacebook /> },
  { label: 'TikTok', href: 'https://www.tiktok.com/@dotellthebride', external: true, icon: <FaTiktok /> },
  { label: 'Email', href: 'mailto:hello.dotellthebride@gmail.com', external: false, icon: <FaEnvelope /> }
];

export default function Footer() {
  const pathname = usePathname();
  const isMinimal = pathname === '/early-access';

  if (isMinimal) {
    return (
      <footer className="site-footer site-footer--minimal">
        <p>Privacy-first updates only. We’ll never share your email.</p>
      </footer>
    );
  }

  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <div>
          <p className="eyebrow">DO TELL THE BRIDE</p>
          <h3>Wedding planning, without the overwhelm.</h3>
          <p>A calm, considered space to plan your wedding with clarity, structure, and confidence — from first decisions to final details.</p>
          <p>Designed for modern couples who want less noise and more certainty.</p>
        </div>
        <div>
          <p className="eyebrow">CONTACT</p>
          <p>hello.dotellthebride@gmail.com</p>
          <p>+44 7356 092 997</p>
          <p>Monday to Friday</p>
          <p>9am–6pm GMT</p>
          <Link href="/overwhelmed-wedding-planning" className="hero-emotion-link">
            <span>Feeling overwhelmed with wedding planning?</span>
            <span>
              This is a calmer place to begin <span aria-hidden="true" className="hero-emotion-link__arrow">→</span>
            </span>
          </Link>
        </div>
        <div>
          <p className="eyebrow">FOLLOW</p>
          <div className="social-links">
            {followLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                aria-label={link.label}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noreferrer' : undefined}
              >
                <span className="social-link__icon">{link.icon}</span>
              </Link>
            ))}
          </div>
          <p className="small-print">© 2026 Do Tell The Bride</p>
        </div>
      </div>
    </footer>
  );
}
