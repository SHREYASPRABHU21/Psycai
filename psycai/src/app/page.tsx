'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import Layout from '@/components/layout/Layout'
import { 
  ArrowUpRight, 
  Sparkles, 
  Code2, 
  Zap, 
  Users,
  TrendingUp,
  Play,
  Shield,
  BookOpen,
  Layers,
  Brain,
  Infinity,
  TreePine
} from 'lucide-react'

export default function Home() {
  const { user, loading } = useAuth()
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0)

  const showcaseFeatures = [
    { name: 'Smart Content Generator', status: 'Live', users: '12.8K+' },
    { name: 'AI Code Reviewer', status: 'Beta', users: '5.2K+' },
    { name: 'Voice Synthesis Engine', status: 'Coming Soon', users: 'Preview' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeatureIndex((prev) => (prev + 1) % showcaseFeatures.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [showcaseFeatures.length])

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'Enterprise-Grade AI',
      description: 'Built with scalability and security in mind. Our tools handle enterprise workloads while maintaining exceptional performance and reliability.'
    },
    {
      icon: <Infinity className="w-8 h-8" />,
      title: 'Limitless Integration',
      description: 'Seamlessly integrate with your existing workflows. Our API-first approach ensures compatibility with your current tech stack.'
    },
    {
      icon: <TreePine className="w-8 h-8" />,
      title: 'Continuous Innovation',
      description: 'We constantly evolve our platform based on user feedback and cutting-edge AI research. Your tools get better every day.'
    },
  ]

  return (
    <Layout>
      <div className="min-h-screen">
        
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-organic opacity-20" />
          
          <div className="container mx-auto px-6 py-32 relative">
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              
              {/* Left Column */}
              <div className="lg:col-span-7 space-y-12">
                <div className="space-y-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-infinity rounded-full flex items-center justify-center pulse-glow">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <span className="text-label text-stone">Welcome to</span>
                      <div className="text-title infinity-gradient font-bold">PsycAi Platform</div>
                    </div>
                  </div>
                  
                  <h1 className="text-hero">
                    Where <span className="infinity-gradient">AI Innovation</span>
                    <br />
                    Takes <span className="growth-gradient">Flight</span>
                  </h1>
                  
                  <p className="text-body-lg text-slate max-w-2xl leading-relaxed">
                    PsycAi is where cutting-edge artificial intelligence meets practical business solutions. 
                    We craft intelligent tools that empower teams, accelerate workflows, and unlock 
                    new possibilities in the digital landscape.
                  </p>
                </div>

                <div className="flex flex-wrap gap-6">
                  {user ? (
                    <>
                      <a href="/tools" className="btn-infinity">
                        <Zap className="w-5 h-5 mr-2" />
                        Access Platform
                      </a>
                      <a href="/blog" className="btn-growth">
                        <BookOpen className="w-5 h-5 mr-2" />
                        Read Insights
                      </a>
                    </>
                  ) : (
                    <>
                      <a href="/signup" className="btn-infinity">
                        <Sparkles className="w-5 h-5 mr-2" />
                        Start Free Trial
                      </a>
                      <a href="/tools" className="btn-growth">
                        <Play className="w-5 h-5 mr-2" />
                        View Solutions
                      </a>
                    </>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-8">
                  <div className="text-center lg:text-left">
                    <div className="text-display infinity-gradient font-bold mb-2">25K+</div>
                    <div className="text-caption text-stone">Active Users</div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-display growth-gradient font-bold mb-2">12+</div>
                    <div className="text-caption text-stone">AI Tools</div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-display infinity-gradient font-bold mb-2">99.9%</div>
                    <div className="text-caption text-stone">Uptime</div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-display growth-gradient font-bold mb-2">24/7</div>
                    <div className="text-caption text-stone">Support</div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="lg:col-span-5">
                <div className="relative">
                  <div className="card-flow p-8 float-animation">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <span className="text-label text-infinity">Platform Highlight</span>
                        <div className="flex space-x-1">
                          {showcaseFeatures.map((_, index) => (
                            <div
                              key={index}
                              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                index === currentFeatureIndex ? 'bg-infinity w-8' : 'bg-mist'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-headline text-obsidian">
                          {showcaseFeatures[currentFeatureIndex].name}
                        </h3>
                        <div className="flex items-center space-x-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            showcaseFeatures[currentFeatureIndex].status === 'Live' 
                              ? 'bg-success text-white'
                              : showcaseFeatures[currentFeatureIndex].status === 'Beta'
                              ? 'bg-warning text-white' 
                              : 'bg-infinity text-white'
                          }`}>
                            {showcaseFeatures[currentFeatureIndex].status}
                          </span>
                          <span className="text-caption text-stone">
                            {showcaseFeatures[currentFeatureIndex].users} users
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-6">
                        <div className="flex space-x-3">
                          <button className="p-3 bg-infinity text-white rounded-xl hover:scale-110 transition-transform">
                            <Play className="w-5 h-5" />
                          </button>
                          <button className="p-3 bg-snow text-stone rounded-xl hover:scale-110 transition-transform">
                            <Code2 className="w-5 h-5" />
                          </button>
                        </div>
                        <button className="btn-minimal">
                          <ArrowUpRight className="w-4 h-4 mr-2" />
                          Explore
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute -top-6 -right-6 w-12 h-12 bg-growth rounded-full flex items-center justify-center text-white animate-bounce">
                    <Code2 className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="section-flow py-24 bg-gradient-to-b from-paper to-snow">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-display infinity-gradient mb-6">
                Enterprise AI Excellence
              </h2>
              <p className="text-body-lg text-slate max-w-3xl mx-auto">
                Built for businesses that demand the highest standards of performance, 
                security, and reliability in their AI operations.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="card-organic p-8 hover-lift group">
                  <div className="space-y-6">
                    <div className={`w-16 h-16 bg-gradient-infinity rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                      {feature.icon}
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-title text-obsidian group-hover:text-infinity transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-body text-slate leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    <button className="btn-minimal">
                      Learn More
                      <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              
              <div className="space-y-8">
                <div className="space-y-6">
                  <span className="text-label text-infinity">Our Mission</span>
                  <h2 className="text-display text-obsidian">
                    Technology That
                    <br />
                    <span className="growth-gradient">Empowers Teams</span>
                  </h2>
                  <p className="text-body-lg text-slate leading-relaxed">
                    At PsycAi, we believe AI should enhance human creativity, not replace it. 
                    Our tools are designed to amplify your team's capabilities, streamline complex processes, 
                    and free up time for what matters most—innovation and strategic thinking.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-infinity rounded-full mt-3" />
                    <div>
                      <div className="text-title text-obsidian mb-1">Human-Centered Design</div>
                      <div className="text-body text-slate">Intuitive interfaces that feel natural to use</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-growth rounded-full mt-3" />
                    <div>
                      <div className="text-title text-obsidian mb-1">Enterprise Security</div>
                      <div className="text-body text-slate">SOC 2 compliant with end-to-end encryption</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-leaf rounded-full mt-3" />
                    <div>
                      <div className="text-title text-obsidian mb-1">Scalable Architecture</div>
                      <div className="text-body text-slate">Grows with your team from startup to enterprise</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="grid grid-cols-2 gap-6">
                  <div className="card-minimal p-6 hover-lift">
                    <Users className="w-8 h-8 text-infinity mb-4" />
                    <div className="text-title text-obsidian mb-2">25K+ Users</div>
                    <div className="text-caption text-slate">Trust our platform</div>
                  </div>
                  <div className="card-minimal p-6 hover-lift mt-12">
                    <Layers className="w-8 h-8 text-growth mb-4" />
                    <div className="text-title text-obsidian mb-2">Enterprise Ready</div>
                    <div className="text-caption text-slate">Built for scale</div>
                  </div>
                  <div className="card-minimal p-6 hover-lift">
                    <TrendingUp className="w-8 h-8 text-leaf mb-4" />
                    <div className="text-title text-obsidian mb-2">Always Improving</div>
                    <div className="text-caption text-slate">Continuous updates</div>
                  </div>
                  <div className="card-minimal p-6 hover-lift mt-12">
                    <Shield className="w-8 h-8 text-infinity mb-4" />
                    <div className="text-title text-obsidian mb-2">Secure by Design</div>
                    <div className="text-caption text-slate">SOC 2 compliant</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-obsidian to-slate text-snow relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-infinity opacity-10" />
          
          <div className="container mx-auto px-6 relative">
            <div className="text-center max-w-4xl mx-auto space-y-8">
              <h2 className="text-display text-snow mb-6">
                Ready to Transform
                <br />
                <span className="infinity-gradient">Your Workflow?</span>
              </h2>
              
              <p className="text-body-lg text-mist leading-relaxed">
                Join thousands of teams who have already discovered the power of AI-enhanced productivity. 
                Start your free trial today and experience the future of intelligent automation.
              </p>

              <div className="flex flex-wrap justify-center gap-6 pt-8">
                {user ? (
                  <>
                    <a href="/tools" className="btn-infinity">
                      <Zap className="w-5 h-5 mr-2" />
                      Access Platform
                    </a>
                    <a href="/contact" className="btn-growth bg-transparent border-snow text-snow hover:bg-snow hover:text-obsidian">
                      <Users className="w-5 h-5 mr-2" />
                      Contact Sales
                    </a>
                  </>
                ) : (
                  <>
                    <a href="/signup" className="btn-infinity">
                      <Sparkles className="w-5 h-5 mr-2" />
                      Start Free Trial
                    </a>
                    <a href="/contact" className="btn-growth bg-transparent border-snow text-snow hover:bg-snow hover:text-obsidian">
                      <Users className="w-5 h-5 mr-2" />
                      Schedule Demo
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
