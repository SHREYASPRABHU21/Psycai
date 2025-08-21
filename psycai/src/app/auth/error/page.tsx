'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function AuthError() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const errorDescription = searchParams.get('error_description')

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="glass-morphism p-8 rounded-2xl shadow-2xl text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-text mb-4">Authentication Error</h1>
          
          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-left">
              <p className="font-medium">Error: {error}</p>
              {errorDescription && (
                <p className="text-sm mt-1">{errorDescription}</p>
              )}
            </div>
          )}
          
          <p className="text-text/60 mb-6">
            Something went wrong during authentication. Please try again.
          </p>
          
          <div className="space-y-3">
            <Link
              href="/login"
              className="block w-full bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary-dark transition-colors"
            >
              Try Again
            </Link>
            <Link
              href="/"
              className="block w-full text-text/60 hover:text-primary transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
