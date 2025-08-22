'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import UserProfile from '@/components/auth/UserProfile'
import Logo from '@/components/brand/Logo'
import { Menu, X } from 'lucide-react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, loading, isClient } = useAuth()
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigationItems = [
    { href: '/', label: 'Home', showWhenLoggedOut: true },
    { href: '/tools', label: 'Tools', requiresAuth: true },
    { href: '/blog', label: 'Blog', showWhenLoggedOut: true },
    { href: '/contact', label: 'Contact', showWhenLoggedOut: true },
    { href: '/admin/blogs', label: 'Admin', requiresAuth: true },
  ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  const filteredItems = navigationItems.filter(item => {
    if (item.requiresAuth && !user) return false
    if (!item.showWhenLoggedOut && !user) return false
    return true
  })

  if (!mounted || !isClient) {
    return null
  }

  // Only show overlay navigation on home page
  const isHomePage = pathname === '/'
  
  if (isHomePage) {
    // Navigation is handled within the home page component
    return null
  }

  // Regular navigation for other pages
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-lg' : 'bg-white border-b border-gray-200'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          <Logo size="md" />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              {filteredItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors relative ${
                    isActive(item.href)
                      ? 'text-purple-600'
                      : 'text-gray-600 hover:text-purple-600'
                  }`}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-600 rounded-full" />
                  )}
                </a>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              {loading ? (
                <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
              ) : user ? (
                <UserProfile />
              ) : (
                <div className="flex items-center space-x-3">
                  <a
                    href="/login"
                    className="text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    Sign In
                  </a>
                  <a
                    href="/signup"
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
                  >
                    Get Started
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-4">
            {user && !loading && <UserProfile />}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-6 border-t border-gray-200 bg-white/95 backdrop-blur-xl">
            <div className="space-y-4">
              {filteredItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-purple-600 bg-purple-50'
                      : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              
              {!loading && !user && (
                <div className="pt-4 border-t border-gray-200 space-y-3">
                  <a
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 text-sm font-medium text-gray-600 hover:text-purple-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    Sign In
                  </a>
                  <a
                    href="/signup"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 bg-purple-600 text-white text-center rounded-lg font-medium hover:bg-purple-700 transition-colors"
                  >
                    Get Started
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
