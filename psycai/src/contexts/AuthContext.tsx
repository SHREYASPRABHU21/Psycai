'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, Session, AuthError } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
import { debugLog } from '@/lib/debug'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  error: AuthError | null
  isClient: boolean
  debugInfo: any
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<AuthError | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [debugInfo, setDebugInfo] = useState<any>({})
  
  const supabase = createClient()

  useEffect(() => {
    setIsClient(true)
    
    const initializeAuth = async () => {
      try {
        debugLog('AuthContext', 'Initializing auth')
        
        // Get initial session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        
        debugLog('AuthContext', 'Initial session check', { 
          hasSession: !!session,
          sessionError,
          user: session?.user?.id 
        })

        if (sessionError) {
          debugLog('AuthContext', 'Session error', null, sessionError)
          setError(sessionError)
        } else {
          setSession(session)
          setUser(session?.user ?? null)
          
          // If we have a user, try to create/update profile
          if (session?.user) {
            await createOrUpdateProfile(session.user)
          }
        }
        
        setDebugInfo({
          hasSession: !!session,
          userId: session?.user?.id,
          sessionError: sessionError?.message,
          timestamp: new Date().toISOString()
        })

      } catch (err) {
        debugLog('AuthContext', 'Initialization error', null, err)
        setError(err as AuthError)
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        debugLog('AuthContext', 'Auth state change', { event, hasSession: !!session })
        
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
        
        // Handle sign in
        if (event === 'SIGNED_IN' && session?.user) {
          debugLog('AuthContext', 'User signed in', { userId: session.user.id })
          await createOrUpdateProfile(session.user)
        }
        
        if (event === 'SIGNED_OUT') {
          debugLog('AuthContext', 'User signed out')
          setUser(null)
          setSession(null)
        }

        setDebugInfo({
          event,
          hasSession: !!session,
          userId: session?.user?.id,
          timestamp: new Date().toISOString()
        })
      }
    )

    return () => {
      debugLog('AuthContext', 'Cleaning up auth subscription')
      subscription.unsubscribe()
    }
  }, [])

  const createOrUpdateProfile = async (user: User) => {
    try {
      debugLog('AuthContext', 'Creating/updating profile', { userId: user.id })
      
      const profileData = {
        id: user.id,
        email: user.email!,
        full_name: user.user_metadata?.full_name || user.user_metadata?.name || null,
        avatar_url: user.user_metadata?.avatar_url || null,
        updated_at: new Date().toISOString(),
      }

      const { data, error } = await supabase
        .from('profiles')
        .upsert(profileData)
        .select()

      if (error) {
        debugLog('AuthContext', 'Profile upsert error', null, error)
        throw error
      }

      debugLog('AuthContext', 'Profile created/updated successfully', data)
    } catch (error) {
      debugLog('AuthContext', 'Profile creation error', null, error)
      console.error('Error creating/updating profile:', error)
    }
  }

  const signInWithGoogle = async () => {
    if (!isClient) {
      debugLog('AuthContext', 'Sign in attempted before client ready')
      return
    }
    
    try {
      debugLog('AuthContext', 'Starting Google sign in')
      setError(null)
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })

      debugLog('AuthContext', 'Google sign in response', { data, error })

      if (error) {
        setError(error)
      }
    } catch (err) {
      debugLog('AuthContext', 'Google sign in error', null, err)
      setError(err as AuthError)
    }
  }

  const signOut = async () => {
    if (!isClient) return
    
    try {
      debugLog('AuthContext', 'Starting sign out')
      setError(null)
      
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        debugLog('AuthContext', 'Sign out error', null, error)
        setError(error)
      } else {
        debugLog('AuthContext', 'Sign out successful')
        // Force clear state
        setUser(null)
        setSession(null)
      }
    } catch (err) {
      debugLog('AuthContext', 'Sign out error', null, err)
      setError(err as AuthError)
    }
  }

  const value = {
    user,
    session,
    loading,
    signInWithGoogle,
    signOut,
    error,
    isClient,
    debugInfo,
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
