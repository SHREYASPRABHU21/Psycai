'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import Layout from '@/components/layout/Layout'
import { getBlogs, deleteBlog, getBlogCategories } from '@/lib/blog'
import { Blog, BlogCategory } from '@/types/blog'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search, 
  Filter, 
  Calendar,
  BarChart3,
  TrendingUp,
  Users,
  FileText,
  Sparkles,
  Settings,
  Crown
} from 'lucide-react'

export default function AdminBlogsPage() {
  const { user, loading: authLoading, isClient } = useAuth()
  const router = useRouter()
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [showPublished, setShowPublished] = useState<'all' | 'published' | 'drafts'>('all')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || authLoading || !isClient) return
    
    if (!user) {
      router.push('/login')
      return
    }
  }, [mounted, authLoading, user, isClient, router])

  useEffect(() => {
    if (!mounted || authLoading || !user || !isClient) return

    const loadData = async () => {
      setIsLoading(true)
      setError('')
      
      try {
        const [blogsResult, categoriesResult] = await Promise.all([
          getBlogs({ 
            search: searchQuery || undefined,
            category: selectedCategory || undefined,
            published: showPublished === 'all' ? undefined : showPublished === 'published'
          }),
          getBlogCategories()
        ])

        if (blogsResult.data) setBlogs(blogsResult.data)
        if (categoriesResult.data) setCategories(categoriesResult.data)

      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to load admin data')
      } finally {
        setIsLoading(false)
      }
    }

    const timeoutId = setTimeout(loadData, 100)
    return () => clearTimeout(timeoutId)
  }, [mounted, authLoading, user, isClient, searchQuery, selectedCategory, showPublished])

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return

    try {
      await deleteBlog(id)
      setBlogs(prev => prev.filter(blog => blog.id !== id))
    } catch (error) {
      alert('Failed to delete blog post')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const stats = {
    total: blogs.length,
    published: blogs.filter(b => b.published).length,
    drafts: blogs.filter(b => !b.published).length,
    thisMonth: blogs.filter(b => {
      const blogDate = new Date(b.created_at)
      const now = new Date()
      return blogDate.getMonth() === now.getMonth() && blogDate.getFullYear() === now.getFullYear()
    }).length
  }

  if (!mounted || authLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-paper via-snow to-paper flex items-center justify-center pt-20">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-infinity rounded-full flex items-center justify-center pulse-glow mx-auto mb-6">
              <Crown className="w-8 h-8 text-white animate-pulse" />
            </div>
            <p className="text-body text-slate">Accessing control center...</p>
          </div>
        </div>
      </Layout>
    )
  }

  if (!user) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-paper via-snow to-paper flex items-center justify-center pt-20">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-infinity rounded-full flex items-center justify-center pulse-glow mx-auto mb-6">
              <Crown className="w-8 h-8 text-white animate-spin" />
            </div>
            <p className="text-body text-slate">Redirecting to login...</p>
          </div>
        </div>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-paper via-snow to-paper flex items-center justify-center pt-20">
          <div className="text-center max-w-md px-6">
            <div className="text-6xl mb-6">⚠️</div>
            <h2 className="text-headline text-obsidian mb-4">Control Center Error</h2>
            <p className="text-body text-slate mb-6">{error}</p>
            <div className="space-y-3">
              <button onClick={() => window.location.reload()} className="btn-infinity w-full">
                Reconnect
              </button>
              <button onClick={() => router.push('/tools')} className="btn-growth w-full">
                Return to Platform
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
        <div className="min-h-screen bg-gradient-to-br from-paper via-snow to-paper flex items-center justify-center pt-20">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-infinity rounded-full flex items-center justify-center pulse-glow mx-auto mb-6">
              <BarChart3 className="w-8 h-8 text-white animate-bounce" />
            </div>
            <p className="text-body text-slate">Loading control center...</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-paper via-snow to-paper">
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-organic opacity-20" />
          
          <div className="container mx-auto px-6 relative">
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              
              <div className="lg:col-span-7 space-y-8">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-infinity rounded-full flex items-center justify-center pulse-glow">
                      <Crown className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <span className="text-label text-stone">Content Management</span>
                      <div className="text-title infinity-gradient font-bold">PsycAi CMS</div>
                    </div>
                  </div>
                  
                  <h1 className="text-hero">
                    <span className="infinity-gradient">Content</span>
                    <br />
                    <span className="growth-gradient">Control Center</span>
                  </h1>
                  
                  <p className="text-body-lg text-slate max-w-2xl leading-relaxed">
                    Manage your organization's content strategy from our comprehensive editorial platform. 
                    Create, publish, and optimize content that drives engagement and showcases innovation.
                  </p>
                </div>

                <button 
                  onClick={() => router.push('/admin/blogs/new')}
                  className="btn-infinity"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create New Article
                </button>
              </div>

              <div className="lg:col-span-5">
                <div className="grid grid-cols-2 gap-6">
                  <div className="card-organic p-6 hover-lift">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-infinity rounded-2xl flex items-center justify-center">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-display infinity-gradient font-bold">{stats.total}</div>
                        <div className="text-caption text-stone">Total Articles</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card-flow p-6 hover-lift">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-growth rounded-2xl flex items-center justify-center">
                        <Eye className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-display growth-gradient font-bold">{stats.published}</div>
                        <div className="text-caption text-stone">Published</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card-minimal p-6 hover-lift">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-warning rounded-2xl flex items-center justify-center">
                        <Edit className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-display text-warning font-bold">{stats.drafts}</div>
                        <div className="text-caption text-stone">In Review</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card-organic p-6 hover-lift">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-success rounded-2xl flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-display text-success font-bold">{stats.thisMonth}</div>
                        <div className="text-caption text-stone">This Quarter</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="card-flow p-8">
              <div className="grid lg:grid-cols-4 gap-8">
                
                <div className="lg:col-span-2 space-y-4">
                  <label className="text-label text-stone flex items-center space-x-2">
                    <Search className="w-4 h-4" />
                    <span>Content Library</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Search articles, drafts, or ideas..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-4 bg-snow border-2 border-mist rounded-2xl focus:border-infinity focus:outline-none transition-all text-body"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-label text-stone flex items-center space-x-2">
                    <Filter className="w-4 h-4" />
                    <span>Topic Categories</span>
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-4 bg-snow border-2 border-mist rounded-2xl focus:border-infinity focus:outline-none transition-all text-body"
                  >
                    <option value="">All Topics</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.slug}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-4">
                  <label className="text-label text-stone flex items-center space-x-2">
                    <Settings className="w-4 h-4" />
                    <span>Publication Status</span>
                  </label>
                  <select
                    value={showPublished}
                    onChange={(e) => setShowPublished(e.target.value as 'all' | 'published' | 'drafts')}
                    className="w-full px-4 py-4 bg-snow border-2 border-mist rounded-2xl focus:border-infinity focus:outline-none transition-all text-body"
                  >
                    <option value="all">All Status ({stats.total})</option>
                    <option value="published">Published ({stats.published})</option>
                    <option value="drafts">In Review ({stats.drafts})</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Grid */}
        <section className="pb-16">
          <div className="container mx-auto px-6">
            {blogs.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-mist rounded-full flex items-center justify-center mx-auto mb-8 float-animation">
                  <Sparkles className="w-12 h-12 text-stone" />
                </div>
                <h3 className="text-headline text-obsidian mb-4">
                  {searchQuery || selectedCategory ? 'No matching content' : 'Content library awaits'}
                </h3>
                <p className="text-body text-slate mb-8 max-w-md mx-auto">
                  {searchQuery || selectedCategory 
                    ? 'Try adjusting your search or explore different topics.' 
                    : 'Start building your content library with insights, tutorials, and company updates.'}
                </p>
                <div className="flex justify-center space-x-4">
                  {!searchQuery && !selectedCategory ? (
                    <button
                      onClick={() => router.push('/admin/blogs/new')}
                      className="btn-infinity"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Create First Article
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setSearchQuery('')
                        setSelectedCategory('')
                        setShowPublished('all')
                      }}
                      className="btn-growth"
                    >
                      View All Content
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {blogs.map((blog, index) => {
                  const categoryObj = categories.find(c => c.slug === blog.category)
                  
                  return (
                    <div key={blog.id} className="card-organic p-8 hover-lift transition-all duration-300">
                      <div className="grid lg:grid-cols-12 gap-8 items-center">
                        
                        <div className="lg:col-span-8 space-y-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-3">
                              <h3 className="text-title text-obsidian hover:text-infinity transition-colors cursor-pointer">
                                {blog.title}
                              </h3>
                              <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                                blog.published 
                                  ? 'bg-success text-white' 
                                  : 'bg-warning text-white'
                              }`}>
                                {blog.published ? 'Published' : 'In Review'}
                              </span>
                            </div>
                            {categoryObj && (
                              <span 
                                className="px-3 py-1 text-xs font-medium rounded-full text-white"
                                style={{ backgroundColor: categoryObj.color }}
                              >
                                {categoryObj.name}
                              </span>
                            )}
                          </div>

                          {blog.excerpt && (
                            <p className="text-body text-slate line-clamp-2 leading-relaxed">
                              {blog.excerpt}
                            </p>
                          )}

                          <div className="flex items-center space-x-6 text-caption text-stone">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-3 h-3" />
                              <span>{formatDate(blog.created_at)}</span>
                            </div>
                            {blog.tags.length > 0 && (
                              <div className="flex items-center space-x-2">
                                <span>Tags:</span>
                                <span>{blog.tags.slice(0, 3).join(', ')}</span>
                                {blog.tags.length > 3 && <span>+{blog.tags.length - 3}</span>}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="lg:col-span-4 flex items-center justify-end space-x-3">
                          {blog.published && (
                            <button
                              onClick={() => window.open(`/blog/${blog.slug}`, '_blank')}
                              className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 hover:scale-110 transition-all"
                              title="View published article"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                          )}
                          <button
                            onClick={() => router.push(`/admin/blogs/edit/${blog.id}`)}
                            className="p-3 bg-infinity/10 text-infinity rounded-xl hover:bg-infinity hover:text-white hover:scale-110 transition-all"
                            title="Edit article"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(blog.id, blog.title)}
                            className="p-3 bg-red-50 text-danger rounded-xl hover:bg-danger hover:text-white hover:scale-110 transition-all"
                            title="Delete article"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  )
}
