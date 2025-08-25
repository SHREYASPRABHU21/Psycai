import { Metadata } from 'next'
import Link from 'next/link'
import { fetchBlogBySlug } from '@/lib/supabase-blog'
import Footer from '@/components/layout/Footer'
import UserProfile from '@/components/auth/UserProfile'
import { ArrowLeft, Calendar, Clock, Share2, Heart, Globe } from 'lucide-react'
import ShareButtons from "@/components/blog/ShareButtons"

interface Params {
  slug: string
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const blog = await fetchBlogBySlug(slug)

  if (!blog) {
    return { title: 'Blog Not Found' }
  }

  return {
    title: blog.title,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      url: `https://psycai.site/blog/${blog.slug}`,
      images: [{ url: blog.cover_image }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.excerpt,
      images: [blog.cover_image],
    }
  }
}


export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const blog = await fetchBlogBySlug(slug)

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Blog not found.</p>
      </div>
    )
  }

  const formatDate = (timestamp: string) =>
    new Date(timestamp).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })

  const calculateReadTime = (content: string) =>
    Math.ceil(content.split(' ').length / 200)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-gray-900"><img src="/psycai-logo.png" alt="PsycAi Logo" className="h-8 w-auto" /></Link>
          <nav className="flex space-x-8">
            <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
            <Link href="/products" className="text-gray-600 hover:text-gray-900">Products</Link>
            <Link href="/blog" className="text-gray-900 font-semibold">Blog</Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
          </nav>
          <UserProfile />
        </div>
      </header>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/blog" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
        </Link>

        <div className="mb-4 flex space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" /> <span>{formatDate(blog.created_at)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" /> <span>{calculateReadTime(blog.content)} min read</span>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-6">{blog.title}</h1>
        <p className="text-xl text-gray-700 mb-8">{blog.excerpt}</p>

        <img
          src={blog.cover_image}
          alt={blog.title}
          className="w-full h-96 object-cover rounded-2xl mb-10"
        />

        <div className="prose prose-lg prose-gray max-w-none">
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>

        {/* Like/Share */}
        <ShareButtons title={blog.title} excerpt={blog.excerpt} />
      </article>

      <Footer />
    </div>
  )
}
