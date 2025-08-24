'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import UserProfile from '@/components/auth/UserProfile'
import Footer from '@/components/layout/Footer'
import { ChevronLeft, ChevronRight, Send, Globe } from 'lucide-react'
import Link from 'next/link'

const testimonials = [
  {
    text: "Working with PsycAi has been an absolute pleasure from start to finish. Their expertise in AI products allowed them to bring our vision to life with precision and creativity. They didn't just help us find tools; they crafted an immersive experience that perfectly reflects our brand identity.",
    author: "Sarah Johnson",
    title: "Chief Marketing Officer at TechSavvy Solutions"
  },
  {
    text: "The team at PsycAi transformed how we approach AI integration in our business. Their curated selection of products and expert guidance helped us increase productivity by 300% within just three months.",
    author: "Michael Chen",
    title: "CEO at Innovation Labs"
  },
  {
    text: "PsycAi's blog insights and product recommendations have been invaluable for our AI transformation journey. Their expertise saved us countless hours of research and trial-and-error.",
    author: "Emily Rodriguez",
    title: "CTO at Digital Dynamics"
  }
]

export default function ContactPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      setFormData({ firstName: '', lastName: '', email: '', message: '' })
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSubmitted(false)
      }, 3000)
    }, 1000)
  }

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* Navigation Bar */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            
            {/* Logo */}
            <div className="flex items-center">
              <span className="text-xl font-bold text-gray-900">PsycAi</span>
            </div>

            {/* Centered Navigation Links */}
            <nav className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Home</Link>
              <Link href="/products" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Products</Link>
              <Link href="/blog" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Blog</Link>
              <Link href="/contact" className="text-gray-900 font-semibold">Contact</Link>
            </nav>

            {/* User Profile */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-gray-600">
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">EN</span>
              </div>
              {user && <UserProfile />}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2">
              
              {/* Left Side - Testimonial */}
              <div className="relative bg-gray-900 p-12 flex flex-col justify-between min-h-[600px]">
                
                {/* 3D Cube Image */}
                <div className="flex-1 flex items-center justify-center mb-8">
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop&crop=center"
                      alt="AI Visualization"
                      className="w-64 h-64 object-cover rounded-2xl shadow-2xl"
                    />
                  </div>
                </div>

                {/* Testimonial Content */}
                <div className="text-white">
                  <blockquote className="text-lg leading-relaxed mb-6 font-light">
                    "{testimonials[currentTestimonial].text}"
                  </blockquote>
                  
                  <div className="mb-6">
                    <div className="font-semibold text-white">
                      {testimonials[currentTestimonial].author}
                    </div>
                    <div className="text-gray-300 text-sm font-light">
                      {testimonials[currentTestimonial].title}
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={prevTestimonial}
                      className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5 text-white" />
                    </button>
                    <button
                      onClick={nextTestimonial}
                      className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Side - Contact Form */}
              <div className="p-12">
                
                {/* Logo */}
                <div className="flex items-center mb-8">
                  <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center mr-3">
                    <div className="w-4 h-4 bg-white rounded"></div>
                  </div>
                  <span className="text-xl font-bold text-gray-900">PsycAi</span>
                </div>

                <div className="mb-8">
                  <h1 className="text-4xl font-bold text-gray-900 mb-2 leading-tight">
                    Have a project idea?
                  </h1>
                  <h2 className="text-4xl font-bold text-gray-900 mb-6">
                    Let's discuss it together.
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    I'm always open to new opportunities. Feel free to drop me a line if 
                    having any questions or projects.
                  </p>
                </div>

                {submitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
                    <p className="text-gray-600">Thank you for reaching out. We'll get back to you soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="First Name"
                          className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-gray-900 placeholder-gray-500"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Last name"
                          className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-gray-900 placeholder-gray-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email address"
                        className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-gray-900 placeholder-gray-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        placeholder="Any additional information..."
                        className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-gray-900 placeholder-gray-500"
                        required
                      />
                    </div>

                    <div className="text-xs text-gray-500 mb-6">
                      By clicking the button you agree to our{' '}
                      <Link href="/terms" className="text-gray-900 hover:underline">
                        terms and conditions
                      </Link>
                      .
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gray-900 text-white py-4 px-6 rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Sending...</span>
                        </div>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
