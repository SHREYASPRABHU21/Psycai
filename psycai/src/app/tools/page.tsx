'use client'

import { useState, useEffect } from 'react'
import Layout from '@/components/layout/Layout'
import { myAITools, toolCategories, AITool } from '@/lib/aiTools'
import { 
  Sparkles, 
  Code2, 
  Zap, 
  Search, 
  ArrowUpRight,
  Play,
  ExternalLink,
  Calendar,
  Users,
  TrendingUp,
  Shield
} from 'lucide-react'

export default function ToolsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredTools, setFilteredTools] = useState<AITool[]>(myAITools)

  useEffect(() => {
    let tools = myAITools

    if (selectedCategory !== 'all') {
      tools = tools.filter(tool => tool.category === selectedCategory)
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      tools = tools.filter(tool => 
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.technologies.some(tech => tech.toLowerCase().includes(query))
      )
    }

    setFilteredTools(tools)
  }, [selectedCategory, searchQuery])

  const getToolImage = (toolId: string) => {
    // Generate unique gradient based on tool ID
    const gradients = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    ]
    const index = toolId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % gradients.length
    return gradients[index]
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
                      <Code2 className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <span className="text-label text-stone">PsycAi Platform</span>
                      <div className="text-title infinity-gradient font-bold">Professional AI Tools</div>
                    </div>
                  </div>
                  
                  <h1 className="text-hero">
                    <span className="infinity-gradient">Enterprise</span>
                    <br />
                    <span className="growth-gradient">AI Solutions</span>
                  </h1>
                  
                  <p className="text-body-lg text-slate max-w-3xl leading-relaxed">
                    Discover our comprehensive suite of AI-powered tools designed for modern businesses. 
                    From content creation to data analysis, we provide the intelligent solutions your team needs to excel.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-6 pt-6">
                  <div className="text-center lg:text-left">
                    <div className="text-display infinity-gradient font-bold mb-2">25K+</div>
                    <div className="text-caption text-stone">Active Users</div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-display growth-gradient font-bold mb-2">99.9%</div>
                    <div className="text-caption text-stone">Uptime</div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-display infinity-gradient font-bold mb-2">Enterprise</div>
                    <div className="text-caption text-stone">Ready</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="card-flow p-8 float-animation">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-label text-infinity">Platform Highlight</span>
                      <Sparkles className="w-5 h-5 text-growth" />
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-title text-obsidian">
                        Leading AI Innovation
                      </h3>
                      <p className="text-body text-slate">
                        Our flagship tools power businesses worldwide with intelligent automation and insights...
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <div className="flex items-center space-x-3 text-xs text-stone">
                        <span>Enterprise Grade</span>
                        <span>•</span>
                        <span>24/7 Support</span>
                      </div>
                      <button className="btn-minimal">
                        Learn More
                        <ArrowUpRight className="w-4 h-4 ml-2" />
                      </button>
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
            <div className="card-organic p-8">
              <div className="grid lg:grid-cols-4 gap-8">
                
                <div className="lg:col-span-2 space-y-4">
                  <label className="text-label text-stone">Discover Solutions</label>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone" />
                    <input
                      type="text"
                      placeholder="Search by name, technology, or use case..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-snow border-2 border-mist rounded-2xl focus:border-infinity focus:outline-none transition-all text-body"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-label text-stone">Solution Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-4 bg-snow border-2 border-mist rounded-2xl focus:border-infinity focus:outline-none transition-all text-body"
                  >
                    {toolCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-4">
                  <label className="text-label text-stone">Results</label>
                  <div className="flex items-center justify-center h-14 bg-gradient-infinity rounded-2xl text-white">
                    <span className="text-title font-bold">{filteredTools.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tools Grid - 2 per row with image cards */}
        <section className="pb-16">
          <div className="container mx-auto px-6">
            {filteredTools.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-mist rounded-full flex items-center justify-center mx-auto mb-8">
                  <Search className="w-12 h-12 text-stone" />
                </div>
                <h3 className="text-headline text-obsidian mb-4">No solutions found</h3>
                <p className="text-body text-slate mb-8">
                  Try adjusting your search or explore different categories
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('all')
                  }}
                  className="btn-growth"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid lg:grid-cols-2 gap-8">
                {filteredTools.map((tool, index) => (
                  <ToolImageCard key={tool.id} tool={tool} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-snow to-paper">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-display infinity-gradient">
                  Enterprise Solutions
                </h2>
                <p className="text-body text-slate leading-relaxed">
                  Ready to scale? Our enterprise platform offers advanced features, dedicated support, 
                  and custom integrations for growing businesses.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="btn-infinity">
                    <Users className="w-5 h-5 mr-2" />
                    Contact Sales
                  </button>
                  <button className="btn-growth">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    View Pricing
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="card-minimal p-6 text-center hover-lift">
                  <Shield className="w-8 h-8 text-infinity mx-auto mb-4" />
                  <div className="text-title text-obsidian mb-2">SOC 2</div>
                  <div className="text-caption text-slate">Compliant</div>
                </div>
                <div className="card-minimal p-6 text-center hover-lift">
                  <Users className="w-8 h-8 text-growth mx-auto mb-4" />
                  <div className="text-title text-obsidian mb-2">24/7</div>
                  <div className="text-caption text-slate">Support</div>
                </div>
                <div className="card-minimal p-6 text-center hover-lift">
                  <Zap className="w-8 h-8 text-infinity mx-auto mb-4" />
                  <div className="text-title text-obsidian mb-2">99.9%</div>
                  <div className="text-caption text-slate">Uptime SLA</div>
                </div>
                <div className="card-minimal p-6 text-center hover-lift">
                  <Code2 className="w-8 h-8 text-growth mx-auto mb-4" />
                  <div className="text-title text-obsidian mb-2">API</div>
                  <div className="text-caption text-slate">First Design</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

// Tool Image Card Component - 2 per row with image backgrounds
function ToolImageCard({ tool }: { tool: AITool }) {
  const getToolImage = (toolId: string) => {
    const gradients = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    ]
    const index = toolId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % gradients.length
    return gradients[index]
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-success'
      case 'beta': return 'bg-warning'
      case 'coming-soon': return 'bg-infinity'
      default: return 'bg-stone'
    }
  }

  return (
    <div className="tool-card-image hover-lift group cursor-pointer">
      <div 
        className="absolute inset-0 rounded-2xl"
        style={{ background: getToolImage(tool.id) }}
      />
      
      <div className="tool-card-overlay">
        {/* Top Section */}
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-4xl">{tool.icon}</div>
              <div>
                <h3 className="text-title text-white font-bold group-hover:text-yellow-200 transition-colors">
                  {tool.name}
                </h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full text-white ${getStatusColor(tool.status)}`}>
                    {tool.status.replace('-', ' ').toUpperCase()}
                  </span>
                  <span className="text-xs text-white/80">v{tool.version}</span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-white/90 font-medium">
                {new Date(tool.releaseDate).getFullYear()}
              </div>
            </div>
          </div>

          <p className="text-white/90 text-sm leading-relaxed">
            {tool.description}
          </p>

          {tool.downloadCount && (
            <div className="flex items-center space-x-2 text-white/80">
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">
                {tool.downloadCount.toLocaleString()} users
              </span>
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {tool.technologies.slice(0, 2).map((tech, i) => (
              <span key={i} className="px-2 py-1 bg-white/20 text-white text-xs rounded-full backdrop-blur-sm">
                {tech}
              </span>
            ))}
            {tool.technologies.length > 2 && (
              <span className="px-2 py-1 bg-white/20 text-white text-xs rounded-full backdrop-blur-sm">
                +{tool.technologies.length - 2}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {tool.demoUrl && (
              <button className="p-2 bg-white/20 text-white rounded-lg hover:bg-white/30 hover:scale-110 transition-all backdrop-blur-sm">
                <Play className="w-4 h-4" />
              </button>
            )}
            <button className="p-2 bg-white text-gray-900 rounded-lg hover:scale-110 transition-all">
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
