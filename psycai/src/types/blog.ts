export interface Blog {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  category: string
  tags: string[]
  featured_image?: string
  published: boolean
  author_id?: string
  created_at: string
  updated_at: string
}

export interface BlogCategory {
  id: string
  name: string
  slug: string
  description?: string
  color: string
  created_at: string
}

export interface BlogFilters {
  category?: string
  search?: string
  published?: boolean
}
