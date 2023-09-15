/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites:  async () => {
        return [
        {
            source: '/api/:path*', // Routes with /api prefix
            destination:
            process.env.NODE_ENV === 'development' // Proxy to Backend
                ? 'http://127.0.0.1:8000/api/:path*'
                : '/api/',
        },
        ]
  },
}

module.exports = nextConfig
