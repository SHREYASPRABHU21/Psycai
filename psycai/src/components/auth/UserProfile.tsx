'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, User, Settings, LogOut } from 'lucide-react'

export default function UserProfile() {
  const { user, signOut, loading } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
        <div className="w-16 h-4 bg-gray-200 rounded animate-pulse hidden sm:block" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  const displayName = user.user_metadata?.full_name || user.user_metadata?.name || user.email
  const firstName = displayName?.split(' ')[0] || user.email

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-xl hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
      >
        <div className="flex items-center space-x-3">
          {user.user_metadata?.avatar_url ? (
            <Image
              src={user.user_metadata.avatar_url}
              alt={displayName || 'User'}
              width={32}
              height={32}
              className="rounded-full ring-2 ring-white shadow-sm"
            />
          ) : (
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white text-sm font-medium">
              {firstName?.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="hidden sm:block text-left">
            <p className="text-sm font-medium text-text truncate max-w-24">
              {firstName}
            </p>
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-text/60 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-200/50 py-2 z-50 backdrop-blur-md">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              {user.user_metadata?.avatar_url ? (
                <Image
                  src={user.user_metadata.avatar_url}
                  alt={displayName || 'User'}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-medium">
                  {firstName?.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text truncate">
                  {displayName}
                </p>
                <p className="text-xs text-text/60 truncate">{user.email}</p>
              </div>
            </div>
          </div>
          
          {/* Menu Items */}
          <div className="py-2">
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center px-4 py-3 text-sm text-text hover:bg-gray-50 transition-colors"
            >
              <User className="w-4 h-4 mr-3 text-text/60" />
              Profile Settings
            </Link>
            
            <Link
              href="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center px-4 py-3 text-sm text-text hover:bg-gray-50 transition-colors"
            >
              <Settings className="w-4 h-4 mr-3 text-text/60" />
              Preferences
            </Link>
            
            <div className="border-t border-gray-100 mt-2 pt-2">
              <button
                onClick={() => {
                  signOut()
                  setIsOpen(false)
                }}
                className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-3" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
