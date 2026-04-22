/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "memory-vault-uploads.s3.ap-south-1.amazonaws.com",
      },
    ],
  },
}

export default nextConfig
