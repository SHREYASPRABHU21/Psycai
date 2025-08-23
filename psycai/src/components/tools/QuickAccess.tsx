'use client'

import { AITool } from '@/lib/tools'
import { Clock, Heart } from 'lucide-react'

interface QuickAccessProps {
  recentTools: AITool[]
  favoriteToolIds: string[]
  allTools: AITool[]
  onToolSelect: (tool: AITool) => void
}

export default function QuickAccess({ 
  recentTools, 
  favoriteToolIds, 
  allTools,
  onToolSelect 
}: QuickAccessProps) {
  const favoriteTools = allTools.filter(tool => favoriteToolIds.includes(tool.id))

  if (recentTools.length === 0 && favoriteTools.length === 0) {
    return null
  }

  return (
    <div className="mb-8 space-y-6">
      {/* Recent Tools */}
      {recentTools.length > 0 && (
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Clock className="w-5 h-5 text-text/60" />
            <h3 className="text-lg font-semibold text-text">Recently Used</h3>
          </div>
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {recentTools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => onToolSelect(tool)}
                className="flex-shrink-0 flex items-center space-x-3 p-3 bg-white rounded-xl border border-gray-200 hover:border-primary/50 hover:shadow-md transition-all duration-200 min-w-[200px]"
              >
                <span className="text-2xl">{tool.icon}</span>
                <div className="text-left">
                  <div className="font-medium text-text">{tool.name}</div>
                  <div className="text-sm text-text/60 truncate">{tool.category}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Favorite Tools */}
      {favoriteTools.length > 0 && (
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Heart className="w-5 h-5 text-red-500" />
            <h3 className="text-lg font-semibold text-text">Favorites</h3>
          </div>
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {favoriteTools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => onToolSelect(tool)}
                className="flex-shrink-0 flex items-center space-x-3 p-3 bg-white rounded-xl border border-gray-200 hover:border-primary/50 hover:shadow-md transition-all duration-200 min-w-[200px]"
              >
                <span className="text-2xl">{tool.icon}</span>
                <div className="text-left">
                  <div className="font-medium text-text">{tool.name}</div>
                  <div className="text-sm text-text/60 truncate">{tool.category}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
