'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import UserProfile from '@/components/auth/UserProfile'
import Footer from '@/components/layout/Footer'
import { Search, Star, Users, ExternalLink, Globe } from 'lucide-react'
import { trackPageView, trackToolClick, trackSearch, trackCategoryFilter } from '@/lib/analytics'
import { fetchProducts } from '@/lib/supabase-tools'
import { Tool } from '@/lib/supabase'
import Link from 'next/link'

const PRODUCT_CATEGORIES = ['All', 'Personal Growth', 'Entertainment', 'Work', 'Research', 'Creativity']

export default function ProductsPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [products, setProducts] = useState<Tool[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Tool[]>([])
  const [productsLoading, setProductsLoading] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    trackPageView('Products Page', 'AI Applications')
    loadProducts()
  }, [])

  const loadProducts = async () => {
    setProductsLoading(true)
    const fetchedProducts = await fetchProducts()
    setProducts(fetchedProducts)
    setFilteredProducts(fetchedProducts)
    setProductsLoading(false)
  }

  useEffect(() => {
    let filtered = products

    if (selectedCategory !== 'All') {
      filtered = products.filter(product => product.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
      
      trackSearch(searchTerm, filtered.length)
    }

    setFilteredProducts(filtered)
  }, [products, searchTerm, selectedCategory])

  const handleProductClick = (product: Tool) => {
    trackToolClick(product.name, product.category)
    window.open(product.link, '_blank')
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    trackCategoryFilter(category)
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
    <div className="min-h-screen bg-gray-50">
      
      {/* Navigation Bar */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            
            {/* Logo */}
            <div className="flex items-center">
              <img src="/psycai-logo.png" alt="PsycAi Logo" className="h-8 w-auto" />
            </div>

            {/* Centered Navigation Links */}
            <nav className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">Home</Link>
              <Link href="/products" className="text-gray-900 font-medium">Products</Link>
              <Link href="/blog" className="text-gray-600 hover:text-gray-900 transition-colors">Blog</Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</Link>
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

      {/* Header Text */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">AI Products</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover powerful AI applications to boost your productivity and creativity
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          
          {/* Search and Categories */}
          <div className="p-8 border-b border-gray-100">
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-base"
              />
            </div>

            <div className="flex flex-wrap gap-4">
              {PRODUCT_CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 text-sm font-semibold transition-all ${
                    selectedCategory === category
                      ? 'text-violet-700 border-b-2 border-violet-700'
                      : 'text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

                    {/* Products Grid */}
          <div className="p-8">
            {productsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 h-64 rounded-xl mb-4"></div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                    className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {/* Product Image with Overlay */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        style={{ objectFit: 'cover' }}
                      />
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-xs font-medium">
                          {product.category}
                        </span>
                      </div>
                      
                      {/* External Link Icon */}
                      <div className="absolute top-4 right-4">
                        <div className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <ExternalLink className="w-4 h-4 text-gray-700" />
                        </div>
                      </div>

                      {/* Title Always Visible */}
                      <div className="absolute group-hover:opacity-0 bottom-4 left-4 right-4">
                        <h3 className="text-white font-semibold text-lg leading-tight drop-shadow-lg">
                          {product.name}
                        </h3>
                      </div>

                      {/* Hover Overlay with Description */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                        <h3 className="text-white font-semibold text-lg mb-2">
                          {product.name}
                        </h3>
                        <p className="text-white/90 text-sm leading-relaxed line-clamp-3">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>



        </div>
      </main>

      <Footer />
    </div>
  )
}
