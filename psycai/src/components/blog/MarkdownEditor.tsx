'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import { Eye, Edit, FileText, HelpCircle } from 'lucide-react'

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  height?: number
}

export default function MarkdownEditor({ 
  value, 
  onChange, 
  placeholder = 'Start writing your blog post...',
  height = 400
}: MarkdownEditorProps) {
  const [mode, setMode] = useState<'edit' | 'preview' | 'split'>('split')
  const [showHelp, setShowHelp] = useState(false)

  const markdownHelp = `
# Markdown Quick Reference

## Headers
# H1
## H2
### H3

## Text Formatting
**bold text**
*italic text*
~~strikethrough~~

## Lists
- Bullet point
- Another point

1. Numbered list
2. Another item

## Links & Images
[Link text](https://example.com)
![Image alt](image-url)

## Code
\`inline code\`

\`\`\`javascript
code block
\`\`\`

## Quotes
> This is a quote

## Tables
| Header | Header |
|--------|--------|
| Cell   | Cell   |
  `

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      {/* Editor Header */}
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Markdown Editor</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowHelp(!showHelp)}
              className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
              title="Markdown Help"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
            
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setMode('edit')}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                  mode === 'edit' 
                    ? 'bg-primary text-white' 
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Edit className="w-3 h-3 mr-1 inline" />
                Edit
              </button>
              <button
                onClick={() => setMode('preview')}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                  mode === 'preview' 
                    ? 'bg-primary text-white' 
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Eye className="w-3 h-3 mr-1 inline" />
                Preview
              </button>
              <button
                onClick={() => setMode('split')}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                  mode === 'split' 
                    ? 'bg-primary text-white' 
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                Split
              </button>
            </div>
          </div>
        </div>

        {/* Help Section */}
        {showHelp && (
          <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <pre className="text-xs text-blue-800 whitespace-pre-wrap font-mono">
              {markdownHelp}
            </pre>
          </div>
        )}
      </div>

      {/* Editor Content */}
      <div className="flex" style={{ height }}>
        {/* Editor Pane */}
        {(mode === 'edit' || mode === 'split') && (
          <div className={`${mode === 'split' ? 'w-1/2' : 'w-full'} flex flex-col`}>
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="flex-1 p-4 border-0 resize-none focus:outline-none font-mono text-sm leading-relaxed"
              style={{ minHeight: height }}
            />
          </div>
        )}

        {/* Divider */}
        {mode === 'split' && (
          <div className="w-px bg-gray-200" />
        )}

        {/* Preview Pane */}
        {(mode === 'preview' || mode === 'split') && (
          <div className={`${mode === 'split' ? 'w-1/2' : 'w-full'} overflow-y-auto`}>
            <div className="p-4">
              {value ? (
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkBreaks]}
                    components={{
                      h1: ({ children }) => (
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">{children}</h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className="text-xl font-bold text-gray-900 mb-3 mt-6">{children}</h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 mt-4">{children}</h3>
                      ),
                      p: ({ children }) => (
                        <p className="text-gray-700 mb-4 leading-relaxed">{children}</p>
                      ),
                      a: ({ href, children }) => (
                        <a 
                          href={href} 
                          className="text-primary hover:text-primary-dark underline"
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          {children}
                        </a>
                      ),
                      ul: ({ children }) => (
                        <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>
                      ),
                      li: ({ children }) => (
                        <li className="text-gray-700">{children}</li>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-primary pl-4 py-2 my-4 bg-primary/5 rounded-r">
                          {children}
                        </blockquote>
                      ),
                      code: ({ children }) => (
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-red-600">
                          {children}
                        </code>
                      ),
                      pre: ({ children }) => (
                        <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mb-4 text-sm">
                          {children}
                        </pre>
                      ),
                      table: ({ children }) => (
                        <table className="min-w-full divide-y divide-gray-200 mb-4">
                          {children}
                        </table>
                      ),
                      th: ({ children }) => (
                        <th className="px-3 py-2 bg-gray-50 text-left text-sm font-medium text-gray-900 border border-gray-200">
                          {children}
                        </th>
                      ),
                      td: ({ children }) => (
                        <td className="px-3 py-2 text-sm text-gray-700 border border-gray-200">
                          {children}
                        </td>
                      ),
                    }}
                  >
                    {value}
                  </ReactMarkdown>
                </div>
              ) : (
                <div className="text-gray-400 text-center py-12">
                  <FileText className="w-12 h-12 mx-auto mb-4" />
                  <p>Start writing to see preview...</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
