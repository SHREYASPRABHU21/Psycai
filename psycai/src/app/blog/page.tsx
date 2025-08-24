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

const sortOptions = ['Newest', 'Oldest', 'Most Popular', 'Most Read']
const BLOG_CATEGORIES = ['All', 'Marketing', 'Business', 'AI']

export default function BlogPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('Newest')
  const [showSortDropdown, setShowSortDropdown] = useState(false)
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

    if (selectedCategory !== 'All') {
      filtered = blogs.filter(blog => blog.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(blog => 
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Sort blogs
    if (sortBy === 'Newest') {
      filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    } else if (sortBy === 'Oldest') {
      filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    } else if (sortBy === 'Most Popular') {
      filtered.sort((a, b) => b.views - a.views)
    }

    setFilteredBlogs(filtered)
  }, [blogs, selectedCategory, searchTerm, sortBy])

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
      month: 'short',
      year: 'numeric'
    })
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
            <div className="flex justify-between items-center py-5">
              
              {/* Logo */}
              <div className="flex items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-violet-600 rounded"></div>
                  </div>
                  <span className="text-xl font-medium text-white tracking-wide">PsycAi</span>
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
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-base"
            />
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="px-6 flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 space-y-4 lg:space-y-0">
          
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {BLOG_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-violet-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
            >
              <span className="text-sm font-medium">Sort by: {sortBy}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {showSortDropdown && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                {sortOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSortBy(option)
                      setShowSortDropdown(false)
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-md last:rounded-b-md font-medium"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

                {/* Blog Posts Grid */}
        <div className="px-6">
          {blogsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 aspect-square rounded-lg"></div>
                </div>
              ))}
            </div>
          ) : filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs.map((blog) => (
                <Link key={blog.id} href={`/blog/${blog.slug}`}>
                  <article className="group cursor-pointer">
                    
                    {/* Square Blog Image with Text Overlay */}
                    <div className="relative aspect-square overflow-hidden rounded-lg">
                      <img
                        src={blog.cover_image}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      
                      {/* Content Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-6 flex flex-col justify-between">
                        
                        {/* Category */}
                        <div className="flex justify-start">
                          <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                            {blog.category}
                          </span>
                        </div>

                        {/* Blog Info */}
                        <div>
                          <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-yellow-200 transition-colors line-clamp-2">
                            {blog.title}
                          </h3>
                          <p className="text-white/90 text-sm leading-relaxed line-clamp-3 mb-3">
                            {blog.excerpt}
                          </p>
                          
                          {/* Post Meta */}
                          <div className="flex items-center justify-between text-xs text-white/70">
                            <div className="flex items-center space-x-2">
                              <User className="w-3 h-3" />
                              <span>{blog.author_name}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>{formatDate(blog.created_at)}</span>
                            </div>
                          </div>
                        </div>
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
