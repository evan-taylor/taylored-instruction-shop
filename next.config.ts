export default {
  // Cache Components disabled - requires architectural changes for cart/cookie handling
  // Can be enabled later with proper Suspense boundaries for dynamic data
  cacheComponents: false,
  experimental: {
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
