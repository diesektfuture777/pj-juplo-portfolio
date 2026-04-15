/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ['sanity', '@sanity/client', 'next-sanity'],
  },
}

module.exports = nextConfig
