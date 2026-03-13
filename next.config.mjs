/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  output: 'export',
  // 🔥 关键：只有生产环境（构建/部署）才开启 basePath
  basePath: isProd ? '/StarOfUs' : '',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // 🔥 额外修复：静态资源前缀（必须加）
  assetPrefix: isProd ? '/StarOfUs/' : '',
}

export default nextConfig