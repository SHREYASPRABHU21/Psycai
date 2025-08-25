'use client'

import { useState, useRef, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { LogOut, Settings } from 'lucide-react'

export default function UserProfile() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, userData, logout } = useAuth()
  const router = useRouter()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSignOut = async () => {
    try {
      await logout()
      setIsOpen(false)
      router.push('/')
    } catch (error) {
      console.error('Failed to sign out:', error)
    }
  }

  if (!user) return null

  const displayName = user.displayName || userData?.displayName || 'User'
  const email = user.email || ''
  const isAdmin = email === 'prabhushreyas21@gmail.com'
  
  // Debug log to see what photoURL we're getting
  console.log('User photoURL:', user.photoURL)
  console.log('UserData photoURL:', userData?.photoURL)
  
  // Get profile image - prioritize Google photo
  const getProfileImage = () => {
    // First check user.photoURL (Google profile pic)
    if (user.photoURL && user.photoURL.trim() !== '' && user.photoURL !== 'null') {
      console.log('Using user.photoURL:', user.photoURL)
      return user.photoURL
    }
    
    // Then check userData.photoURL
    if (userData?.photoURL && userData.photoURL.trim() !== '' && userData.photoURL !== 'null') {
      console.log('Using userData.photoURL:', userData.photoURL)
      return userData.photoURL
    }
    
    // Fallback to initials
    console.log('Using initials fallback')
    const initials = displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500']
    const colorIndex = displayName.charCodeAt(0) % colors.length
    return { initials, color: colors[colorIndex] }
  }

  const profileImage = getProfileImage()

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-1 rounded-lg hover:bg-white/10 transition-colors"
      >
        {typeof profileImage === 'string' ? (
          <img
            src={profileImage}
            alt={displayName}
            className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
            onLoad={() => console.log('Image loaded successfully')}
            onError={(e) => {
              console.log('Image failed to load:', profileImage)
              console.log('Error:', e)
            }}
            crossOrigin="anonymous"
          />
        ) : (
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold border-2 border-white/20 ${profileImage.color}`}>
            {profileImage.initials}
          </div>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-2">
            
            {/* User Info */}
            <div className="px-3 py-2 border-b border-gray-100 mb-2">
              <div className="flex items-center space-x-3">
                {typeof profileImage === 'string' ? (
                  <img
                    src={profileImage}
                    alt={displayName}
                    className="w-10 h-10 rounded-full object-cover"
                    crossOrigin="anonymous"
                  />
                ) : (
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold ${profileImage.color}`}>
                    {profileImage.initials}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 text-sm truncate">
                    {displayName}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {email}
                  </div>
                </div>
              </div>
            </div>

            {/* Admin Button - Only for your email */}
            {isAdmin && (
              <button
                onClick={() => {
                  router.push('/admin/blogs')
                  setIsOpen(false)
                }}
                className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-violet-600 hover:bg-violet-50 rounded-md transition-colors text-left mb-1"
              >
                <Settings className="w-4 h-4" />
                <span>Admin Panel</span>
              </button>
            )}

            {/* Sign Out Button */}
            <button
              onClick={handleSignOut}
              className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors text-left"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
