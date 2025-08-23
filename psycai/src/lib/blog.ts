import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  addDoc, 
  updateDoc, 
  query, 
  orderBy, 
  where, 
  serverTimestamp 
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db } from './firebase'

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: {
    name: string
    email: string
    photoURL?: string
    uid: string
  }
  coverImage: string
  category: string
  tags: string[]
  published: boolean
  createdAt: any
  updatedAt: any
  views: number
  likes: number
}

export interface CreateBlogPost {
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  coverImage: string
  published: boolean
}

// Fetch all published blogs
export const fetchBlogs = async (): Promise<BlogPost[]> => {
  try {
    const blogsRef = collection(db, 'blogs')
    const q = query(
      blogsRef, 
      where('published', '==', true),
      orderBy('createdAt', 'desc')
    )
    const querySnapshot = await getDocs(q)
    
    const blogs: BlogPost[] = []
    querySnapshot.forEach((doc) => {
      blogs.push({
        id: doc.id,
        ...doc.data()
      } as BlogPost)
    })
    
    return blogs
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return []
  }
}

// Fetch single blog by slug
export const fetchBlogBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    const blogsRef = collection(db, 'blogs')
    const q = query(blogsRef, where('slug', '==', slug))
    const querySnapshot = await getDocs(q)
    
    if (querySnapshot.empty) {
      return null
    }
    
    const doc = querySnapshot.docs[0]
    return {
      id: doc.id,
      ...doc.data()
    } as BlogPost
  } catch (error) {
    console.error('Error fetching blog:', error)
    return null
  }
}

// Create new blog post
export const createBlogPost = async (
  blogData: CreateBlogPost, 
  authorData: { name: string; email: string; photoURL?: string; uid: string }
): Promise<string | null> => {
  try {
    const blogsRef = collection(db, 'blogs')
    const docRef = await addDoc(blogsRef, {
      ...blogData,
      author: authorData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      views: 0,
      likes: 0
    })
    
    return docRef.id
  } catch (error) {
    console.error('Error creating blog post:', error)
    return null
  }
}

// Update blog post
export const updateBlogPost = async (
  blogId: string, 
  updates: Partial<CreateBlogPost>
): Promise<boolean> => {
  try {
    const blogRef = doc(db, 'blogs', blogId)
    await updateDoc(blogRef, {
      ...updates,
      updatedAt: serverTimestamp()
    })
    return true
  } catch (error) {
    console.error('Error updating blog post:', error)
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
