/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "frame-src 'self' https://*.firebaseapp.com https://*.google.com https://accounts.google.com https://content.googleapis.com",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.firebaseapp.com https://*.googleapis.com https://apis.google.com https://www.gstatic.com https://accounts.google.com",
              "connect-src 'self' https://*.firebaseapp.com https://*.googleapis.com https://accounts.google.com https://apis.google.com wss://*.firebaseapp.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com",
              "img-src 'self' data: https://*.googleapis.com https://*.google.com https://*.gstatic.com"
            ].join('; ')
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig
