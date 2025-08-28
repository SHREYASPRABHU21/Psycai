'use client'

import { useState } from 'react'
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  ArrowUpRight, 
  Heart
} from 'lucide-react'
import Link from 'next/link'
import { subscribeToNewsletter } from '@/lib/supabase-user'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ]

  const company = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ]

  const social = [
    { name: 'GitHub', href: 'https://github.com/SHREYASPRABHU21/Psycai/tree/main/psycai', icon: Github },
    { name: 'Twitter', href: 'https://x.com/PsycaiAi', icon: Twitter },
    { name: 'LinkedIn', href: 'linkedin.com/company/psycai/', icon: Linkedin },
    { name: 'Email', href: 'mailto:psycai.ai.ai@gmail.com', icon: Mail },
  ]

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address')
      return
    }

    setIsSubmitting(true)

    try {
      const success = await subscribeToNewsletter(email)
      
      if (success) {
        setSubmitted(true)
        setEmail('')
        setTimeout(() => setSubmitted(false), 3000)
      } else {
        alert('Failed to subscribe. Please try again.')
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      alert('Failed to subscribe. Please try again.')
    }

    setIsSubmitting(false)
  }

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
      
      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="text-2xl font-bold text-white hover:text-violet-300 transition-colors">
              <img src="/psycai-logo.png" alt="PsycAi Logo" className="h-8 w-auto" /> 
            </Link>
            
            <p className="text-gray-400 leading-relaxed max-w-md">
              Your central hub for discovering and using amazing AI products. 
              Explore the possibilities of artificial intelligence in one convenient platform.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-3 pt-2">
              {social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-violet-600 hover:scale-110 transition-all duration-300 group"
                  aria-label={item.name}
                >
                  <item.icon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-semibold text-white">Platform</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-violet-400 transition-colors duration-300 flex items-center group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-semibold text-white">Company</h3>
            <ul className="space-y-2">
              {company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-violet-400 transition-colors duration-300 flex items-center group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-lg font-semibold text-white">Stay Updated</h3>
            <p className="text-gray-400">
              Get notified about new AI products and platform updates.
            </p>
            
            {submitted ? (
              <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
                <p className="text-green-400 text-sm">
                  ✓ Successfully subscribed to our newsletter!
                </p>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-violet-500 text-white placeholder-gray-500 text-sm"
                    required
                    disabled={isSubmitting}
                  />
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-violet-600 rounded-r-lg hover:bg-violet-700 disabled:opacity-50 transition-colors duration-300"
                  >
                    {isSubmitting ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  No spam, just updates about cool AI products.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        {/* <div className="border-t border-gray-800 pt-6 mt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-3 lg:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>© {currentYear} PsycAi</span>
              <Link href="/privacy" className="hover:text-violet-400 transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-violet-400 transition-colors">Terms</Link>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>Made with</span>
              <Heart className="w-3 h-3 text-red-400 animate-pulse" />
              <span>for AI enthusiasts</span>
            </div>
          </div>
        </div> */}
      </div>
    </footer>
  )
}
