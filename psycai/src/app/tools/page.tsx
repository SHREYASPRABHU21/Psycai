'use client'

import { useState, useMemo } from 'react'
import Layout from '@/components/layout/Layout'
import { aiToolsDatabase, toolCategories, AITool } from '@/lib/aiTools'
import ToolGrid from '@/components/tools/ToolGrid'
import CategoryFilter from '@/components/tools/CategoryFilter'
import SecureIframe from '@/components/tools/SecureIframe'
import { Search, Grid, Monitor, Info } from 'lucide-react'

export default function ToolsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTool, setSelectedTool] = useState<AITool | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'iframe'>('grid')

  // Filter tools based on category and search
  const filteredTools = useMemo(() => {
    let tools = aiToolsDatabase

    // Filter by category
    if (selectedCategory !== 'all') {
      tools = tools.filter(tool => tool.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      tools = tools.filter(tool => 
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.features.some(feature => feature.toLowerCase().includes(query))
      )
    }

    return tools
  }, [selectedCategory, searchQuery])

  // Calculate tool counts by category
  const toolCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    
    toolCategories.forEach(category => {
      if (category.id === 'all') {
        counts[category.id] = aiToolsDatabase.length
      } else {
        counts[category.id] = aiToolsDatabase.filter(tool => 
          tool.category === category.id
        ).length
      }
    })

    return counts
  }, [])

  const handleToolSelect = (tool: AITool) => {
    setSelectedTool(tool)
    setViewMode('iframe')
  }

  const handleBackToGrid = () => {
    setViewMode('grid')
    setSelectedTool(null)
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-background via-surface to-primary/5">
        <div className="container mx-auto px-4 py-8">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center">
                <span className="text-2xl">🛠️</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-4">
              AI Tools Hub
            </h1>
            <p className="text-xl text-text/70 max-w-3xl mx-auto">
              Access the best AI tools from one secure platform. Switch between tools seamlessly 
              without losing your workflow or having to manage multiple accounts.
            </p>
          </div>

          {/* View Toggle and Controls */}
          {viewMode === 'grid' && (
            <div className="mb-8 space-y-6">
              {/* Search and View Controls */}
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text/40" />
                  <input
                    type="text"
                    placeholder="Search AI tools..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-text/60">
                    {filteredTools.length} tools found
                  </span>
                </div>
              </div>

              {/* Category Filter */}
              <CategoryFilter
                categories={toolCategories}
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
                toolCounts={toolCounts}
              />
            </div>
          )}

          {/* Content */}
          {viewMode === 'grid' ? (
            <>
              {/* Security Notice */}
              <div className="mb-8 p-6 glass-morphism rounded-2xl border border-primary/20">
                <div className="flex items-start space-x-3">
                  <Info className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-text mb-2">Secure AI Tool Access</h3>
                    <p className="text-text/70 mb-3">
                      All AI tools are embedded securely with proper sandboxing and security headers. 
                      Your data stays protected while you enjoy seamless access to multiple AI platforms.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                        🔒 Sandboxed Iframes
                      </span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        🛡️ CSP Protected
                      </span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                        🔐 Secure Headers
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tool Grid */}
              {filteredTools.length > 0 ? (
                <ToolGrid
                  tools={filteredTools}
                  onToolSelect={handleToolSelect}
                  selectedTool={selectedTool}
                />
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Search className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-text mb-2">No tools found</h3>
                  <p className="text-text/60 mb-6">
                    Try adjusting your search terms or selecting a different category.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedCategory('all')
                    }}
                    className="bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary-dark transition-colors"
                  >
                    Show All Tools
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="h-[80vh]">
              {/* Back Button */}
              <div className="mb-4">
                <button
                  onClick={handleBackToGrid}
                  className="flex items-center space-x-2 text-text/60 hover:text-primary transition-colors"
                >
                  <Grid className="w-4 h-4" />
                  <span>Back to Tools Grid</span>
                </button>
              </div>

              {/* Iframe Container */}
              {selectedTool && (
                <SecureIframe
                  tool={selectedTool}
                  onClose={handleBackToGrid}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
