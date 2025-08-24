'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import Layout from '@/components/layout/Layout'
import UserProfile from '@/components/auth/UserProfile'
import { ArrowRight, Sparkles, CheckCircle, Calendar, Clock } from 'lucide-react'
import Link from 'next/link'
import { fetchProducts } from '@/lib/supabase-tools'
import { fetchBlogs } from '@/lib/supabase-blog'
import { Tool, Blog } from '@/lib/supabase'

export default function HomePage() {
  const { user, loading } = useAuth()
  const [mounted, setMounted] = useState(false)
  const [featuredTools, setFeaturedTools] = useState<Tool[]>([])
  const [featuredBlogs, setFeaturedBlogs] = useState<Blog[]>([])
  const [toolsLoading, setToolsLoading] = useState(true)
  const [blogsLoading, setBlogsLoading] = useState(true)

  useEffect(() => {
    setMounted(true)
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [toolsData, blogsData] = await Promise.all([
        fetchProducts(),
        fetchBlogs()
      ])
      
      // Get first 2 tools and 3 blogs
      setFeaturedTools(toolsData.slice(0, 2))
      setFeaturedBlogs(blogsData.slice(0, 3))
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setToolsLoading(false)
      setBlogsLoading(false)
    }
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  if (!mounted) return null

  return (
    <Layout showNav={false} showFooter={true}>
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-800 to-indigo-900 text-white relative overflow-hidden">
        {/* Background Gradient and Decorations */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-purple-600/10 to-indigo-600/15" />
          <div className="absolute top-0 right-0 w-96 h-96 opacity-20">
            <div className="absolute top-20 right-20 w-px h-64 bg-gradient-to-b from-violet-400 to-transparent rotate-45" />
            <div className="absolute top-40 right-10 w-px h-48 bg-gradient-to-b from-purple-400 to-transparent rotate-12" />
          </div>
        </div>

        {/* Navigation */}
                {/* Navigation */}
        <nav className="relative z-50 container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Text logo aligned with content */}
            <Link href="/" className="text-3xl font-extrabold tracking-wide text-white hover:text-violet-300 transition-colors">
              PsycAi
            </Link>

            {/* Centered Navigation Links */}
            <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center space-x-8">
              <Link href="/" className="text-white/80 hover:text-white text-sm font-medium transition-colors">
                Home
              </Link>
              <Link href="/products" className="text-white/80 hover:text-white text-sm font-medium transition-colors">
                Products
              </Link>
              <Link href="/blog" className="text-white/80 hover:text-white text-sm font-medium transition-colors">
                Blog
              </Link>
              <Link href="/contact" className="text-white/80 hover:text-white text-sm font-medium transition-colors">
                Contact
              </Link>
            </div>

            <div className="hidden md:block">
              {loading ? (
                <div className="w-10 h-10 bg-white/10 rounded-full animate-pulse" />
              ) : user ? (
                <UserProfile />
              ) : (
                <div className="flex items-center space-x-3">
                  <Link 
                    href="/login" 
                    className="px-4 py-2 text-white/80 hover:text-white text-sm font-medium transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link 
                    href="/signup" 
                    className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white text-sm font-medium hover:bg-white/20 transition-all"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>


        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center min-h-[70vh]">
            
            {/* Left text block with extra right padding */}
            <div className="lg:col-span-7 lg:pl-40 space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                  Your AI Products
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-purple-300 to-indigo-300">Hub</span>
                  <br />
                  Starts Here!
                </h1>
                
                <p className="text-lg text-white/80 leading-relaxed max-w-2xl">
                  Discover, explore, and use amazing AI products all in one place. 
                  Your central platform for artificial intelligence powered solutions.
                </p>
              </div>

              {/* ALWAYS show Get Started button - regardless of login status */}
              <div className="flex items-center space-x-6 pt-8">
                <Link 
                  href="/signup"
                  className="px-8 py-4 bg-white text-violet-900 rounded-lg font-semibold hover:bg-white/90 transition-all transform hover:scale-105"
                >
                  Get Started Free
                </Link>
                <Link 
                  href="/blog" 
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg font-semibold hover:bg-white/20 transition-all"
                >
                  See Insights
                </Link>
              </div>
            </div>

            {/* Right Visual Element */}
            <div className="lg:col-span-5 relative">
              <div className="relative w-full h-96 lg:h-[500px] flex items-center justify-center">
                <div className="relative w-64 h-64 lg:w-80 lg:h-80">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-400/30 via-purple-500/20 to-indigo-500/30 backdrop-blur-sm border border-white/10 transform rotate-12 animate-pulse"></div>
                  <div className="absolute inset-8 rounded-full bg-gradient-to-br from-purple-400/40 via-violet-500/30 to-purple-400/40 backdrop-blur-sm border border-white/20 transform -rotate-12"></div>
                  <div className="absolute inset-16 rounded-full bg-gradient-to-br from-violet-500/50 via-purple-600/40 to-violet-400/50 backdrop-blur-sm border border-white/30 transform rotate-6"></div>
                  <div className="absolute inset-24 rounded-full bg-gradient-to-br from-white/20 to-violet-300/30 backdrop-blur-md border border-white/40"></div>
                  
                  <div className="absolute -top-4 -right-4 w-3 h-3 bg-violet-400 rounded-full animate-bounce"></div>
                  <div className="absolute -bottom-6 -left-2 w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-300"></div>
                  <div className="absolute top-1/3 -right-8 w-4 h-4 bg-indigo-400 rounded-full animate-bounce delay-700"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Featured AI Products
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our handpicked collection of AI products to boost your productivity
            </p>
          </div>

          {toolsLoading ? (
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
              {[1, 2].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 rounded-2xl aspect-[4/3]"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
              {featuredTools.map((tool) => (
                <div key={tool.id} className="group cursor-pointer" onClick={() => window.open(tool.link, '_blank')}>
                  <div className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-[4/3]">
                    <img 
                      src={tool.image} 
                      alt={tool.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    <div className="absolute bottom-6 left-6 text-white">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-sm font-medium bg-violet-500/80 backdrop-blur-sm px-3 py-1 rounded-full">
                          {tool.category}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{tool.name}</h3>
                      <p className="text-white/90 text-sm mb-4">{tool.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center">
            <Link 
              href="/products"
              className="inline-flex items-center px-8 py-4 bg-violet-600 text-white rounded-lg font-semibold hover:bg-violet-700 transition-colors"
            >
              View All Products
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Catch up on the latest news
            </h2>
            <Link 
              href="/blog" 
              className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-full text-gray-600 hover:border-violet-400 hover:text-violet-600 transition-colors"
            >
              See more at Blog
            </Link>
          </div>

          {blogsLoading ? (
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                    <div className="bg-gray-200 aspect-[4/3]"></div>
                    <div className="p-6">
                      <div className="bg-gray-200 h-4 rounded mb-4"></div>
                      <div className="bg-gray-200 h-3 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {featuredBlogs.map((blog, index) => (
                <Link key={blog.id} href={`/blog/${blog.slug}`}>
                  <div className="group cursor-pointer">
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                      <div className="aspect-[4/3] overflow-hidden">
                        <img 
                          src={blog.cover_image} 
                          alt={blog.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4 line-clamp-2 group-hover:text-violet-600 transition-colors">
                          {blog.title}
                        </h3>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(blog.created_at)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{Math.ceil(blog.content.length / 1000)} min read</span>
                            </div>
                          </div>
                          
                          <button className="inline-flex items-center text-sm font-medium text-violet-600 hover:text-violet-700 transition-colors">
                            Read more
                            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  )
}
