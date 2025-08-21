'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Layout from '@/components/layout/Layout'
import Link from 'next/link'
import { getBlogs, getBlogCategories } from '@/lib/blog'
import { Blog, BlogCategory } from '@/types/blog'
import { Search, Calendar, Tag, ArrowRight } from 'lucide-react'

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  // Ensure component is mounted before doing anything
  useEffect(() => {
    setMounted(true)
  }, [])

  // Load data whenever filters change
  useEffect(() => {
    if (!mounted) return

    const loadData = async () => {
      setIsLoading(true)
      setError('')
      
      try {
        console.log('🔍 Blog page: Loading data...')
        
        const [blogsResult, categoriesResult] = await Promise.all([
          getBlogs({ 
            published: true,
            search: searchQuery || undefined,
            category: selectedCategory || undefined
          }),
          getBlogCategories()
        ])

        console.log('🔍 Blog page: Data loaded', {
          blogsCount: blogsResult.data?.length || 0,
          categoriesCount: categoriesResult.data?.length || 0
        })

        if (blogsResult.data) {
          setBlogs(blogsResult.data)
        }
        
        if (categoriesResult.data) {
          setCategories(categoriesResult.data)
        }

      } catch (error) {
        console.error('🔍 Blog page: Error loading data', error)
        setError(error instanceof Error ? error.message : 'Failed to load blog data')
      } finally {
        setIsLoading(false)
      }
    }

    // Add small delay to ensure proper mounting
    const timeoutId = setTimeout(loadData, 100)
    return () => clearTimeout(timeoutId)
  }, [mounted, searchQuery, selectedCategory])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Don't render until mounted
  if (!mounted) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-background via-surface to-primary/5 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-text/60">Initializing...</p>
          </div>
        </div>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-background via-surface to-primary/5 flex items-center justify-center">
          <div className="text-center max-w-md px-4">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-text mb-4">Error Loading Blog</h2>
            <p className="text-text/60 mb-6">{error}</p>
            <div className="space-y-2">
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
              >
                Reload Page
              </button>
              <button
                onClick={() => router.push('/')}
                className="w-full border border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors"
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-background via-surface to-primary/5 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-text/60">Loading blog posts...</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-background via-surface to-primary/5">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center">
                <span className="text-2xl">📝</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-4">
              Psycai Blog
            </h1>
            <p className="text-xl text-text/70 max-w-3xl mx-auto">
              Insights, tutorials, and updates about AI tools, productivity tips, 
              and the latest trends in artificial intelligence.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text/40" />
                <input
                  type="text"
                  placeholder="Search blog posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
                />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-text/60">
                  {blogs.length} posts found
                </span>
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory('')}
                className={`px-4 py-2 rounded-xl transition-all duration-200 ${
                  selectedCategory === ''
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-white text-text border border-gray-200 hover:border-primary/50'
                }`}
              >
                All Posts ({blogs.length})
              </button>
              {categories.map((category) => {
                const categoryCount = blogs.filter(blog => blog.category === category.slug).length
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.slug)}
                    className={`px-4 py-2 rounded-xl transition-all duration-200 ${
                      selectedCategory === category.slug
                        ? 'text-white shadow-lg'
                        : 'bg-white text-text border border-gray-200 hover:border-primary/50'
                    }`}
                    style={{
                      backgroundColor: selectedCategory === category.slug ? category.color : undefined
                    }}
                  >
                    {category.name} ({categoryCount})
                  </button>
                )
              })}
            </div>
          </div>

          {/* Blog Grid */}
          {blogs.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-text mb-2">No blog posts found</h3>
              <p className="text-text/60">
                {searchQuery || selectedCategory 
                  ? 'Try adjusting your search or filters.' 
                  : 'Check back soon for new content!'}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => {
                const categoryObj = categories.find(c => c.slug === blog.category)
                
                return (
                  <article key={blog.id} className="group">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1 h-full flex flex-col">
                      <div className="p-6 flex-1 flex flex-col">
                        {/* Category and Date */}
                        <div className="flex items-center justify-between mb-4">
                          {categoryObj && (
                            <span 
                              className="px-3 py-1 text-xs font-medium rounded-full text-white"
                              style={{ backgroundColor: categoryObj.color }}
                            >
                              {categoryObj.name}
                            </span>
                          )}
                          <div className="flex items-center text-sm text-text/60">
                            <Calendar className="w-3 h-3 mr-1" />
                            {formatDate(blog.created_at)}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <h2 className="text-xl font-semibold text-text mb-3 group-hover:text-primary transition-colors line-clamp-2">
                            {blog.title}
                          </h2>
                          
                          {blog.excerpt && (
                            <p className="text-text/70 mb-4 line-clamp-3">
                              {blog.excerpt}
                            </p>
                          )}
                        </div>

                        {/* Tags */}
                        {blog.tags.length > 0 && (
                          <div className="flex items-center mb-4">
                            <Tag className="w-3 h-3 text-text/40 mr-2" />
                            <div className="flex flex-wrap gap-1">
                              {blog.tags.slice(0, 3).map((tag, index) => (
                                <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                  {tag}
                                </span>
                              ))}
                              {blog.tags.length > 3 && (
                                <span className="text-xs text-text/60">+{blog.tags.length - 3}</span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Read More */}
                        <Link 
                          href={`/blog/${blog.slug}`}
                          className="flex items-center text-primary hover:text-primary-dark transition-colors font-medium"
                        >
                          Read More
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
