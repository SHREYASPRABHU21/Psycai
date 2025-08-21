import { createClient } from '@/lib/supabase/client'
import { Blog, BlogCategory, BlogFilters } from '@/types/blog'
import { debugLog, logSupabaseOperation } from '@/lib/debug'

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function generateExcerpt(content: string, maxLength: number = 150): string {
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
  return logSupabaseOperation('getBlogs', async () => {
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

    const result = await query
    
    if (result.error) {
      throw new Error(`Failed to fetch blogs: ${result.error.message}`)
    }

    return result
  })
}

export async function getBlogBySlug(slug: string) {
  return logSupabaseOperation('getBlogBySlug', async () => {
    const supabase = createClient()
    
    const result = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()

    if (result.error && result.error.code !== 'PGRST116') {
      throw new Error(`Failed to fetch blog: ${result.error.message}`)
    }

    return result
  })
}

export async function getBlogCategories() {
  return logSupabaseOperation('getBlogCategories', async () => {
    const supabase = createClient()
    
    const result = await supabase
      .from('blog_categories')
      .select('*')
      .order('name')

    if (result.error) {
      throw new Error(`Failed to fetch categories: ${result.error.message}`)
    }

    return result
  })
}

export async function createBlog(blog: Partial<Blog>) {
  return logSupabaseOperation('createBlog', async () => {
    const supabase = createClient()
    
    const result = await supabase
      .from('blogs')
      .insert([blog])
      .select()
      .single()

    if (result.error) {
      throw new Error(`Failed to create blog: ${result.error.message}`)
    }

    return result
  })
}

export async function updateBlog(id: string, blog: Partial<Blog>) {
  return logSupabaseOperation('updateBlog', async () => {
    const supabase = createClient()
    
    const result = await supabase
      .from('blogs')
      .update(blog)
      .eq('id', id)
      .select()
      .single()

    if (result.error) {
      throw new Error(`Failed to update blog: ${result.error.message}`)
    }

    return result
  })
}

export async function deleteBlog(id: string) {
  return logSupabaseOperation('deleteBlog', async () => {
    const supabase = createClient()
    
    const result = await supabase
      .from('blogs')
      .delete()
      .eq('id', id)

    if (result.error) {
      throw new Error(`Failed to delete blog: ${result.error.message}`)
    }

    return result
  })
}
