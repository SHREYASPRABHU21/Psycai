'use client'

import { useState, useEffect, useRef } from 'react'
import { AITool } from '@/lib/aiTools'
import { ExternalLink, RefreshCw, AlertTriangle } from 'lucide-react'

interface SecureIframeProps {
  tool: AITool
  onClose?: () => void
}

export default function SecureIframe({ tool, onClose }: SecureIframeProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    const handleLoad = () => {
      setIsLoading(false)
      setHasError(false)
    }

    const handleError = () => {
      setIsLoading(false)
      setHasError(true)
      setErrorMessage(`Failed to load ${tool.name}. The service may not allow embedding or may be temporarily unavailable.`)
    }

    iframe.addEventListener('load', handleLoad)
    iframe.addEventListener('error', handleError)

    return () => {
      iframe.removeEventListener('load', handleLoad)
      iframe.removeEventListener('error', handleError)
    }
  }, [tool.name])

  const refreshIframe = () => {
    setIsLoading(true)
    setHasError(false)
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src
    }
  }

  const openInNewTab = () => {
    window.open(tool.url, '_blank', 'noopener,noreferrer')
  }

  const sandboxValue = tool.sandboxAttributes.join(' ')
  const allowValue = tool.allowAttributes.join('; ')

  return (
    <div className="h-full flex flex-col bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{tool.icon}</span>
            <div>
              <h2 className="text-lg font-semibold">{tool.name}</h2>
              <p className="text-sm opacity-90">{tool.description}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={refreshIframe}
              className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
              title="Refresh"
              disabled={isLoading}
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            
            <button
              onClick={openInNewTab}
              className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
              title="Open in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
            
            {onClose && (
              <button
                onClick={onClose}
                className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                title="Close"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 relative">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-50 flex items-center justify-center z-10">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-text/60">Loading {tool.name}...</p>
            </div>
          </div>
        )}

        {hasError ? (
          <div className="absolute inset-0 bg-red-50 flex items-center justify-center">
            <div className="text-center max-w-md px-4">
              <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-red-800 mb-2">Unable to Load Tool</h3>
              <p className="text-red-600 mb-4">{errorMessage}</p>
              <div className="space-y-2">
                <button
                  onClick={refreshIframe}
                  className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Try Again
                </button>
                <button
                  onClick={openInNewTab}
                  className="w-full border border-red-600 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
                >
                  Open in New Tab
                </button>
              </div>
            </div>
          </div>
        ) : (
          <iframe
            ref={iframeRef}
            src={tool.url}
            title={tool.name}
            className="w-full h-full border-0"
            sandbox={sandboxValue}
            allow={allowValue}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        )}
      </div>
    </div>
  )
}
