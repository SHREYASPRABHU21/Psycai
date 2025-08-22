'use client'

import Logo from '@/components/brand/Logo'
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  ArrowUpRight, 
  Heart,
  Sparkles,
  Code2,
  Zap
} from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Platform', href: '/' },
    { name: 'Solutions', href: '/tools' },
    { name: 'Insights', href: '/blog' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact', href: '/contact' },
  ]

  const resources = [
    { name: 'Documentation', href: '/docs' },
    { name: 'API Reference', href: '/api' },
    { name: 'Help Center', href: '/help' },
    { name: 'Status', href: '/status' },
  ]

  const company = [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
    { name: 'Partners', href: '/partners' },
  ]

  const social = [
    { name: 'GitHub', href: '#', icon: Github },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'LinkedIn', href: '#', icon: Linkedin },
    { name: 'Email', href: 'mailto:hello@psycai.com', icon: Mail },
  ]

  return (
    <footer className="relative bg-gradient-to-br from-obsidian via-slate to-obsidian text-snow">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-infinity opacity-50" />
      
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-4 space-y-6">
            <Logo size="lg" className="text-snow" />
            
            <p className="text-body text-mist leading-relaxed max-w-md">
              Empowering businesses worldwide through innovative AI solutions. 
              PsycAi transforms complex challenges into intelligent opportunities, 
              one tool at a time.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center lg:text-left">
                <div className="flex items-center space-x-2 mb-1">
                  <Code2 className="w-4 h-4 text-infinity" />
                  <span className="text-title text-snow font-bold">25K+</span>
                </div>
                <div className="text-caption text-stone">Active Users</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center space-x-2 mb-1">
                  <Zap className="w-4 h-4 text-growth" />
                  <span className="text-title text-snow font-bold">12+</span>
                </div>
                <div className="text-caption text-stone">AI Tools</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center space-x-2 mb-1">
                  <Sparkles className="w-4 h-4 text-leaf" />
                  <span className="text-title text-snow font-bold">99.9%</span>
                </div>
                <div className="text-caption text-stone">Uptime</div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4 pt-4">
              {social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="w-12 h-12 bg-slate rounded-full flex items-center justify-center hover:bg-infinity hover:scale-110 transition-all duration-300 group"
                  aria-label={item.name}
                >
                  <item.icon className="w-5 h-5 text-mist group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-title text-snow font-semibold">Platform</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-body text-mist hover:text-infinity transition-colors duration-300 flex items-center group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-title text-snow font-semibold">Resources</h3>
            <ul className="space-y-3">
              {resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-body text-mist hover:text-growth transition-colors duration-300 flex items-center group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-title text-snow font-semibold">Company</h3>
            <ul className="space-y-3">
              {company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-body text-mist hover:text-leaf transition-colors duration-300 flex items-center group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-title text-snow font-semibold">Stay Updated</h3>
            <p className="text-body text-mist">
              Get the latest AI insights, product updates, and industry news.
            </p>
            
            <div className="space-y-4">
              <div className="flex">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 bg-slate border border-stone rounded-l-xl focus:outline-none focus:border-infinity text-snow placeholder-stone"
                />
                <button className="px-6 py-3 bg-gradient-infinity rounded-r-xl hover:shadow-infinity transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </button>
              </div>
              <p className="text-caption text-stone">
                Professional insights, no spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate pt-8 mt-16">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-6 text-caption text-stone">
              <span>© {currentYear} PsycAi</span>
              <a href="/privacy" className="hover:text-infinity transition-colors">Privacy</a>
              <a href="/terms" className="hover:text-infinity transition-colors">Terms</a>
              <a href="/cookies" className="hover:text-infinity transition-colors">Cookies</a>
            </div>
            
            <div className="flex items-center space-x-2 text-caption text-stone">
              <span>Built with</span>
              <Heart className="w-4 h-4 text-danger animate-pulse" />
              <span>and infinite innovation</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
