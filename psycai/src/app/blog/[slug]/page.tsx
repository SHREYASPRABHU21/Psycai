'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { fetchBlogBySlug } from '@/lib/supabase-blog'
import { Blog } from '@/lib/supabase'
import UserProfile from '@/components/auth/UserProfile'
import Footer from '@/components/layout/Footer'
import { ArrowLeft, Calendar, User, Eye, Heart, Share2 } from 'lucide-react'
import Link from 'next/link'

export default function SingleBlogPage() {
  const params = useParams()
  const router = useRouter()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadBlog = async () => {
      if (params.slug) {
        const fetchedBlog = await fetchBlogBySlug(params.slug as string)
        setBlog(fetchedBlog)
        setLoading(false)
      }
    }

    loadBlog()
  }, [params.slug])

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog post not found</h1>
          <Link href="/blog" className="text-violet-600 hover:text-violet-700">
            ← Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link href="/blog" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Back to Blog</span>
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-xl font-medium text-gray-900">PsycAi</span>
              <UserProfile />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={blog.cover_image}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        
        <div className="absolute bottom-8 left-6 right-6">
          <div className="max-w-4xl">
            <div className="inline-block mb-4">
              <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                {blog.category}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {blog.title}
            </h1>
            
            <div className="flex items-center space-x-6 text-white/80">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span className="text-sm">{blog.author_name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{formatDate(blog.created_at)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4" />
                <span className="text-sm">{blog.views} views</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Article Actions */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors">
              <Heart className="w-5 h-5" />
              <span className="text-sm font-medium">{blog.likes}</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-600 hover:text-violet-600 transition-colors">
              <Share2 className="w-5 h-5" />
              <span className="text-sm font-medium">Share</span>
            </button>
          </div>
          
          <div className="text-sm text-gray-500">
            {Math.ceil(blog.content.length / 1000)} min read
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <div 
            dangerouslySetInnerHTML={{ __html: blog.content }}
            className="text-gray-700 leading-relaxed"
          />
        </div>

        {/* Author Box */}
        <div className="mt-12 p-6 bg-gray-50 rounded-xl">
          <div className="flex items-start space-x-4">
            {blog.author_photo_url ? (
              <img
                src={blog.author_photo_url}
                alt={blog.author_name}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-violet-600" />
              </div>
            )}
            
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {blog.author_name}
              </h3>
              <p className="text-gray-600 text-sm">
                Author and AI researcher sharing insights about technology and innovation.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
