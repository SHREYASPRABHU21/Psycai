import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Blog {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author_name: string
  author_email: string
  author_photo_url?: string
  author_uid: string
  cover_image: string
  category: string
  tags: string[]
  published: boolean
  created_at: string
  updated_at: string
  views: number
  likes: number
}

export interface Tool {
  id: string
  name: string
  description: string
  image: string
  link: string
  category: string
  rating: number
  users: string
  featured: boolean
  created_at: string
  updated_at: string
}
