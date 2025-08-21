import { notFound } from 'next/navigation'
import Layout from '@/components/layout/Layout'
import { getBlogBySlug, getBlogCategories } from '@/lib/blog'
import { Metadata } from 'next'
import BlogContent from '@/components/blog/BlogContent'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const { data: blog } = await getBlogBySlug(slug)
  
  if (!blog) return { title: 'Blog Post Not Found' }

  return {
    title: `${blog.title} | Psycai Blog`,
    description: blog.excerpt || `Read ${blog.title} on Psycai Blog`,
    openGraph: {
      title: blog.title,
      description: blog.excerpt || '',
      type: 'article',
      publishedTime: blog.created_at,
      modifiedTime: blog.updated_at,
      tags: blog.tags,
    }
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const [blogResult, categoriesResult] = await Promise.all([
    getBlogBySlug(slug),
    getBlogCategories()
  ])

  if (!blogResult.data) {
    notFound()
  }

  const blog = blogResult.data
  const categories = categoriesResult.data || []
  const categoryObj = categories.find((c: { slug: any }) => c.slug === blog.category)

  return (
    <Layout>
      <BlogContent blog={blog} category={categoryObj} />
    </Layout>
  )
}
