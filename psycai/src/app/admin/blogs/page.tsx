'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import Layout from '@/components/layout/Layout'
import { getBlogs, deleteBlog, getBlogCategories } from '@/lib/blog'
import { Blog, BlogCategory } from '@/types/blog'
import { Plus, Edit, Trash2, Eye, Search, Filter, Calendar } from 'lucide-react'

export default function AdminBlogsPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [showPublished, setShowPublished] = useState<'all' | 'published' | 'drafts'>('all')

  // Load data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
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
        console.error('Error loading blogs:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (user) loadData()
  }, [user, searchQuery, selectedCategory, showPublished])

  // Redirect if not authenticated
  if (!loading && !user) {
    router.push('/login')
    return null
  }

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

  if (loading || isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-background via-surface to-primary/5 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-text/60">Loading blogs...</p>
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
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold gradient-text mb-2">Blog Management</h1>
              <p className="text-text/60">Manage your blog posts and content</p>
            </div>
            <button
              onClick={() => router.push('/admin/blogs/new')}
              className="flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary-dark transition-colors shadow-lg"
            >
              <Plus className="w-4 h-4" />
              <span>New Post</span>
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-8">
            <div className="grid md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <select
                value={showPublished}
                onChange={(e) => setShowPublished(e.target.value as 'all' | 'published' | 'drafts')}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="all">All Posts</option>
                <option value="published">Published</option>
                <option value="drafts">Drafts</option>
              </select>
            </div>
          </div>

          {/* Blog List */}
          {blogs.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Edit className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-text mb-2">No blog posts found</h3>
              <p className="text-text/60 mb-6">
                {searchQuery || selectedCategory ? 'Try adjusting your filters.' : 'Get started by creating your first blog post.'}
              </p>
              {!searchQuery && !selectedCategory && (
                <button
                  onClick={() => router.push('/admin/blogs/new')}
                  className="bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary-dark transition-colors"
                >
                  Create Your First Post
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {blogs.map((blog) => {
                const categoryObj = categories.find(c => c.slug === blog.category)
                
                return (
                  <div key={blog.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-text hover:text-primary cursor-pointer">
                            {blog.title}
                          </h3>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            blog.published 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {blog.published ? 'Published' : 'Draft'}
                          </span>
                          {categoryObj && (
                            <span 
                              className="px-2 py-1 text-xs rounded-full text-white"
                              style={{ backgroundColor: categoryObj.color }}
                            >
                              {categoryObj.name}
                            </span>
                          )}
                        </div>

                        {blog.excerpt && (
                          <p className="text-text/70 mb-3 line-clamp-2">{blog.excerpt}</p>
                        )}

                        <div className="flex items-center space-x-4 text-sm text-text/60">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(blog.created_at)}</span>
                          </div>
                          {blog.tags.length > 0 && (
                            <div className="flex items-center space-x-1">
                              <span>Tags:</span>
                              <span>{blog.tags.slice(0, 3).join(', ')}</span>
                              {blog.tags.length > 3 && <span>+{blog.tags.length - 3}</span>}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 ml-4">
                        {blog.published && (
                          <button
                            onClick={() => window.open(`/blog/${blog.slug}`, '_blank')}
                            className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                            title="View post"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => router.push(`/admin/blogs/edit/${blog.id}`)}
                          className="p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                          title="Edit post"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(blog.id, blog.title)}
                          className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                          title="Delete post"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
