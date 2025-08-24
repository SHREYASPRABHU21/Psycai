import { supabase, Tool } from './supabase'

export interface CreateProduct {
  name: string
  description: string
  image: string
  link: string
  category: string
  rating: number
  users: string
  featured: boolean
}

// Updated product categories
export const PRODUCT_CATEGORIES = ['All', 'Personal Growth', 'Entertainment', 'Work', 'Research', 'Creativity']

// Fetch all products (renamed from tools)
export const fetchProducts = async (): Promise<Tool[]> => {
  try {
    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

// Create new product (renamed from tool)
export const createProduct = async (productData: CreateProduct): Promise<string | null> => {
  try {
    const { data, error } = await supabase
      .from('tools')
      .insert(productData)
      .select('id')
      .single()

    if (error) throw error
    return data?.id || null
  } catch (error) {
    console.error('Error creating product:', error)
    return null
  }
}

// Update product
export const updateProduct = async (
  productId: string,
  updates: Partial<CreateProduct>
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('tools')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', productId)

    if (error) throw error
    return true
  } catch (error) {
    console.error('Error updating product:', error)
    return false
  }
}

// Delete product
export const deleteProduct = async (productId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('tools')
      .delete()
      .eq('id', productId)

    if (error) throw error
    return true
  } catch (error) {
    console.error('Error deleting product:', error)
    return false
  }
}
