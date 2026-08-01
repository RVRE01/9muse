import type { Metadata, Viewport } from 'next';
import { Bodoni_Moda, Manrope } from 'next/font/google';
import { siteDescription, siteUrl } from '@/content/site';
import './globals.css';

const displayFont = Bodoni_Moda({
  variable: '--font-display',
  subsets: ['latin'],
  display: 'swap',
});

const sansFont = Manrope({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: '9 Muse Customs | Luxury Custom Car Builds in NY, NJ & PA',
  description: siteDescription,
  applicationName: '9 Muse Customs',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: '9 Muse Customs',
    title: '9 Muse Customs | Built Beyond Specification',
    description: siteDescription,
    images: [
      {
        url: '/Imgs/magnific_create-a-premium-closeup-_5xhCsRLKxe.png',
        width: 1344,
        height: 752,
        alt: '9 Muse Customs silver-grey widebody carbon aero study',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '9 Muse Customs | Built Beyond Specification',
    description: siteDescription,
    images: ['/Imgs/magnific_create-a-premium-closeup-_5xhCsRLKxe.png'],
  },
  icons: {
    icon: [
      { url: '/Imgs/9muse-logo-badge.png', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    apple: '/Imgs/9muse-logo-badge.png',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#08090b',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${sansFont.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
