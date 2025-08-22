'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import UserProfile from '@/components/auth/UserProfile'
import { Search, Star, Users } from 'lucide-react'

// Mock tools data
const toolsData = [
  {
    id: 1,
    name: 'AI Text Generator',
    description: 'Generate high-quality content with advanced AI',
    category: 'Writing',
    rating: 4.8,
    users: '12.5k',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop&crop=smart',
    gradient: 'from-blue-600/80 to-indigo-800/80'
  },
  {
    id: 2,
    name: 'Image Creator',
    description: 'Create stunning visuals with AI-powered design',
    category: 'Design',
    rating: 4.9,
    users: '8.2k',
    image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=600&h=400&fit=crop&crop=smart',
    gradient: 'from-purple-600/80 to-pink-800/80'
  },
  {
    id: 3,
    name: 'Voice Assistant',
    description: 'Convert speech to text with high accuracy',
    category: 'Audio',
    rating: 4.7,
    users: '15.3k',
    image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=600&h=400&fit=crop&crop=smart',
    gradient: 'from-green-600/80 to-emerald-800/80'
  },
  {
    id: 4,
    name: 'Code Generator',
    description: 'Generate and optimize code across languages',
    category: 'Development',
    rating: 4.6,
    users: '9.8k',
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&h=400&fit=crop&crop=smart',
    gradient: 'from-orange-600/80 to-red-800/80'
  },
  {
    id: 5,
    name: 'Data Analyzer',
    description: 'Analyze and visualize complex datasets',
    category: 'Analytics',
    rating: 4.5,
    users: '6.7k',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=smart',
    gradient: 'from-cyan-600/80 to-blue-800/80'
  },
  {
    id: 6,
    name: 'Video Editor',
    description: 'Edit and enhance videos with AI assistance',
    category: 'Media',
    rating: 4.8,
    users: '11.2k',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=400&fit=crop&crop=smart',
    gradient: 'from-violet-600/80 to-purple-800/80'
  },
  {
    id: 7,
    name: 'Chat Assistant',
    description: 'Intelligent conversational AI for any task',
    category: 'Writing',
    rating: 4.9,
    users: '20.1k',
    image: 'https://images.unsplash.com/photo-1676299081847-824916de030a?w=600&h=400&fit=crop&crop=smart',
    gradient: 'from-indigo-600/80 to-blue-800/80'
  },
  {
    id: 8,
    name: 'Photo Enhancer',
    description: 'Enhance and upscale photos automatically',
    category: 'Design',
    rating: 4.7,
    users: '13.5k',
    image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=600&h=400&fit=crop&crop=smart',
    gradient: 'from-teal-600/80 to-green-800/80'
  }
]

const categories = ['All', 'Writing', 'Design', 'Audio', 'Development', 'Analytics', 'Media']

export default function ToolsPage() {
  const { user, userData, loading } = useAuth()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [filteredTools, setFilteredTools] = useState(toolsData)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    let filtered = toolsData

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(tool => tool.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(tool => 
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredTools(filtered)
  }, [searchTerm, selectedCategory])

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
            
            {/* Logo */}
            <div className="flex items-center">
              <span className="text-xl font-bold text-gray-900">PsycAi</span>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-gray-600 hover:text-gray-900 transition-colors">Home</a>
              <a href="/blog" className="text-gray-600 hover:text-gray-900 transition-colors">Blog</a>
              <a href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
            </nav>

            {/* User Profile */}
            <UserProfile />
          </div>
        </div>
      </header>

      {/* Header Text */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            AI Applications
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover powerful AI applications to boost your productivity and creativity
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        
        {/* Tools Container Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          
          {/* Search and Categories */}
          <div className="p-8 border-b border-gray-100">
            
            {/* Search Bar */}
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

            {/* Categories */}
            <div className="flex flex-wrap gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
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
            {filteredTools.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
                <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredTools.map((tool) => (
                  <div
                    key={tool.id}
                    className="group relative rounded-2xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {/* Background Image */}
                    <div className="aspect-[4/3] relative">
                      <img
                        src={tool.image}
                        alt={tool.name}
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${tool.gradient}`}></div>
                      
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
                          <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white">
                            {tool.category}
                          </span>
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

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <span className="text-xl font-bold text-gray-900">PsycAi</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Discover and explore the best AI applications to enhance your productivity, 
                creativity, and workflow. Join thousands of users already benefiting from our curated collection.
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>{filteredTools.length}+ Applications</span>
                <span>•</span>
                <span>50k+ Active Users</span>
                <span>•</span>
                <span>4.8★ Average Rating</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
              <div className="space-y-3">
                <a href="/" className="block text-sm text-gray-600 hover:text-gray-900">Home</a>
                <a href="/tools" className="block text-sm text-gray-600 hover:text-gray-900">Applications</a>
                <a href="/blog" className="block text-sm text-gray-600 hover:text-gray-900">Blog</a>
                <a href="/contact" className="block text-sm text-gray-600 hover:text-gray-900">Contact</a>
              </div>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
              <div className="space-y-3">
                <a href="/help" className="block text-sm text-gray-600 hover:text-gray-900">Help Center</a>
                <a href="/privacy" className="block text-sm text-gray-600 hover:text-gray-900">Privacy Policy</a>
                <a href="/terms" className="block text-sm text-gray-600 hover:text-gray-900">Terms of Service</a>
                <a href="/feedback" className="block text-sm text-gray-600 hover:text-gray-900">Feedback</a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-500 mb-4 md:mb-0">
                © 2025 PsycAi. All rights reserved.
              </p>
              <div className="flex items-center space-x-6">
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <span className="sr-only">GitHub</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
