/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Image optimization
  images: {
    domains: [
      'images.unsplash.com',
      'picsum.photos',
      'lh3.googleusercontent.com',
      'firebasestorage.googleapis.com',
      // Add your Supabase project URL (replace with your actual URL)
      'your-supabase-project.supabase.co',
      // Add other domains you might use for images
      'via.placeholder.com',
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Enhanced security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "frame-src 'self' https://*.firebaseapp.com https://*.google.com https://accounts.google.com https://content.googleapis.com",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.firebaseapp.com https://*.googleapis.com https://apis.google.com https://www.gstatic.com https://accounts.google.com https://www.googletagmanager.com https://www.google-analytics.com",
              "connect-src 'self' https://*.firebaseapp.com https://*.googleapis.com https://accounts.google.com https://apis.google.com wss://*.firebaseapp.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://*.supabase.co wss://*.supabase.co https://www.google-analytics.com",
              "img-src 'self' data: blob: https://*.googleapis.com https://*.google.com https://*.gstatic.com https://lh3.googleusercontent.com https://firebasestorage.googleapis.com https://picsum.photos https://images.unsplash.com https://*.supabase.co https://via.placeholder.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "media-src 'self' https://*.supabase.co https://firebasestorage.googleapis.com"
            ].join('; ')
          },
          // Additional security headers
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ]
  },

  // Optimize builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // Enable experimental features for better performance
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },

  // Webpack optimizations
  webpack: (config: { resolve: { fallback: any } }, { isServer }: any) => {
    if (!isServer) {
      // Reduce bundle size
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }
    return config
  },

  // Redirect configuration (optional)
  async redirects() {
    return [
      {
        source: '/tools',
        destination: '/products',
        permanent: true,
      },
    ]
  },

  // Enable compression
  compress: true,

  // Optimize static generation
  trailingSlash: false,
  
  // Power optimizations
  poweredByHeader: false,
}

module.exports = nextConfig
