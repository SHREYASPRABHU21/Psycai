import { Inter } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
import Script from 'next/script';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'PsycAi',
  description: 'Dive into the chaotic playground of AI. PsycAi experiments with algorithms, pixels, and neurons to create wild, unpredictable, and mind-bending AI tools. Creativity has no rules here.',
  keywords: [
    'AI tools',
    'creative AI',
    'PsycAi',
    'AI experiments',
    'AI creativity',
    'neurons and pixels',
    'AI playground',
    'chaotic AI',
    'AI products',
    'AI tools'
  ],
  authors: [{ name: 'Shreyas Prabhu', url: 'https://www.psycai.site' }],
  creator: 'Shreyas Prabhu',
  themeColor: '#111827', // dark theme color for Chrome UI
  colorScheme: 'dark',
  openGraph: {
    title: 'PsycAi – Pixels, Neurons, Chaos',
    description: 'Dive into the chaotic playground of AI. PsycAi experiments with algorithms, pixels, and neurons to create wild, unpredictable, and mind-bending AI tools.',
    url: 'https://www.psycai.site',
    siteName: 'PsycAi',
    images: [
      {
        url: '/opengraph-image.png', 
        width: 1200,
        height: 630,
        alt: 'PsycAi – Creative AI Tools',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PsycAi – Pixels, Neurons, Chaos',
    description: 'Dive into the chaotic playground of AI. PsycAi experiments with algorithms, pixels, and neurons to create wild and mind-bending AI tools.',
    creator: '@shreyasprabhu',
    images: ['/opengraph-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon-32x32.png',
  },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </body>
    </html>
  );
}
