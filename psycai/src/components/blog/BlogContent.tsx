'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import { BlogCategory, Blog } from '@/types/blog'
import { Calendar, Tag, ArrowLeft, Share2, Copy, Check } from 'lucide-react'
import Link from 'next/link'

interface BlogContentProps {
  blog: Blog
  category?: BlogCategory
}

export default function BlogContent({ blog, category }: BlogContentProps) {
  const [copied, setCopied] = useState(false)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleShare = async () => {
    const url = window.location.href
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.excerpt || '',
          url: url
        })
      } catch (err) {
        copyToClipboard(url)
      }
    } else {
      copyToClipboard(url)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link 
            href="/blog"
            className="inline-flex items-center text-text/60 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>

        {/* Article */}
        <article className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                {category && (
                  <span 
                    className="px-3 py-1 text-sm font-medium rounded-full text-white"
                    style={{ backgroundColor: category.color }}
                  >
                    {category.name}
                  </span>
                )}
                <div className="flex items-center text-text/60">
                  <Calendar className="w-4 h-4 mr-2" />
                  <time dateTime={blog.created_at}>
                    {formatDate(blog.created_at)}
                  </time>
                </div>
              </div>

              <button
                onClick={handleShare}
                className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:border-primary/50 hover:shadow-md transition-all duration-200"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-green-600">Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </>
                )}
              </button>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-text mb-4 leading-tight">
              {blog.title}
            </h1>

            {blog.excerpt && (
              <p className="text-xl text-text/70 leading-relaxed">
                {blog.excerpt}
              </p>
            )}

            {/* Tags */}
            {blog.tags.length > 0 && (
              <div className="flex items-center mt-6 pt-6 border-t border-gray-200">
                <Tag className="w-4 h-4 text-text/40 mr-3" />
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </header>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkBreaks]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-3xl font-bold text-text mb-6 mt-8 first:mt-0">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-semibold text-text mb-4 mt-8">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-semibold text-text mb-3 mt-6">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-text/80 leading-relaxed mb-4">
                      {children}
                    </p>
                  ),
                  a: ({ href, children }) => (
                    <a 
                      href={href} 
                      className="text-primary hover:text-primary-dark underline decoration-2 underline-offset-2" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {children}
                    </a>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside mb-6 space-y-2 ml-4">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside mb-6 space-y-2 ml-4">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-text/80 leading-relaxed">{children}</li>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-primary pl-6 py-4 my-6 bg-primary/5 rounded-r-lg italic">
                      {children}
                    </blockquote>
                  ),
                  code: ({ children }) => (
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-red-600 border">
                      {children}
                    </code>
                  ),
                  pre: ({ children }) => (
                    <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto mb-6 border">
                      <code className="text-sm">{children}</code>
                    </pre>
                  ),
                  table: ({ children }) => (
                    <div className="overflow-x-auto my-6">
                      <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                        {children}
                      </table>
                    </div>
                  ),
                  thead: ({ children }) => (
                    <thead className="bg-gray-50">{children}</thead>
                  ),
                  th: ({ children }) => (
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">
                      {children}
                    </td>
                  ),
                  hr: () => (
                    <hr className="my-8 border-t-2 border-gray-200" />
                  ),
                  img: ({ src, alt }) => (
                    <img 
                      src={src} 
                      alt={alt} 
                      className="max-w-full h-auto rounded-lg shadow-md my-6 mx-auto" 
                    />
                  ),
                }}
              >
                {blog.content}
              </ReactMarkdown>
            </div>
          </div>
        </article>

        {/* Back to Blog */}
        <div className="text-center mt-12">
          <Link 
            href="/blog"
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Posts
          </Link>
        </div>
      </div>
    </div>
  )
}
