import type { Metadata } from 'next';
import { Playfair_Display, Manrope } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
    'Do Tell The Bride blends thoughtful planning with editorial styling to deliver unforgettable weddings and a compelling content engine.'
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
      </body>
    </html>
  );
}
