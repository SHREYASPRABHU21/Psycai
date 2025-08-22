'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import UserProfile from '@/components/auth/UserProfile'
import Logo from '@/components/brand/Logo'
import { Menu, X, Sparkles } from 'lucide-react'

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
    { href: '/', label: 'Platform', showWhenLoggedOut: true },
    { href: '/tools', label: 'Solutions', requiresAuth: true },
    { href: '/blog', label: 'Insights', showWhenLoggedOut: true },
    { href: '/pricing', label: 'Pricing', showWhenLoggedOut: true },
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
    return (
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-paper/95 backdrop-blur-xl border-b border-mist' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            <Logo size="md" />
            <div className="w-20 h-8 bg-mist rounded animate-pulse" />
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-paper/95 backdrop-blur-xl border-b border-mist shadow-gentle' : 'bg-transparent'
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
                  className={`text-body font-medium transition-all duration-300 relative ${
                    isActive(item.href)
                      ? 'text-infinity'
                      : 'text-slate hover:text-infinity'
                  }`}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-infinity rounded-full" />
                  )}
                </a>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              {loading ? (
                <div className="w-10 h-10 bg-mist rounded-full animate-pulse" />
              ) : user ? (
                <UserProfile />
              ) : (
                <div className="flex items-center space-x-3">
                  <a
                    href="/login"
                    className="text-body font-medium text-slate hover:text-infinity transition-colors"
                  >
                    Sign In
                  </a>
                  <a
                    href="/signup"
                    className="btn-infinity text-sm"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Start Free Trial
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
              className="p-2 rounded-xl hover:bg-snow transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-6 border-t border-mist bg-paper/95 backdrop-blur-xl">
            <div className="space-y-4">
              {filteredItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-body font-medium transition-all ${
                    isActive(item.href)
                      ? 'text-infinity bg-infinity/10'
                      : 'text-slate hover:text-infinity hover:bg-snow'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              
              {!loading && !user && (
                <div className="pt-4 border-t border-mist space-y-3">
                  <a
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 text-body font-medium text-slate hover:text-infinity hover:bg-snow rounded-xl transition-all"
                  >
                    Sign In
                  </a>
                  <a
                    href="/signup"
                    onClick={() => setIsOpen(false)}
                    className="btn-infinity w-full text-center"
                  >
                    Start Free Trial
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
