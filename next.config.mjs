/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // basePath: '/StarOfUs',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
