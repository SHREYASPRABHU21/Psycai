'use client'

import { useState, useRef, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { 
  User, 
  Settings, 
  LogOut, 
  ChevronDown
} from 'lucide-react'

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
  
  const getProfileImage = () => {
    if (user.photoURL && user.photoURL.startsWith('http')) {
      return user.photoURL
    }
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
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/10 transition-colors"
      >
        {typeof profileImage === 'string' ? (
          <img
            src={profileImage}
            alt={displayName}
            className="w-8 h-8 rounded-full object-cover border-2 border-white/20"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none'
            }}
          />
        ) : (
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold border-2 border-white/20 ${profileImage.color}`}>
            {profileImage.initials}
          </div>
        )}
        <ChevronDown className="w-4 h-4 text-white/70" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-2">
            
            <div className="px-3 py-2 border-b border-gray-100 mb-2">
              <div className="font-medium text-gray-900 text-sm truncate">
                {displayName}
              </div>
              <div className="text-xs text-gray-500 truncate">
                {user.email}
              </div>
            </div>

            <div className="space-y-1">
              <button
                onClick={() => {
                  setIsOpen(false)
                  router.push('/profile')
                }}
                className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors text-left"
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </button>
              
              <button
                onClick={() => {
                  setIsOpen(false)
                  router.push('/settings')
                }}
                className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors text-left"
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
              
              <hr className="my-2" />
              
              <button
                onClick={handleSignOut}
                className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors text-left"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
