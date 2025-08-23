'use client'

import { useState } from 'react'
import { AITool } from '@/lib/tools'
import { 
  ExternalLink, 
  Github, 
  Download, 
  Calendar, 
  Code, 
  Play,
  BookOpen,
  Sparkles,
  Clock
} from 'lucide-react'

interface ToolCardProps {
  tool: AITool
  variant?: 'minimal' | 'elevated' | 'glass'
  onToolSelect?: (tool: AITool) => void
}

export default function ToolCard({ 
  tool, 
  variant = 'elevated',
  onToolSelect 
}: ToolCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'live':
        return <span className="badge-new">Live</span>
      case 'beta':
        return <span className="badge-beta">Beta</span>
      case 'coming-soon':
        return <span className="badge-coming-soon">Coming Soon</span>
      default:
        return null
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    })
  }

  const cardClass = `card-${variant} cursor-pointer`

  return (
    <div 
      className={`${cardClass} h-full flex flex-col group`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onToolSelect?.(tool)}
    >
      <div className="space-card flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className={`
              w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 
              flex items-center justify-center text-2xl transition-transform duration-300
              ${isHovered ? 'scale-110' : 'scale-100'}
            `}>
              {tool.icon}
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-xl font-semibold text-text group-hover:gradient-text transition-all duration-300">
                  {tool.name}
                </h3>
                {getStatusBadge(tool.status)}
              </div>
              <p className="text-caption text-text-lighter">
                v{tool.version}
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-body text-text-light mb-6 flex-1 leading-relaxed">
          {tool.description}
        </p>

        {/* Technologies */}
        <div className="mb-6">
          <p className="text-caption text-text-lighter mb-3">Built With</p>
          <div className="flex flex-wrap gap-2">
            {tool.technologies.slice(0, 3).map((tech, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-gradient-to-r from-primary/5 to-secondary/5 text-text text-sm rounded-full border border-primary/10"
              >
                {tech}
              </span>
            ))}
            {tool.technologies.length > 3 && (
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                +{tool.technologies.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6 pt-4 border-t border-gray-100">
          <div>
            <div className="flex items-center space-x-2 text-text-lighter mb-1">
              <Calendar className="w-3 h-3" />
              <span className="text-caption">Released</span>
            </div>
            <p className="text-sm font-medium text-text">
              {formatDate(tool.releaseDate)}
            </p>
          </div>
          {tool.downloadCount && (
            <div>
              <div className="flex items-center space-x-2 text-text-lighter mb-1">
                <Download className="w-3 h-3" />
                <span className="text-caption">Downloads</span>
              </div>
              <p className="text-sm font-medium text-text">
                {tool.downloadCount.toLocaleString()}
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2">
            {tool.demoUrl && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(tool.demoUrl, '_blank')
                }}
                className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                title="Try Demo"
              >
                <Play className="w-4 h-4" />
              </button>
            )}
            {tool.githubUrl && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(tool.githubUrl, '_blank')
                }}
                className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                title="View Source"
              >
                <Github className="w-4 h-4" />
              </button>
            )}
            {tool.documentationUrl && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(tool.documentationUrl, '_blank')
                }}
                className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                title="Documentation"
              >
                <BookOpen className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation()
              onToolSelect?.(tool)
            }}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300
              ${tool.status === 'live' || tool.status === 'beta'
                ? 'btn-primary'
                : 'bg-gray-100 text-gray-500 cursor-not-allowed'
              }
            `}
            disabled={tool.status === 'coming-soon'}
          >
            {tool.status === 'coming-soon' ? (
              <>
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">Soon</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Explore</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
