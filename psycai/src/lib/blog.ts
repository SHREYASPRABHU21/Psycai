import { createClient } from '@/lib/supabase/client'
import { Blog, BlogCategory, BlogFilters } from '@/types/blog'

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function generateExcerpt(content: string, maxLength: number = 150): string {
  // Strip markdown and HTML
  const plainText = content
    .replace(/#{1,6}\s+/g, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/<[^>]*>/g, '')
    .trim()

  if (plainText.length <= maxLength) return plainText
  
  return plainText.substring(0, maxLength).trim() + '...'
}

export async function getBlogs(filters?: BlogFilters) {
  const supabase = createClient()
  
  let query = supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false })

  if (filters?.published !== undefined) {
    query = query.eq('published', filters.published)
  }

  if (filters?.category) {
    query = query.eq('category', filters.category)
  }

  if (filters?.search) {
    query = query.or(`title.ilike.%${filters.search}%,content.ilike.%${filters.search}%,tags.cs.{${filters.search}}`)
  }

  return query
}

export async function getBlogBySlug(slug: string) {
  const supabase = createClient()
  
  return supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()
}

export async function getBlogCategories() {
  const supabase = createClient()
  
  return supabase
    .from('blog_categories')
    .select('*')
    .order('name')
}

export async function createBlog(blog: Partial<Blog>) {
  const supabase = createClient()
  
  return supabase
    .from('blogs')
    .insert([blog])
    .select()
    .single()
}

export async function updateBlog(id: string, blog: Partial<Blog>) {
  const supabase = createClient()
  
  return supabase
    .from('blogs')
    .update(blog)
    .eq('id', id)
    .select()
    .single()
}

export async function deleteBlog(id: string) {
  const supabase = createClient()
  
  return supabase
    .from('blogs')
    .delete()
    .eq('id', id)
}
