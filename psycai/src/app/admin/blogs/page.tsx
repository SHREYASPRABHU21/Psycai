'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { createBlog, generateSlug, fetchBlogs } from '@/lib/supabase-blog'
import { createTool, fetchTools, deleteTool } from '@/lib/supabase-tools'
import { uploadImage } from '@/lib/supabase-storage'
import { Blog, Tool } from '@/lib/supabase'
import { Save, Upload, Plus, Settings, FileText, Trash2 } from 'lucide-react'

export default function AdminPage() {
  const { user, userData, loading } = useAuth()
  const router = useRouter()
  
  const [activeTab, setActiveTab] = useState<'blogs' | 'tools'>('blogs')
  
  // Blog form state
  const [blogForm, setBlogForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'AI Research',
    tags: '',
    cover_image: '',
    published: false
  })
  
  // Tool form state
  const [toolForm, setToolForm] = useState({
    name: '',
    description: '',
    image: '',
    link: '',
    category: 'Writing',
    rating: 4.5,
    users: '1.0k',
    featured: false
  })
  
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [tools, setTools] = useState<Tool[]>([])

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login')
        return
      }
      loadData()
    }
  }, [user, loading, router])

  const loadData = async () => {
    const [fetchedBlogs, fetchedTools] = await Promise.all([
      fetchBlogs(),
      fetchTools()
    ])
    setBlogs(fetchedBlogs)
    setTools(fetchedTools)
  }

  const handleBlogInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement
      setBlogForm(prev => ({ ...prev, [name]: checkbox.checked }))
    } else {
      setBlogForm(prev => ({ ...prev, [name]: value }))
      
      if (name === 'title') {
        setBlogForm(prev => ({ ...prev, slug: generateSlug(value) }))
      }
    }
  }

  const handleToolInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement
      setToolForm(prev => ({ ...prev, [name]: checkbox.checked }))
    } else if (name === 'rating') {
      setToolForm(prev => ({ ...prev, [name]: parseFloat(value) }))
    } else {
      setToolForm(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'blog' | 'tool') => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)

    try {
      const bucket = type === 'blog' ? 'blog-images' : 'tool-images'
      const imageUrl = await uploadImage(file, bucket)
      
      if (imageUrl) {
        if (type === 'blog') {
          setBlogForm(prev => ({ ...prev, cover_image: imageUrl }))
        } else {
          setToolForm(prev => ({ ...prev, image: imageUrl }))
        }
      } else {
        alert('Failed to upload image')
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Failed to upload image')
    }
    
    setUploading(false)
  }

  const handleBlogSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  if (!user || !userData) {
    alert('You must be logged in to create a blog post')
    return
  }

  if (!blogForm.title || !blogForm.content || !blogForm.cover_image) {
    alert('Please fill in all required fields')
    return
  }

  setSaving(true)

  try {
    const blogData = {
      title: blogForm.title,
      slug: blogForm.slug,
      excerpt: blogForm.excerpt,
      content: blogForm.content,
      category: blogForm.category,
      tags: blogForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      cover_image: blogForm.cover_image,
      published: blogForm.published
    }

    const authorData = {
      name: userData.displayName || user.displayName || 'Admin',
      email: user.email!,
      photoURL: user.photoURL || userData.photoURL,
      uid: user.uid
    }

    console.log('Submitting blog:', { blogData, authorData })

    const blogId = await createBlog(blogData, authorData)
    
    if (blogId) {
      alert('Blog post created successfully!')
      setBlogForm({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        category: 'AI Research',
        tags: '',
        cover_image: '',
        published: false
      })
      loadData()
    } else {
      alert('Failed to create blog post - check console for details')
    }
  } catch (error) {
    console.error('Error in handleBlogSubmit:', error)
    alert('Failed to create blog post - check console for details')
  }

  setSaving(false)
}


  const handleToolSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!toolForm.name || !toolForm.description || !toolForm.image || !toolForm.link) {
      alert('Please fill in all required fields')
      return
    }

    setSaving(true)

    try {
      const toolId = await createTool(toolForm)
      
      if (toolId) {
        alert('Tool created successfully!')
        setToolForm({
          name: '',
          description: '',
          image: '',
          link: '',
          category: 'Writing',
          rating: 4.5,
          users: '1.0k',
          featured: false
        })
        loadData()
      } else {
        alert('Failed to create tool')
      }
    } catch (error) {
      console.error('Error creating tool:', error)
      alert('Failed to create tool')
    }

    setSaving(false)
  }

  const handleDeleteTool = async (toolId: string) => {
    if (confirm('Are you sure you want to delete this tool?')) {
      const success = await deleteTool(toolId)
      if (success) {
        alert('Tool deleted successfully!')
        loadData()
      } else {
        alert('Failed to delete tool')
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">Please log in to access the admin panel.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/blog')}
                className="text-violet-600 hover:text-violet-700"
              >
                View Blog
              </button>
              <button
                onClick={() => router.push('/tools')}
                className="text-violet-600 hover:text-violet-700"
              >
                View Tools
              </button>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="flex space-x-8 mt-4">
            <button
              onClick={() => setActiveTab('blogs')}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'blogs'
                  ? 'border-violet-500 text-violet-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Manage Blogs</span>
            </button>
            <button
              onClick={() => setActiveTab('tools')}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'tools'
                  ? 'border-violet-500 text-violet-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Manage Tools</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'blogs' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Blog Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Create New Blog Post</h2>
                
                <form onSubmit={handleBlogSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={blogForm.title}
                      onChange={handleBlogInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
                    <input
                      type="text"
                      name="slug"
                      value={blogForm.slug}
                      onChange={handleBlogInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <select
                        name="category"
                        value={blogForm.category}
                        onChange={handleBlogInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                      >
                        <option value="AI Research">AI Research</option>
                        <option value="Deep Learning">Deep Learning</option>
                        <option value="Quantum Tech">Quantum Tech</option>
                        <option value="AI Ethics">AI Ethics</option>
                        <option value="Blockchain">Blockchain</option>
                        <option value="Cloud Tech">Cloud Tech</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma separated)</label>
                      <input
                        type="text"
                        name="tags"
                        value={blogForm.tags}
                        onChange={handleBlogInputChange}
                        placeholder="AI, Machine Learning, Tech"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image *</label>
                    <div className="space-y-3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'blog')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                      />
                      {uploading && (
                        <div className="flex items-center space-x-2 text-violet-600">
                          <Upload className="w-4 h-4 animate-bounce" />
                          <span className="text-sm">Uploading to Supabase...</span>
                        </div>
                      )}
                      {blogForm.cover_image && (
                        <img
                          src={blogForm.cover_image}
                          alt="Cover preview"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt *</label>
                    <textarea
                      name="excerpt"
                      value={blogForm.excerpt}
                      onChange={handleBlogInputChange}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Content * (HTML/Markdown)</label>
                    <textarea
                      name="content"
                      value={blogForm.content}
                      onChange={handleBlogInputChange}
                      rows={15}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 font-mono text-sm"
                      required
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="published"
                      checked={blogForm.published}
                      onChange={handleBlogInputChange}
                      className="h-4 w-4 text-violet-600 rounded border-gray-300 focus:ring-violet-500"
                    />
                    <label className="ml-2 text-sm font-medium text-gray-700">Publish immediately</label>
                  </div>

                  <button
                    type="submit"
                    disabled={saving || uploading}
                    className="w-full bg-violet-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {saving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Save Blog Post</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Published Blogs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Published Blogs</h2>
              
              <div className="space-y-4">
                {blogs.map((blog) => (
                  <div key={blog.id} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">{blog.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{blog.category} • {blog.views} views</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {new Date(blog.created_at).toLocaleDateString()}
                      </span>
                      <button
                        onClick={() => router.push(`/blog/${blog.slug}`)}
                        className="text-violet-600 hover:text-violet-700 text-sm"
                      >
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Tool Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Create New Tool</h2>
                
                <form onSubmit={handleToolSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tool Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={toolForm.name}
                      onChange={handleToolInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                    <textarea
                      name="description"
                      value={toolForm.description}
                      onChange={handleToolInputChange}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tool Link *</label>
                    <input
                      type="url"
                      name="link"
                      value={toolForm.link}
                      onChange={handleToolInputChange}
                      placeholder="https://example.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <select
                        name="category"
                        value={toolForm.category}
                        onChange={handleToolInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                      >
                        <option value="Writing">Writing</option>
                        <option value="Design">Design</option>
                        <option value="Audio">Audio</option>
                        <option value="Development">Development</option>
                        <option value="Analytics">Analytics</option>
                        <option value="Media">Media</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                      <input
                        type="number"
                        name="rating"
                        value={toolForm.rating}
                        onChange={handleToolInputChange}
                        min="1"
                        max="5"
                        step="0.1"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Users</label>
                      <input
                        type="text"
                        name="users"
                        value={toolForm.users}
                        onChange={handleToolInputChange}
                        placeholder="1.2k"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tool Image *</label>
                    <div className="space-y-3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'tool')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                      />
                      {uploading && (
                        <div className="flex items-center space-x-2 text-violet-600">
                          <Upload className="w-4 h-4 animate-bounce" />
                          <span className="text-sm">Uploading to Supabase...</span>
                        </div>
                      )}
                      {toolForm.image && (
                        <img
                          src={toolForm.image}
                          alt="Tool preview"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      )}
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={toolForm.featured}
                      onChange={handleToolInputChange}
                      className="h-4 w-4 text-violet-600 rounded border-gray-300 focus:ring-violet-500"
                    />
                    <label className="ml-2 text-sm font-medium text-gray-700">Feature this tool</label>
                  </div>

                  <button
                    type="submit"
                    disabled={saving || uploading}
                    className="w-full bg-violet-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {saving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Add Tool</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Published Tools */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Published Tools</h2>
              
              <div className="space-y-4">
                {tools.map((tool) => (
                  <div key={tool.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <img
                        src={tool.image}
                        alt={tool.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">{tool.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{tool.category}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">★ {tool.rating}</span>
                          <div className="flex items-center space-x-2">
                            <a
                              href={tool.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-violet-600 hover:text-violet-700 text-sm"
                            >
                              View
                            </a>
                            <button
                              onClick={() => handleDeleteTool(tool.id)}
                              className="text-red-600 hover:text-red-700 text-sm"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
