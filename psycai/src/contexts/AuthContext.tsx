'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { 
  signInWithPopup,
  signOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { auth, googleProvider, db } from '@/lib/firebase'
import { User } from 'firebase/auth'

interface UserData {
  uid: string
  email: string
  displayName: string
  photoURL?: string
  phone?: string
  country?: string
  createdAt: any
  loginMethod: 'email' | 'google'
}

interface AuthContextType {
  user: User | null
  userData: UserData | null
  loading: boolean
  signInWithGoogle: () => Promise<void>
  signUpWithEmail: (data: SignupData) => Promise<void>
  signInWithEmail: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  error: string | null
  clearError: () => void
}

interface SignupData {
  email: string
  password: string
  phone: string
  country: string
  displayName: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    console.log('Auth Context: Setting up listener...')
    
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('Auth Context: State changed -', firebaseUser ? firebaseUser.email : 'No user')
      
      if (firebaseUser) {
        setUser(firebaseUser)
        await fetchUserData(firebaseUser.uid)
      } else {
        setUser(null)
        setUserData(null)
      }
      
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const fetchUserData = async (uid: string) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid))
      if (userDoc.exists()) {
        const data = userDoc.data() as UserData
        console.log('Auth Context: User data loaded -', data.displayName)
        setUserData(data)
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  const signInWithGoogle = async () => {
    try {
      setError(null)
      console.log('Auth Context: Starting Google sign in...')
      
      const result = await signInWithPopup(auth, googleProvider)
      console.log('Auth Context: Google sign in successful')
      
      const userDoc = await getDoc(doc(db, 'users', result.user.uid))
      
      if (!userDoc.exists()) {
        const userData: UserData = {
          uid: result.user.uid,
          email: result.user.email!,
          displayName: result.user.displayName!,
          photoURL: result.user.photoURL || undefined,
          createdAt: serverTimestamp(),
          loginMethod: 'google'
        }
        
        await setDoc(doc(db, 'users', result.user.uid), userData)
      }
      
    } catch (error: any) {
      console.error('Google sign in error:', error)
      setError('Failed to sign in with Google')
      throw error
    }
  }

  const signUpWithEmail = async (data: SignupData) => {
    try {
      setError(null)
      console.log('Auth Context: Starting email signup...')
      
      const result = await createUserWithEmailAndPassword(auth, data.email, data.password)
      await updateProfile(result.user, { displayName: data.displayName })
      
      const userData: UserData = {
        uid: result.user.uid,
        email: data.email,
        displayName: data.displayName,
        phone: data.phone,
        country: data.country,
        createdAt: serverTimestamp(),
        loginMethod: 'email'
      }
      
      await setDoc(doc(db, 'users', result.user.uid), userData)
      console.log('Auth Context: Email signup successful')
      
    } catch (error: any) {
      console.error('Email signup error:', error)
      if (error.code === 'auth/email-already-in-use') {
        setError('This email is already registered')
      } else if (error.code === 'auth/weak-password') {
        setError('Password is too weak')
      } else {
        setError('Failed to create account')
      }
      throw error
    }
  }

  const signInWithEmail = async (email: string, password: string) => {
    try {
      setError(null)
      console.log('Auth Context: Starting email sign in...')
      
      await signInWithEmailAndPassword(auth, email, password)
      console.log('Auth Context: Email sign in successful')
      
    } catch (error: any) {
      console.error('Email signin error:', error)
      if (error.code === 'auth/user-not-found') {
        setError('No account found with this email')
      } else if (error.code === 'auth/wrong-password') {
        setError('Incorrect password')
      } else if (error.code === 'auth/invalid-credential') {
        setError('Invalid email or password')
      } else {
        setError('Failed to sign in')
      }
      throw error
    }
  }

  const logout = async () => {
    try {
      setError(null)
      await signOut(auth)
    } catch (error: any) {
      console.error('Logout error:', error)
      setError('Failed to sign out')
    }
  }

  const clearError = () => {
    setError(null)
  }

  const value = {
    user,
    userData,
    loading,
    signInWithGoogle,
    signUpWithEmail,
    signInWithEmail,
    logout,
    error,
    clearError
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
