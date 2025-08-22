'use client'

import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import { BlogCategory, Blog } from '@/types/blog'
import { 
  Calendar, 
  Tag, 
  ArrowLeft, 
  Share2, 
  Copy, 
  Check,
  Clock,
  User,
  BookOpen,
  Heart,
  MessageCircle,
  Sparkles
} from 'lucide-react'
import Link from 'next/link'

interface BlogContentProps {
  blog: Blog
  category?: BlogCategory
}

export default function BlogContent({ blog, category }: BlogContentProps) {
  const [copied, setCopied] = useState(false)
  const [readingTime, setReadingTime] = useState(0)

  useEffect(() => {
    // Calculate reading time (average 200 words per minute)
    const wordCount = blog.content.split(' ').length
    const time = Math.ceil(wordCount / 200)
    setReadingTime(time)
  }, [blog.content])

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
    <div className="min-h-screen bg-gradient-to-br from-paper via-snow to-paper">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-organic opacity-20" />
        
        <div className="container mx-auto px-6 relative">
          {/* Back Button */}
          <div className="mb-12">
            <Link 
              href="/blog"
              className="inline-flex items-center text-stone hover:text-infinity transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Garden
            </Link>
          </div>

          <div className="grid lg:grid-cols-12 gap-16">
            
            {/* Main Content Header */}
            <div className="lg:col-span-8 space-y-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  {category && (
                    <span 
                      className="px-4 py-2 text-sm font-medium rounded-full text-white"
                      style={{ backgroundColor: category.color }}
                    >
                      {category.name}
                    </span>
                  )}
                  <div className="flex items-center space-x-4 text-stone">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <time dateTime={blog.created_at}>
                        {formatDate(blog.created_at)}
                      </time>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{readingTime} min read</span>
                    </div>
                  </div>
                </div>
                
                <h1 className="text-hero text-obsidian leading-tight">
                  {blog.title}
                </h1>
                
                {blog.excerpt && (
                  <p className="text-body-lg text-slate leading-relaxed max-w-3xl">
                    {blog.excerpt}
                  </p>
                )}
              </div>

              {/* Tags */}
              {blog.tags.length > 0 && (
                <div className="flex items-center space-x-4 pt-6 border-t border-mist">
                  <Tag className="w-5 h-5 text-stone" />
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-snow text-stone rounded-full text-sm hover:bg-infinity hover:text-white transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Actions */}
            <div className="lg:col-span-4">
              <div className="card-flow p-8 sticky top-32">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-infinity rounded-full flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-title text-obsidian">Story Stats</div>
                      <div className="text-caption text-stone">{readingTime} minute journey</div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-mist">
                    <button
                      onClick={handleShare}
                      className="w-full flex items-center justify-center space-x-3 p-4 bg-snow hover:bg-infinity hover:text-white rounded-xl transition-all duration-300 group"
                    >
                      {copied ? (
                        <>
                          <Check className="w-5 h-5 text-success" />
                          <span className="text-success">Copied to clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-5 h-5 group-hover:text-white" />
                          <span>Share this story</span>
                        </>
                      )}
                    </button>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-3 bg-snow rounded-xl">
                        <Heart className="w-6 h-6 text-stone mx-auto mb-2" />
                        <div className="text-caption text-stone">Like</div>
                      </div>
                      <div className="text-center p-3 bg-snow rounded-xl">
                        <MessageCircle className="w-6 h-6 text-stone mx-auto mb-2" />
                        <div className="text-caption text-stone">Discuss</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <article className="card-organic p-12 prose-custom">
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkBreaks]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-display text-obsidian mb-8 mt-12 first:mt-0 leading-tight">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-headline text-obsidian mb-6 mt-10 leading-tight border-l-4 border-infinity pl-6">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-title text-obsidian mb-4 mt-8 leading-tight">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-body text-slate leading-relaxed mb-6">
                      {children}
                    </p>
                  ),
                  a: ({ href, children }) => (
                    <a 
                      href={href} 
                      className="text-infinity hover:text-growth underline decoration-2 underline-offset-4 transition-colors" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {children}
                    </a>
                  ),
                  ul: ({ children }) => (
                    <ul className="space-y-3 mb-8 ml-6">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="space-y-3 mb-8 ml-6 list-decimal">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-body text-slate leading-relaxed relative">
                      <span className="absolute -left-6 top-2 w-2 h-2 bg-infinity rounded-full" />
                      {children}
                    </li>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-growth pl-8 py-6 my-8 bg-growth/5 rounded-r-2xl">
                      <div className="text-body-lg text-slate italic leading-relaxed">
                        {children}
                      </div>
                    </blockquote>
                  ),
                  code: ({ children }) => (
                    <code className="bg-snow px-3 py-1 rounded-lg text-sm font-mono text-infinity border border-mist">
                      {children}
                    </code>
                  ),
                  pre: ({ children }) => (
                    <pre className="bg-obsidian text-snow p-8 rounded-2xl overflow-x-auto mb-8 border-l-4 border-infinity">
                      <code className="text-sm font-mono leading-relaxed">
                        {children}
                      </code>
                    </pre>
                  ),
                  table: ({ children }) => (
                    <div className="overflow-x-auto my-8">
                      <table className="min-w-full border border-mist rounded-2xl overflow-hidden">
                        {children}
                      </table>
                    </div>
                  ),
                  thead: ({ children }) => (
                    <thead className="bg-infinity text-white">
                      {children}
                    </thead>
                  ),
                  th: ({ children }) => (
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="px-6 py-4 text-sm text-slate border-t border-mist">
                      {children}
                    </td>
                  ),
                  hr: () => (
                    <div className="my-12 flex items-center justify-center">
                      <div className="flex space-x-2">
                        <Sparkles className="w-6 h-6 text-infinity" />
                        <Sparkles className="w-4 h-4 text-growth mt-1" />
                        <Sparkles className="w-6 h-6 text-infinity" />
                      </div>
                    </div>
                  ),
                  img: ({ src, alt }) => (
                    <div className="my-10 text-center">
                      <img 
                        src={src} 
                        alt={alt} 
                        className="max-w-full h-auto rounded-2xl shadow-gentle mx-auto border border-mist" 
                      />
                      {alt && (
                        <p className="text-caption text-stone mt-4 italic">{alt}</p>
                      )}
                    </div>
                  ),
                }}
              >
                {blog.content}
              </ReactMarkdown>
            </article>
          </div>
        </div>
      </section>

      {/* Author Section */}
      <section className="py-16 bg-snow">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="card-flow p-8">
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-gradient-infinity rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                
                <div className="flex-1">
                  <div className="text-title text-obsidian mb-2">Written in the PsycAi Garden</div>
                  <p className="text-body text-slate leading-relaxed">
                    This story grew from curiosity and experimentation in the infinite garden of AI possibilities. 
                    Each post represents a step in the journey of technological discovery.
                  </p>
                </div>
                
                <Link href="/blog" className="btn-infinity">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  More Stories
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
