import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import ErrorBoundary from '@/components/ErrorBoundary'
import DebugPanel from '@/components/DebugPanel'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap'
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap'
})

export const metadata = {
  title: 'PsycAi - Enterprise AI Solutions',
  description: 'Transform your workflow with cutting-edge AI tools. Built for businesses that demand excellence in artificial intelligence.',
  keywords: 'AI tools, artificial intelligence, enterprise AI, business automation, PsycAi',
  authors: [{ name: 'PsycAi Team' }],
  openGraph: {
    title: 'PsycAi - Enterprise AI Solutions',
    description: 'Transform your workflow with cutting-edge AI tools. Built for businesses that demand excellence in artificial intelligence.',
    type: 'website',
    locale: 'en_US',
    siteName: 'PsycAi',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/PsycAi-Organic-Flow-Logo.jpg" />
        <meta name="theme-color" content="#a855f7" />
      </head>
      <body className="bg-paper text-obsidian antialiased" suppressHydrationWarning>
        <ErrorBoundary>
          <AuthProvider>
            {children}
            <DebugPanel />
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
