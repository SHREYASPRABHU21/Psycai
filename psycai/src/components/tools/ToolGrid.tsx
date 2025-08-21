'use client'

import { useState } from 'react'
import { AITool } from '@/lib/aiTools'
import { ExternalLink, Star, Lock, Zap } from 'lucide-react'

interface ToolGridProps {
  tools: AITool[]
  onToolSelect: (tool: AITool) => void
  selectedTool?: AITool | null
}

export default function ToolGrid({ tools, onToolSelect, selectedTool }: ToolGridProps) {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null)

  const getPricingBadge = (pricing: string) => {
    switch (pricing) {
      case 'free':
        return { color: 'bg-green-100 text-green-800', text: 'Free' }
      case 'freemium':
        return { color: 'bg-blue-100 text-blue-800', text: 'Freemium' }
      case 'paid':
        return { color: 'bg-purple-100 text-purple-800', text: 'Paid' }
      default:
        return { color: 'bg-gray-100 text-gray-800', text: 'Unknown' }
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool) => {
        const pricingBadge = getPricingBadge(tool.pricing)
        const isSelected = selectedTool?.id === tool.id
        const isHovered = hoveredTool === tool.id

        return (
          <div
            key={tool.id}
            className={`
              relative group cursor-pointer rounded-2xl p-6 transition-all duration-300 border-2
              ${isSelected 
                ? 'border-primary bg-primary/5 shadow-lg transform scale-105' 
                : 'border-gray-200 bg-white hover:border-primary/50 hover:shadow-md'
              }
              ${!tool.isActive ? 'opacity-60 cursor-not-allowed' : ''}
            `}
            onClick={() => tool.isActive && onToolSelect(tool)}
            onMouseEnter={() => setHoveredTool(tool.id)}
            onMouseLeave={() => setHoveredTool(null)}
          >
            {/* Status Indicators */}
            <div className="absolute top-4 right-4 flex items-center space-x-2">
              {tool.requiresAuth && (
                <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center" title="Requires authentication">
                  <Lock className="w-3 h-3 text-orange-600" />
                </div>
              )}
              {tool.pricing === 'paid' && (
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center" title="Premium tool">
                  <Star className="w-3 h-3 text-purple-600" />
                </div>
              )}
              {!tool.isActive && (
                <div className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">
                  Inactive
                </div>
              )}
            </div>

            {/* Tool Icon and Info */}
            <div className="mb-4">
              <div className={`
                text-4xl mb-3 transform transition-transform duration-300
                ${isHovered ? 'scale-110' : 'scale-100'}
              `}>
                {tool.icon}
              </div>
              <h3 className="text-xl font-semibold text-text mb-2">{tool.name}</h3>
              <p className="text-sm text-text/70 mb-4 line-clamp-2">{tool.description}</p>
            </div>

            {/* Features */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {tool.features.slice(0, 3).map((feature, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                  >
                    {feature}
                  </span>
                ))}
                {tool.features.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    +{tool.features.length - 3} more
                  </span>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded-full ${pricingBadge.color}`}>
                  {pricingBadge.text}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    window.open(tool.url, '_blank', 'noopener,noreferrer')
                  }}
                  className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  title="Open in new tab"
                >
                  <ExternalLink className="w-4 h-4 text-gray-600" />
                </button>
                
                {tool.isActive && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onToolSelect(tool)
                    }}
                    className={`
                      px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2
                      ${isSelected
                        ? 'bg-primary text-white'
                        : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'
                      }
                    `}
                  >
                    <Zap className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {isSelected ? 'Active' : 'Launch'}
                    </span>
                  </button>
                )}
              </div>
            </div>

            {/* Hover Effect */}
            {isHovered && tool.isActive && (
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl pointer-events-none" />
            )}
          </div>
        )
      })}
    </div>
  )
}
