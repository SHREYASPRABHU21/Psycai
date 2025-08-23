import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore'
import { db } from './firebase'

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
  createdAt: any
  updatedAt: any
}

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
    const toolsRef = collection(db, 'tools')
    const q = query(toolsRef, orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)
    
    const tools: Tool[] = []
    querySnapshot.forEach((doc) => {
      tools.push({
        id: doc.id,
        ...doc.data()
      } as Tool)
    })
    
    return tools
  } catch (error) {
    console.error('Error fetching tools:', error)
    return []
  }
}

// Create new tool
export const createTool = async (toolData: CreateTool): Promise<string | null> => {
  try {
    const toolsRef = collection(db, 'tools')
    const docRef = await addDoc(toolsRef, {
      ...toolData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
    
    return docRef.id
  } catch (error) {
    console.error('Error creating tool:', error)
    return null
  }
}

// Update tool
export const updateTool = async (toolId: string, updates: Partial<CreateTool>): Promise<boolean> => {
  try {
    const toolRef = doc(db, 'tools', toolId)
    await updateDoc(toolRef, {
      ...updates,
      updatedAt: serverTimestamp()
    })
    return true
  } catch (error) {
    console.error('Error updating tool:', error)
    return false
  }
}

// Delete tool
export const deleteTool = async (toolId: string): Promise<boolean> => {
  try {
    const toolRef = doc(db, 'tools', toolId)
    await deleteDoc(toolRef)
    return true
  } catch (error) {
    console.error('Error deleting tool:', error)
    return false
  }
}
