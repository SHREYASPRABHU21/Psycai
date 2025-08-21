import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import ErrorBoundary from '@/components/ErrorBoundary'
import DebugPanel from '@/components/DebugPanel'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Psycai - Unified AI Tools Platform',
  description: 'Access multiple AI-powered tools from one place with a single login.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-text`} suppressHydrationWarning>
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
