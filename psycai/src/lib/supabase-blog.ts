import { supabase, Blog } from './supabase'

export interface CreateBlog {
   title: string
  slug: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  cover_image: string
  published: boolean
}

export const BLOG_CATEGORIES = ['All', 'Marketing', 'Business', 'AI']

// Fetch all published blogs
export const fetchBlogs = async (): Promise<Blog[]> => {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error fetching blogs:', error)
      throw error
    }
    return data || []
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return []
  }
}

// Fetch blog by slug
export const fetchBlogBySlug = async (slug: string): Promise<Blog | null> => {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) {
      console.error('Supabase error fetching blog by slug:', error)
      throw error
    }
    
    // Increment view count
    if (data) {
      await supabase
        .from('blogs')
        .update({ views: data.views + 1 })
        .eq('id', data.id)
    }
    
    return data
  } catch (error) {
    console.error('Error fetching blog:', error)
    return null
  }
}

// Create new blog with detailed error logging
export const createBlog = async (
  blogData: CreateBlog,
  authorData: { name: string; email: string; photoURL?: string; uid: string }
): Promise<string | null> => {
  try {
    console.log('Creating blog with data:', { blogData, authorData })
    
    // Validate required fields
    if (!blogData.title || !blogData.slug || !blogData.excerpt || !blogData.content || !blogData.cover_image) {
      throw new Error('Missing required blog fields')
    }
    
    if (!authorData.name || !authorData.email || !authorData.uid) {
      throw new Error('Missing required author fields')
    }

    const insertData = {
      title: blogData.title,
      slug: blogData.slug,
      excerpt: blogData.excerpt,
      content: blogData.content,
      category: blogData.category,
      tags: blogData.tags,
      cover_image: blogData.cover_image,
      published: blogData.published,
      author_name: authorData.name,
      author_email: authorData.email,
      author_photo_url: authorData.photoURL || null,
      author_uid: authorData.uid
    }

    console.log('Insert data:', insertData)

    const { data, error } = await supabase
      .from('blogs')
      .insert(insertData)
      .select('id')
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      console.error('Error details:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      })
      throw error
    }

    console.log('Blog created successfully:', data)
    return data?.id || null
  } catch (error) {
    console.error('Error creating blog:', error)
    return null
  }
}

// Update blog
export const updateBlog = async (
  blogId: string,
  updates: Partial<CreateBlog>
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('blogs')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', blogId)

    if (error) {
      console.error('Supabase update error:', error)
      throw error
    }
    return true
  } catch (error) {
    console.error('Error updating blog:', error)
    return false
  }
}

// Generate slug from title
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
