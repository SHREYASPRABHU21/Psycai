import { supabase, Tool } from './supabase'

export interface CreateTool {
  name: string
  description: string
  image: string
  link: string
  category: string
  rating: number
  users: string
  featured: boolean
}

// Fetch all tools
export const fetchTools = async (): Promise<Tool[]> => {
  try {
    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching tools:', error)
    return []
  }
}

// Create new tool
export const createTool = async (toolData: CreateTool): Promise<string | null> => {
  try {
    const { data, error } = await supabase
      .from('tools')
      .insert(toolData)
      .select('id')
      .single()

    if (error) throw error
    return data?.id || null
  } catch (error) {
    console.error('Error creating tool:', error)
    return null
  }
}

// Update tool
export const updateTool = async (
  toolId: string,
  updates: Partial<CreateTool>
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('tools')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', toolId)

    if (error) throw error
    return true
  } catch (error) {
    console.error('Error updating tool:', error)
    return false
  }
}

// Delete tool
export const deleteTool = async (toolId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('tools')
      .delete()
      .eq('id', toolId)

    if (error) throw error
    return true
  } catch (error) {
    console.error('Error deleting tool:', error)
    return false
  }
}
