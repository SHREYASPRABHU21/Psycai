'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import Layout from '@/components/layout/Layout'
import MarkdownEditor from '@/components/blog/MarkdownEditor'
import { createBlog, getBlogCategories, generateSlug, generateExcerpt } from '@/lib/blog'
import { BlogCategory } from '@/types/blog'
import { Save, Eye, ArrowLeft, Tag, Folder } from 'lucide-react'

export default function NewBlogPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Form state
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState('')
  const [published, setPublished] = useState(false)

  // Load categories
  useEffect(() => {
    const loadCategories = async () => {
      const { data } = await getBlogCategories()
      if (data) {
        setCategories(data)
        if (data.length > 0) setCategory(data[0].slug)
      }
    }
    loadCategories()
  }, [])

  // Auto-generate slug from title
  useEffect(() => {
    if (title && !slug) {
      setSlug(generateSlug(title))
    }
  }, [title, slug])

  // Redirect if not authenticated
  if (!loading && !user) {
    router.push('/login')
    return null
  }

  const handleSave = async (shouldPublish: boolean = published) => {
    setIsLoading(true)
    setError('')

    try {
      const tagsArray = tags.split(',').map(tag => tag.trim()).filter(Boolean)
      const excerpt = generateExcerpt(content)

      const { error: saveError } = await createBlog({
        title: title.trim(),
        slug: slug.trim(),
        content,
        excerpt,
        category,
        tags: tagsArray,
        published: shouldPublish,
        author_id: user?.id
      })

      if (saveError) throw saveError

      router.push('/admin/blogs')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save blog post')
    } finally {
      setIsLoading(false)
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-background via-surface to-primary/5 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-text/60">Loading editor...</p>
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
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/admin/blogs')}
                className="p-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-3xl font-bold gradient-text">New Blog Post</h1>
                <p className="text-text/60">Create and publish a new blog post</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleSave(false)}
                disabled={!title.trim() || !content.trim() || isLoading}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                <span>Save Draft</span>
              </button>
              <button
                onClick={() => handleSave(true)}
                disabled={!title.trim() || !content.trim() || isLoading}
                className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Eye className="w-4 h-4" />
                <span>Publish</span>
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
              {error}
            </div>
          )}

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Title */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter your blog post title..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-lg"
                />
              </div>

              {/* Slug */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL Slug *
                </label>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">/blog/</span>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(generateSlug(e.target.value))}
                    placeholder="url-friendly-slug"
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>

              {/* Content Editor */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Content *
                </label>
                <MarkdownEditor
                  value={content}
                  onChange={setContent}
                  height={500}
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Category */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <div className="flex items-center space-x-2 mb-4">
                  <Folder className="w-4 h-4 text-primary" />
                  <label className="text-sm font-medium text-gray-700">
                    Category *
                  </label>
                </div>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tags */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <div className="flex items-center space-x-2 mb-4">
                  <Tag className="w-4 h-4 text-primary" />
                  <label className="text-sm font-medium text-gray-700">
                    Tags
                  </label>
                </div>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="ai, tools, tutorial (comma-separated)"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Separate tags with commas
                </p>
              </div>

              {/* Publish Status */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Publish immediately
                  </span>
                </label>
                <p className="text-xs text-gray-500 mt-2">
                  Unchecked posts are saved as drafts
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
