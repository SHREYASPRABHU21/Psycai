'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import UserProfile from '@/components/auth/UserProfile'
import Footer from '@/components/layout/Footer'
import { ArrowLeft, Calendar, Clock, Share2, Heart, Globe } from 'lucide-react'
import { fetchBlogBySlug } from '@/lib/supabase-blog'
import { Blog } from '@/lib/supabase'
import Link from 'next/link'


interface BlogPostProps {
  params: {
    slug: string;
  };
}

export default function BlogPost({ params }: BlogPostProps) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [blogLoading, setBlogLoading] = useState(true)
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    loadBlog()
  }, [params.slug])

  const loadBlog = async () => {
    setBlogLoading(true)
    const fetchedBlog = await fetchBlogBySlug(params.slug)
    setBlog(fetchedBlog)
    setBlogLoading(false)
  }

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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog?.title,
          text: blog?.excerpt,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  if (loading || blogLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600"></div>
      </div>
    )
  }

  if (!user || !blog) {
    return <div>Blog not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Navigation Bar */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            
            {/* Logo */}
            <div className="flex items-center">
              <span className="text-xl font-bold text-gray-900">PsycAi</span>
            </div>

            {/* Centered Navigation Links */}
            <nav className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Home</Link>
              <Link href="/products" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Products</Link>
              <Link href="/blog" className="text-gray-900 font-semibold">Blog</Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Contact</Link>
            </nav>

            {/* User Profile */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-gray-600">
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">EN</span>
              </div>
              {user && <UserProfile />}
            </div>
          </div>
        </div>
      </header>

      {/* Blog Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Back Button */}
        <Link 
          href="/blog"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>

        {/* Blog Header */}
        <header className="mb-8">
          <div className="mb-4">
            <span className="bg-violet-100 text-violet-800 px-3 py-1 rounded-full text-sm font-medium">
              {blog.category}
            </span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {blog.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            {blog.excerpt}
          </p>

          <div className="flex items-center justify-between border-b border-gray-200 pb-6">
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(blog.created_at)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{calculateReadTime(blog.content)} min read</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setLiked(!liked)}
                className={`flex items-center space-x-1 px-3 py-1 rounded-full transition-colors ${
                  liked 
                    ? 'bg-red-100 text-red-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                <span className="text-sm">Like</span>
              </button>
              
              <button
                onClick={handleShare}
                className="flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span className="text-sm">Share</span>
              </button>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-10">
          <img
            src={blog.cover_image}
            alt={blog.title}
            className="w-full h-96 object-cover rounded-2xl"
          />
        </div>

        {/* Blog Content */}
        <div className="prose prose-lg prose-gray max-w-none">
          <div 
            dangerouslySetInnerHTML={{ __html: blog.content }}
            className="text-gray-700 leading-relaxed"
            style={{
              fontSize: '18px',
              lineHeight: '1.8',
            }}
          />
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>

      <Footer />
    </div>
  )
}
