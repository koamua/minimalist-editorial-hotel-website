/** @type {import('next').NextConfig} */
const nextConfig = {
  // DÉSACTIVE LE FAVICON AUTO DE NEXT.JS
  images: {
    unoptimized: true,
  },
  // Force le favicon statique depuis public/
  assetPrefix: '',
  async headers() {
    return [
      {
        source: '/favicon.ico',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
  // SUPPRIME LE FAVICON DE MÉTADATA
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

// FORCER LE FAVICON À NE PAS ÊTRE GÉNÉRÉ
delete nextConfig.metadata;
delete nextConfig.icons;

export default nextConfig;
