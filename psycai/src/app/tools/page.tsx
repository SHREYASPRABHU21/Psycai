'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import UserProfile from '@/components/auth/UserProfile'
import Footer from '@/components/layout/Footer'
import { Search, Star, Users, ExternalLink } from 'lucide-react'
import { trackPageView, trackToolClick, trackSearch, trackCategoryFilter } from '@/lib/analytics'
import { fetchTools } from '@/lib/supabase-tools'
import { Tool } from '@/lib/supabase'

const categories = ['All', 'Writing', 'Design', 'Audio', 'Development', 'Analytics', 'Media']

export default function ToolsPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [tools, setTools] = useState<Tool[]>([])
  const [filteredTools, setFilteredTools] = useState<Tool[]>([])
  const [toolsLoading, setToolsLoading] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    trackPageView('Tools Page', 'AI Applications')
    loadTools()
  }, [])

  const loadTools = async () => {
    setToolsLoading(true)
    const fetchedTools = await fetchTools()
    setTools(fetchedTools)
    setFilteredTools(fetchedTools)
    setToolsLoading(false)
  }

  useEffect(() => {
    let filtered = tools

    if (selectedCategory !== 'All') {
      filtered = tools.filter(tool => tool.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(tool => 
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
      
      trackSearch(searchTerm, filtered.length)
    }

    setFilteredTools(filtered)
  }, [tools, searchTerm, selectedCategory])

  const handleToolClick = (tool: Tool) => {
    trackToolClick(tool.name, tool.category)
    window.open(tool.link, '_blank')
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
      <header className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <span className="text-xl font-bold text-gray-900">PsycAi</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-gray-600 hover:text-gray-900 transition-colors">Home</a>
              <a href="/blog" className="text-gray-600 hover:text-gray-900 transition-colors">Blog</a>
              <a href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
            </nav>
            <UserProfile />
          </div>
        </div>
      </header>

      {/* Header Text */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">AI Applications</h1>
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
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-base"
              />
            </div>

            <div className="flex flex-wrap gap-4">
              {categories.map((category) => (
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

          {/* Tools Grid */}
          <div className="p-8">
            {toolsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 h-64 rounded-lg mb-4"></div>
                    <div className="bg-gray-200 h-4 rounded mb-2"></div>
                    <div className="bg-gray-200 h-3 rounded"></div>
                  </div>
                ))}
              </div>
            ) : filteredTools.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
                <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTools.map((tool) => (
                  <div
                    key={tool.id}
                    onClick={() => handleToolClick(tool)}
                    className="group relative rounded-2xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <div className="aspect-[4/3] relative">
                      <img
                        src={tool.image}
                        alt={tool.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/50"></div>
                      
                      {/* Content Overlay */}
                      <div className="absolute inset-0 p-6 flex flex-col justify-between">
                        
                        {/* Stats */}
                        <div className="flex justify-between items-start">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center text-white/90">
                              <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                              <span className="text-xs font-medium">{tool.rating}</span>
                            </div>
                            <div className="flex items-center text-white/90">
                              <Users className="w-3 h-3 mr-1" />
                              <span className="text-xs">{tool.users}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white">
                              {tool.category}
                            </span>
                            <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                              <ExternalLink className="w-3 h-3 text-white" />
                            </div>
                          </div>
                        </div>

                        {/* Tool Info */}
                        <div>
                          <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-yellow-200 transition-colors">
                            {tool.name}
                          </h3>
                          <p className="text-white/90 text-sm leading-relaxed">
                            {tool.description}
                          </p>
                        </div>
                      </div>

                      {/* Hover Effect */}
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
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
