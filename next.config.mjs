/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // Fixe les images pour Netlify
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Force le favicon statique - évite le bug metadata
  async headers() {
    return [
      {
        source: '/favicon.ico',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  }
}

export default nextConfig
