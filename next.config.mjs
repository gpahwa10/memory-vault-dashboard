import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use this app folder as the tracing root when another lockfile exists higher in the tree
  outputFileTracingRoot: path.join(__dirname),
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
