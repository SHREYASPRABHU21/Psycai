'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { createBlog, generateSlug, fetchBlogs } from '@/lib/supabase-blog'
import { createProduct, fetchProducts, deleteProduct } from '@/lib/supabase-tools'
import { uploadImage } from '@/lib/supabase-storage'
import { Blog, Tool } from '@/lib/supabase'
import { Save, Upload, Plus, Settings, FileText, Trash2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function AdminPage() {
  const { user, userData, loading } = useAuth()
  const router = useRouter()
  
  const [activeTab, setActiveTab] = useState<'blogs' | 'products'>('blogs')
  
  // Blog form state
  const [blogForm, setBlogForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'Marketing',
    tags: '',
    cover_image: '',
    published: false
  })
  
  // Product form state
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    image: '',
    link: '',
    category: 'Personal Growth',
    rating: 4.5,
    users: '1.0k',
    featured: false
  })
  
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [products, setProducts] = useState<Tool[]>([])

  // Updated categories
  const blogCategories = ['Marketing', 'Business', 'AI']
  const productCategories = ['Personal Growth', 'Entertainment', 'Work', 'Research', 'Creativity']

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login')
        return
      }
      
      // Check if user is admin
      if (user.email !== 'prabhushreyas21@gmail.com') {
        router.push('/')
        return
      }
      
      loadData()
    }
  }, [user, loading, router])

  const loadData = async () => {
    const [fetchedBlogs, fetchedProducts] = await Promise.all([
      fetchBlogs(),
      fetchProducts()
    ])
    setBlogs(fetchedBlogs)
    setProducts(fetchedProducts)
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

  const handleProductInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement
      setProductForm(prev => ({ ...prev, [name]: checkbox.checked }))
    } else if (name === 'rating') {
      setProductForm(prev => ({ ...prev, [name]: parseFloat(value) }))
    } else {
      setProductForm(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'blog' | 'product') => {
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
          setProductForm(prev => ({ ...prev, image: imageUrl }))
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
          category: 'Marketing',
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

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!productForm.name || !productForm.description || !productForm.image || !productForm.link) {
      alert('Please fill in all required fields')
      return
    }

    setSaving(true)

    try {
      const productId = await createProduct(productForm)
      
      if (productId) {
        alert('Product created successfully!')
        setProductForm({
          name: '',
          description: '',
          image: '',
          link: '',
          category: 'Personal Growth',
          rating: 4.5,
          users: '1.0k',
          featured: false
        })
        loadData()
      } else {
        alert('Failed to create product')
      }
    } catch (error) {
      console.error('Error creating product:', error)
      alert('Failed to create product')
    }

    setSaving(false)
  }

  const handleDeleteProduct = async (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const success = await deleteProduct(productId)
      if (success) {
        alert('Product deleted successfully!')
        loadData()
      } else {
        alert('Failed to delete product')
      }
    }
  }

  const handleDeleteBlog = async (blogId: string) => {
    if (confirm('Are you sure you want to delete this blog?')) {
      try {
        const { error } = await supabase
          .from('blogs')
          .delete()
          .eq('id', blogId)

        if (error) throw error
        
        alert('Blog deleted successfully!')
        loadData()
      } catch (error) {
        console.error('Error deleting blog:', error)
        alert('Failed to delete blog')
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

  // Check if user is admin
  if (user.email !== 'prabhushreyas21@gmail.com') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this page.</p>
          <button
            onClick={() => router.push('/')}
            className="mt-4 px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
          >
            Go Home
          </button>
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
              <span className="text-sm text-gray-600">Welcome, Admin!</span>
              <button
                onClick={() => router.push('/blog')}
                className="text-violet-600 hover:text-violet-700"
              >
                View Blog
              </button>
              <button
                onClick={() => router.push('/products')}
                className="text-violet-600 hover:text-violet-700"
              >
                View Products
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
              onClick={() => setActiveTab('products')}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'products'
                  ? 'border-violet-500 text-violet-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Manage Products</span>
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
                        {blogCategories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
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
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => router.push(`/blog/${blog.slug}`)}
                          className="text-violet-600 hover:text-violet-700 text-sm"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDeleteBlog(blog.id)}
                          className="text-red-600 hover:text-red-700 text-sm"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Product Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Create New Product</h2>
                
                <form onSubmit={handleProductSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={productForm.name}
                      onChange={handleProductInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                    <textarea
                      name="description"
                      value={productForm.description}
                      onChange={handleProductInputChange}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Link *</label>
                    <input
                      type="url"
                      name="link"
                      value={productForm.link}
                      onChange={handleProductInputChange}
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
                        value={productForm.category}
                        onChange={handleProductInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                      >
                        {productCategories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                      <input
                        type="number"
                        name="rating"
                        value={productForm.rating}
                        onChange={handleProductInputChange}
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
                        value={productForm.users}
                        onChange={handleProductInputChange}
                        placeholder="1.2k"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Image *</label>
                    <div className="space-y-3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'product')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                      />
                      {uploading && (
                        <div className="flex items-center space-x-2 text-violet-600">
                          <Upload className="w-4 h-4 animate-bounce" />
                          <span className="text-sm">Uploading to Supabase...</span>
                        </div>
                      )}
                      {productForm.image && (
                        <img
                          src={productForm.image}
                          alt="Product preview"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      )}
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={productForm.featured}
                      onChange={handleProductInputChange}
                      className="h-4 w-4 text-violet-600 rounded border-gray-300 focus:ring-violet-500"
                    />
                    <label className="ml-2 text-sm font-medium text-gray-700">Feature this product</label>
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
                        <span>Add Product</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Published Products */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Published Products</h2>
              
              <div className="space-y-4">
                {products.map((product) => (
                  <div key={product.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">★ {product.rating}</span>
                          <div className="flex items-center space-x-2">
                            <a
                              href={product.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-violet-600 hover:text-violet-700 text-sm"
                            >
                              View
                            </a>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
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