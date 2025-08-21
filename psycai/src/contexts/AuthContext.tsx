'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, Session, AuthError } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  error: AuthError | null
  isClient: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<AuthError | null>(null)
  const [isClient, setIsClient] = useState(false)
  
  const supabase = createClient()

  // Fix hydration by ensuring client-side only execution
  useEffect(() => {
    setIsClient(true)
    
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        setSession(session)
        setUser(session?.user ?? null)
        setError(error)
      } catch (err) {
        console.error('Error getting session:', err)
        setError(err as AuthError)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
        
        // Handle sign in
        if (event === 'SIGNED_IN' && session?.user) {
          await createOrUpdateProfile(session.user)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const createOrUpdateProfile = async (user: User) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          email: user.email!,
          full_name: user.user_metadata?.full_name || user.user_metadata?.name,
          avatar_url: user.user_metadata?.avatar_url,
          updated_at: new Date().toISOString(),
        })

      if (error) throw error
    } catch (error) {
      console.error('Error creating/updating profile:', error)
    }
  }

  const signInWithGoogle = async () => {
    if (!isClient) return
    
    setError(null)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
    if (error) setError(error)
  }

  const signOut = async () => {
    if (!isClient) return
    
    setError(null)
    const { error } = await supabase.auth.signOut()
    if (error) setError(error)
  }

  const value = {
    user,
    session,
    loading,
    signInWithGoogle,
    signOut,
    error,
    isClient,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
