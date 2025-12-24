export default {
  // MIGRATED: Moved cacheComponents out of experimental (now stable)
  cacheComponents: true,
  experimental: {
    // MIGRATED: Removed ppr: true (removed in Next.js 16)
    inlineCss: true
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/s/files/**'
      }
    ]
  }
};
