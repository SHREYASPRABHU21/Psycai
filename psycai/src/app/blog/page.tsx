'use client'

import { useState, useEffect } from 'react'
import Layout from '@/components/layout/Layout'
import Link from 'next/link'
import { getBlogs, getBlogCategories } from '@/lib/blog'
import { Blog, BlogCategory } from '@/types/blog'
import { 
  Search, 
  Calendar, 
  Tag, 
  ArrowUpRight,
  BookOpen,
  Clock,
  User,
  Sparkles,
  TrendingUp
} from 'lucide-react'

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const loadData = async () => {
      setIsLoading(true)
      setError('')
      
      try {
        const [blogsResult, categoriesResult] = await Promise.all([
          getBlogs({ 
            published: true,
            search: searchQuery || undefined,
            category: selectedCategory || undefined
          }),
          getBlogCategories()
        ])

        if (blogsResult.data) setBlogs(blogsResult.data)
        if (categoriesResult.data) setCategories(categoriesResult.data)

      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to load blog data')
      } finally {
        setIsLoading(false)
      }
    }

    const timeoutId = setTimeout(loadData, 100)
    return () => clearTimeout(timeoutId)
  }, [mounted, searchQuery, selectedCategory])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const featuredPost = blogs[0]
  const recentPosts = blogs.slice(1, 4)
  const allPosts = blogs.slice(4)

  if (!mounted || isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-paper via-snow to-paper flex items-center justify-center pt-20">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-infinity rounded-full flex items-center justify-center pulse-glow mx-auto mb-6">
              <BookOpen className="w-8 h-8 text-white animate-pulse" />
            </div>
            <p className="text-body text-slate">Loading insights...</p>
          </div>
        </div>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-paper via-snow to-paper flex items-center justify-center pt-20">
          <div className="text-center max-w-md px-6">
            <div className="text-6xl mb-6">📚</div>
            <h2 className="text-headline text-obsidian mb-4">Content Loading</h2>
            <p className="text-body text-slate mb-6">{error}</p>
            <button onClick={() => window.location.reload()} className="btn-infinity">
              Try Again
            </button>
          </div>
        </div>
      </Layout>
    )
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
                      <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <span className="text-label text-stone">From the Team</span>
                      <div className="text-title infinity-gradient font-bold">PsycAi Insights</div>
                    </div>
                  </div>
                  
                  <h1 className="text-hero">
                    <span className="infinity-gradient">Innovation</span> in
                    <br />
                    <span className="growth-gradient">Action</span>
                  </h1>
                  
                  <p className="text-body-lg text-slate max-w-2xl leading-relaxed">
                    Explore the latest insights from our team of AI researchers, engineers, and product experts. 
                    Discover industry trends, technical deep-dives, and the stories behind our innovations.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-6 pt-6">
                  <div className="text-center lg:text-left">
                    <div className="text-display infinity-gradient font-bold mb-2">{blogs.length}</div>
                    <div className="text-caption text-stone">Articles Published</div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-display growth-gradient font-bold mb-2">{categories.length}</div>
                    <div className="text-caption text-stone">Topic Areas</div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-display infinity-gradient font-bold mb-2">50K+</div>
                    <div className="text-caption text-stone">Monthly Readers</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="card-flow p-8 float-animation">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-label text-infinity">Latest Insights</span>
                      <Sparkles className="w-5 h-5 text-growth" />
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-title text-obsidian">
                        The Future of AI-Powered Business Tools
                      </h3>
                      <p className="text-body text-slate">
                        Exploring how artificial intelligence is reshaping modern business processes and unlocking new levels of productivity...
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <div className="flex items-center space-x-3 text-xs text-stone">
                        <Calendar className="w-3 h-3" />
                        <span>Latest Research</span>
                        <span>•</span>
                        <span>5 min read</span>
                      </div>
                      <button className="btn-minimal">
                        Read Article
                        <ArrowUpRight className="w-4 h-4 ml-2" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search & Filter Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="card-organic p-8">
              <div className="grid lg:grid-cols-4 gap-8">
                
                <div className="lg:col-span-2 space-y-4">
                  <label className="text-label text-stone">Explore Insights</label>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone" />
                    <input
                      type="text"
                      placeholder="Search insights, tutorials, and research..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-snow border-2 border-mist rounded-2xl focus:border-infinity focus:outline-none transition-all text-body"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-label text-stone">Topic Area</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-4 bg-snow border-2 border-mist rounded-2xl focus:border-infinity focus:outline-none transition-all text-body"
                  >
                    <option value="">All Topics</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.slug}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-4">
                  <label className="text-label text-stone">Found</label>
                  <div className="flex items-center justify-center h-14 bg-gradient-infinity rounded-2xl text-white">
                    <span className="text-title font-bold">{blogs.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="py-16">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <span className="text-label text-infinity">Featured Article</span>
                <h2 className="text-display text-obsidian mt-2">From Our Research Lab</h2>
              </div>

              <div className="card-flow p-12 max-w-4xl mx-auto">
                <div className="grid lg:grid-cols-3 gap-12 items-center">
                  <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center space-x-4">
                      {categories.find(c => c.slug === featuredPost.category) && (
                        <span 
                          className="px-4 py-2 rounded-full text-white text-sm font-medium"
                          style={{ backgroundColor: categories.find(c => c.slug === featuredPost.category)?.color }}
                        >
                          {categories.find(c => c.slug === featuredPost.category)?.name}
                        </span>
                      )}
                      <div className="flex items-center space-x-2 text-stone">
                        <Calendar className="w-4 h-4" />
                        <time>{formatDate(featuredPost.created_at)}</time>
                      </div>
                    </div>

                    <h3 className="text-headline text-obsidian leading-tight">
                      {featuredPost.title}
                    </h3>

                    {featuredPost.excerpt && (
                      <p className="text-body text-slate leading-relaxed">
                        {featuredPost.excerpt}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-6">
                      <div className="flex items-center space-x-4">
                        {featuredPost.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="text-caption text-stone bg-snow px-3 py-1 rounded-full">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      
                      <Link href={`/blog/${featuredPost.slug}`} className="btn-infinity">
                        Read Full Article
                        <ArrowUpRight className="w-4 h-4 ml-2" />
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="w-48 h-48 bg-gradient-infinity rounded-full flex items-center justify-center float-animation">
                      <BookOpen className="w-24 h-24 text-white opacity-80" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Recent Posts Grid */}
        {recentPosts.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-display text-obsidian mb-4">Latest Research</h2>
                <p className="text-body text-slate">Fresh insights and discoveries from our AI research team</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {recentPosts.map((post, index) => (
                  <BlogCard key={post.id} post={post} categories={categories} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Posts Archive */}
        {allPosts.length > 0 && (
          <section className="py-16 bg-snow">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-display text-obsidian mb-4">Knowledge Base</h2>
                <p className="text-body text-slate">Comprehensive insights and technical documentation for modern AI implementation</p>
              </div>

              <div className="max-w-4xl mx-auto space-y-6">
                {allPosts.map((post, index) => (
                  <ArchivePostCard key={post.id} post={post} categories={categories} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* No Posts Found */}
        {blogs.length === 0 && (
          <section className="py-24">
            <div className="container mx-auto px-6 text-center">
              <div className="w-24 h-24 bg-mist rounded-full flex items-center justify-center mx-auto mb-8">
                <Search className="w-12 h-12 text-stone" />
              </div>
              <h3 className="text-headline text-obsidian mb-4">Knowledge Base Growing</h3>
              <p className="text-body text-slate mb-8 max-w-md mx-auto">
                Our team is curating valuable insights and technical resources. Check back soon for the latest in AI innovation.
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('')
                  }}
                  className="btn-growth"
                >
                  View All Articles
                </button>
                <Link href="/" className="btn-minimal">
                  Return to Platform
                </Link>
              </div>
            </div>
          </section>
        )}
      </div>
    </Layout>
  )
}

// Blog Card Component
function BlogCard({ post, categories }: { post: Blog; categories: BlogCategory[] }) {
  const categoryObj = categories.find(c => c.slug === post.category)

  return (
    <article className="card-organic p-8 hover-lift group cursor-pointer">
      <Link href={`/blog/${post.slug}`} className="block space-y-6">
        <div className="flex items-center justify-between">
          {categoryObj && (
            <span 
              className="px-3 py-1 text-xs font-medium rounded-full text-white"
              style={{ backgroundColor: categoryObj.color }}
            >
              {categoryObj.name}
            </span>
          )}
          <div className="flex items-center space-x-2 text-stone">
            <Calendar className="w-3 h-3" />
            <time className="text-caption">{new Date(post.created_at).toLocaleDateString()}</time>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-title text-obsidian group-hover:text-infinity transition-colors leading-tight">
            {post.title}
          </h3>
          
          {post.excerpt && (
            <p className="text-body text-slate leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>
          )}
        </div>

        {post.tags.length > 0 && (
          <div className="flex items-center space-x-2">
            <Tag className="w-3 h-3 text-stone" />
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag, i) => (
                <span key={i} className="text-caption text-stone">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center space-x-2 text-caption text-stone">
            <Clock className="w-3 h-3" />
            <span>5 min read</span>
          </div>
          <ArrowUpRight className="w-5 h-5 text-infinity group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </div>
      </Link>
    </article>
  )
}

// Archive Post Card Component
function ArchivePostCard({ post, categories }: { post: Blog; categories: BlogCategory[] }) {
  const categoryObj = categories.find(c => c.slug === post.category)

  return (
    <article className="card-minimal p-6 hover-lift group">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="grid lg:grid-cols-4 gap-6 items-center">
          <div className="lg:col-span-3 space-y-3">
            <div className="flex items-center space-x-4">
              {categoryObj && (
                <span 
                  className="px-3 py-1 text-xs font-medium rounded-full text-white"
                  style={{ backgroundColor: categoryObj.color }}
                >
                  {categoryObj.name}
                </span>
              )}
              <div className="flex items-center space-x-2 text-stone">
                <Calendar className="w-3 h-3" />
                <time className="text-caption">{new Date(post.created_at).toLocaleDateString()}</time>
              </div>
            </div>

            <h3 className="text-title text-obsidian group-hover:text-infinity transition-colors">
              {post.title}
            </h3>

            {post.excerpt && (
              <p className="text-body text-slate line-clamp-2">
                {post.excerpt}
              </p>
            )}
          </div>

          <div className="flex items-center justify-end">
            <ArrowUpRight className="w-6 h-6 text-infinity group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>
        </div>
      </Link>
    </article>
  )
}
