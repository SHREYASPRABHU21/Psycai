'use client'

import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'full' | 'symbol' | 'text'
  className?: string
}

export default function Logo({ 
  size = 'md', 
  variant = 'full', 
  className = '' 
}: LogoProps) {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-24'
  }

  return (
    <Link href="/" className={`flex items-center space-x-3 hover-lift ${className}`}>
      {(variant === 'full' || variant === 'symbol') && (
        <div className={`relative ${sizeClasses[size]} aspect-square`}>
          <Image
            src="/PsycAi-Organic-Flow-Logo.png"
            alt="PsycAi Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      )}
      {/* {(variant === 'full' || variant === 'text') && (
        <span className="text-display infinity-gradient font-bold tracking-tight">
          PsycAi
        </span>
      )} */}
    </Link>
  )
}
