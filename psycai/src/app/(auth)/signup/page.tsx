'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import Layout from '@/components/layout/Layout'
import Logo from '@/components/brand/Logo'
import { Sparkles, ArrowRight, Zap, Users, TreePine } from 'lucide-react'

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { signInWithGoogle, error } = useAuth()

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      await signInWithGoogle()
    } catch (error) {
      console.error('Error signing up:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Layout showNav={false} showFooter={false}>
      <div className="min-h-screen bg-gradient-to-br from-paper via-snow to-paper flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-organic opacity-20" />
        
        <div className="relative container mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Column - Welcome */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <div className="space-y-8">
                <div className="space-y-6">
                  <Logo size="xl" />
                  <h1 className="text-display text-obsidian">
                    Join the
                    <br />
                    <span className="infinity-gradient">Infinite Garden</span>
                  </h1>
                  <p className="text-body-lg text-slate max-w-2xl">
                    Step into a world where AI possibilities grow without limits. 
                    Access cutting-edge tools, explore innovative solutions, and cultivate your creativity.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8">
                  <div className="text-center lg:text-left">
                    <div className="w-16 h-16 bg-gradient-infinity rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-4 float-animation">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-title text-obsidian mb-2">Instant Access</div>
                    <div className="text-caption text-stone">Start using tools immediately</div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="w-16 h-16 bg-gradient-growth rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-4 float-animation" style={{ animationDelay: '1s' }}>
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-title text-obsidian mb-2">Free Forever</div>
                    <div className="text-caption text-stone">No hidden costs or limits</div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="w-16 h-16 bg-gradient-infinity rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-4 float-animation" style={{ animationDelay: '2s' }}>
                      <TreePine className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-title text-obsidian mb-2">Always Growing</div>
                    <div className="text-caption text-stone">New tools added regularly</div>
                  </div>
                </div>

                {/* Social Proof */}
                <div className="pt-8">
                  <div className="text-caption text-stone mb-4">Trusted by innovators worldwide</div>
                  <div className="flex items-center space-x-8 opacity-60">
                    <div className="text-title text-stone">50K+ Users</div>
                    <div className="text-title text-stone">12+ Tools</div>
                    <div className="text-title text-stone">99% Uptime</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Signup Form */}
            <div className="lg:col-span-5">
              <div className="card-flow p-10 max-w-md mx-auto">
                <div className="space-y-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-infinity rounded-full flex items-center justify-center mx-auto mb-6 pulse-glow">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-headline text-obsidian mb-2">Start Growing</h2>
                    <p className="text-body text-slate">Create your account in seconds</p>
                  </div>

                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-center">
                      <div className="text-sm font-medium mb-1">Signup Error</div>
                      <div className="text-xs">{error.message}</div>
                    </div>
                  )}

                  <div className="space-y-6">
                    <button
                      onClick={handleGoogleSignIn}
                      disabled={isLoading}
                      className="w-full flex items-center justify-center space-x-4 btn-infinity text-lg p-5 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <svg className="w-6 h-6" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                          <span className="font-semibold">
                            {isLoading ? 'Creating Account...' : 'Get Started with Google'}
                          </span>
                        </>
                      )}
                    </button>

                    <div className="text-center space-y-4">
                      <div className="text-caption text-stone">
                        Already have an account?{' '}
                        <Link href="/login" className="text-infinity hover:text-growth transition-colors font-medium">
                          Sign in here
                        </Link>
                      </div>
                      
                      <div className="text-xs text-stone leading-relaxed">
                        By creating an account, you agree to our{' '}
                        <Link href="/terms" className="text-infinity hover:underline">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy" className="text-infinity hover:underline">
                          Privacy Policy
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Return Home Link */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <Link
            href="/"
            className="flex items-center space-x-2 text-stone hover:text-infinity transition-colors group"
          >
            <span className="text-body">Explore without account</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </Layout>
  )
}
