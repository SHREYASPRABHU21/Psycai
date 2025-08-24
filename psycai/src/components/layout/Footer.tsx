'use client'

import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  ArrowUpRight, 
  Heart
} from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ]

  const company = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Support', href: '/contact' },
  ]

  const social = [
    { name: 'GitHub', href: '#', icon: Github },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'LinkedIn', href: '#', icon: Linkedin },
    { name: 'Email', href: 'mailto:hello@psycai.com', icon: Mail },
  ]

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
      
      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="text-2xl font-bold text-white hover:text-violet-300 transition-colors">
              PsycAi
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
            
            <div className="space-y-3">
              <div className="flex">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-violet-500 text-white placeholder-gray-500 text-sm"
                />
                <button className="px-4 py-2 bg-violet-600 rounded-r-lg hover:bg-violet-700 transition-colors duration-300">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </button>
              </div>
              <p className="text-xs text-gray-500">
                No spam, just updates about cool AI products.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 mt-8">
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
        </div>
      </div>
    </footer>
  )
}
