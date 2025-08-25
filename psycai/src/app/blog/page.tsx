'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import UserProfile from '@/components/auth/UserProfile'
import Footer from '@/components/layout/Footer'
import { Search, Globe, ChevronDown, Calendar, User } from 'lucide-react'
import { trackPageView } from '@/lib/analytics'
import { fetchBlogs } from '@/lib/supabase-blog'
import { Blog } from '@/lib/supabase'
import Link from 'next/link'

const BLOG_CATEGORIES = ['All', 'Marketing', 'Business', 'AI']

export default function BlogPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([])
  const [blogsLoading, setBlogsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    trackPageView('Blog Page', 'AI Tech Blog')
    loadBlogs()
  }, [])

  const loadBlogs = async () => {
    setBlogsLoading(true)
    const fetchedBlogs = await fetchBlogs()
    setBlogs(fetchedBlogs)
    setFilteredBlogs(fetchedBlogs)
    setBlogsLoading(false)
  }

  useEffect(() => {
    let filtered = blogs

    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = blogs.filter(blog => 
        blog.category && blog.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(blog => 
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (blog.category && blog.category.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    setFilteredBlogs(filtered)
    console.log('Filtered blogs:', filtered.length, 'Category:', selectedCategory, 'Search:', searchTerm)
  }, [blogs, selectedCategory, searchTerm])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.min(3, blogs.length))
    }, 5000)
    return () => clearInterval(timer)
  }, [blogs.length])

  // Featured blogs for hero section
  const featuredBlogs = blogs.slice(0, 3)

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.split(' ').length
    return Math.ceil(wordCount / wordsPerMinute)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Keep existing hero code... */}
       {/* Hero Section with Featured Blog */}
      <div className="relative h-[600px] overflow-hidden bg-gray-100">
        {/* Background Image */}
        <div className="absolute inset-2">
          <div className="w-full h-full rounded-2xl overflow-hidden">
            {featuredBlogs.length > 0 && (
              <>
                <img
                  src={featuredBlogs[currentSlide]?.cover_image || 'https://picsum.photos/1200/600?random=16'}
                  alt="Hero"
                  className="w-full h-full object-cover"
                />
              </>
            )}
          </div>
        </div>

        {/* Navigation Bar Overlay */}
                {/* Navigation Bar Overlay */}
        <header className="relative z-20">
  <div className="px-6">
    <div className="flex justify-between items-center h-20"> {/* fixed height */}
      
      {/* Logo */}
      <div className="flex items-center">
        <div className="flex items-center space-x-3">
          <img src="/psycai-logo.png" alt="PsycAi Logo" className="h-8 w-auto" /> {/* smaller than navbar */}
        </div>
      </div>

      {/* Centered Navigation Links */}
      <nav className="absolute left-1/2 transform -translate-x-1/2 hidden lg:flex items-center space-x-8">
        <Link href="/" className="text-white/90 hover:text-white transition-colors font-normal">Home</Link>
        <Link href="/products" className="text-white/90 hover:text-white transition-colors font-normal">Products</Link>
        <Link href="/blog" className="text-white hover:text-white transition-colors font-medium">Blog</Link>
        <Link href="/contact" className="text-white/90 hover:text-white transition-colors font-normal">Contact</Link>
      </nav>

      {/* User Actions */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1 text-white/80">
          <Globe className="w-4 h-4" />
          <span className="text-sm font-medium">EN</span>
        </div>

        {user ? (
          <UserProfile />
        ) : (
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => router.push('/login')}
              className="text-white/90 hover:text-white transition-colors font-medium"
            >
              Log In
            </button>
            <button 
              onClick={() => router.push('/signup')}
              className="bg-white text-gray-900 px-5 py-2.5 rounded-lg font-medium hover:bg-white/90 transition-colors"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
</header>


        {/* Hero Content */}
        {featuredBlogs.length > 0 && (
          <div className="absolute inset-0 z-10 flex items-end">
            <div className="px-6 pb-12 w-full">
              <div className="max-w-xl">
                <div className="inline-block mb-3">
                  <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                    {featuredBlogs[currentSlide]?.category}
                  </span>
                </div>

                <Link href={`/blog/${featuredBlogs[currentSlide]?.slug}`}>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white mb-3 leading-tight tracking-tight cursor-pointer hover:text-gray-200 transition-colors">
                    {featuredBlogs[currentSlide]?.title}
                  </h1>
                </Link>

                <p className="text-base text-white/85 mb-5 leading-relaxed font-normal">
                  {featuredBlogs[currentSlide]?.excerpt}
                </p>

                <div className="flex space-x-2">
                  {featuredBlogs.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentSlide ? 'bg-white' : 'bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Blog Section */}
      <div className="py-16">
        
        {/* Blog Header */}
        <div className="px-6 mb-12">
          <h2 className="text-3xl font-medium text-gray-900 mb-4 tracking-tight">Blog</h2>
          <p className="text-base text-gray-600 max-w-2xl font-normal leading-relaxed">
            Here, we share insights, trends, and innovations that shape the future of business and AI.
          </p>
        </div>

        {/* Search Bar */}
        <div className="px-6 mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-base"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="px-6 flex flex-wrap gap-3 mb-12">
          {BLOG_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category)
                console.log('Selected category:', category)
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid with Fixed Image Fitting */}
        <div className="px-6">
          {blogsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-48 rounded-xl mb-4"></div>
                  <div className="bg-gray-200 h-4 rounded mb-2"></div>
                  <div className="bg-gray-200 h-3 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog) => (
                <Link key={blog.id} href={`/blog/${blog.slug}`}>
                  <article className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                    
                    {/* Blog Image - Fixed Fitting */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={blog.cover_image}
                        alt={blog.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        style={{ objectFit: 'cover' }}
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-xs font-medium">
                          {blog.category}
                        </span>
                      </div>
                    </div>

                    {/* Blog Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-violet-600 transition-colors">
                        {blog.title}
                      </h3>
                      
                      <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3 text-sm">
                        {blog.excerpt}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{formatDate(blog.created_at)}</span>
                        <span>{calculateReadTime(blog.content)} min read</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No blogs found</h3>
              <p className="text-gray-600">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
