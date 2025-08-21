'use client'

import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import Layout from '@/components/layout/Layout'
import { Sparkles, Zap, Shield, Users } from 'lucide-react'

export default function Home() {
  const { user, loading } = useAuth()

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Unified Access',
      description: 'Access all your AI tools from one central hub with a single login.'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Secure & Private',
      description: 'Your data is protected with enterprise-grade security and privacy.'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Seamless Experience',
      description: 'Switch between tools effortlessly without losing your workflow.'
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Always Updated',
      description: 'Get the latest AI tools and features as they become available.'
    }
  ]

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
        <div className="relative container mx-auto px-4 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="gradient-text">Unified AI Tools</span>
              <br />
              <span className="text-text">in One Place</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-text/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              Stop juggling multiple AI platforms. Access all your favorite AI tools 
              with a single login and seamless, secure experience.
            </p>

            {/* CTA Buttons */}
            <div className="flex justify-center gap-4 flex-wrap mb-16">
              {user ? (
                <>
                  <Link 
                    href="/tools" 
                    className="bg-primary text-white px-8 py-4 rounded-xl hover:bg-primary-dark transition-all duration-200 glow-effect text-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Access Your Tools
                  </Link>
                  <Link 
                    href="/blog" 
                    className="border-2 border-primary text-primary px-8 py-4 rounded-xl hover:bg-primary hover:text-white transition-all duration-200 text-lg font-medium"
                  >
                    Read Blog
                  </Link>
                </>
              ) : (
                <>
                  <Link 
                    href="/signup" 
                    className="bg-primary text-white px-8 py-4 rounded-xl hover:bg-primary-dark transition-all duration-200 glow-effect text-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Get Started Free
                  </Link>
                  <Link 
                    href="/login" 
                    className="border-2 border-primary text-primary px-8 py-4 rounded-xl hover:bg-primary hover:text-white transition-all duration-200 text-lg font-medium"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>

            {/* Welcome Message for Authenticated Users */}
            {user && (
              <div className="glass-morphism rounded-2xl p-8 max-w-md mx-auto">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-text/60 mb-2">Welcome back,</p>
                <p className="text-xl font-semibold gradient-text">
                  {user.user_metadata?.full_name?.split(' ')[0] || user.email?.split('@')}
                </p>
                <p className="text-sm text-text/60 mt-2">Ready to boost your productivity?</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-background to-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-text mb-6">
              Why Choose <span className="gradient-text">Psycai</span>?
            </h2>
            <p className="text-xl text-text/70 max-w-2xl mx-auto">
              Experience the future of AI tool management with our unified platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className="glass-morphism p-8 rounded-2xl hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2 h-full">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-text mb-4">{feature.title}</h3>
                  <p className="text-text/70 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="py-24 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold text-text mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-text/70 mb-10">
                Join thousands of users who have streamlined their AI workflow with Psycai.
              </p>
              <Link
                href="/signup"
                className="inline-block bg-primary text-white px-10 py-5 rounded-xl hover:bg-primary-dark transition-all duration-200 glow-effect text-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Create Free Account
              </Link>
            </div>
          </div>
        </section>
      )}
    </Layout>
  )
}
