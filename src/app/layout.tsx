import type { Metadata } from 'next';
import { Playfair_Display, Manrope } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Analytics } from '@vercel/analytics/react';

const heading = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading'
});

const body = Manrope({
  subsets: ['latin'],
  variable: '--font-body'
});

export const metadata: Metadata = {
  title: 'Do Tell The Bride | Beautiful Wedding Management',
  description:
    'Do Tell The Bride blends thoughtful planning with editorial styling to deliver unforgettable weddings and a compelling content engine.',
  other: {
    'p:domain_verify': '07f6b49e9bad19fd34288471cf0034d7'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body>
        <div className="page-shell">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
