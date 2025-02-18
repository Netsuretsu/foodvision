import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'foodvision-production.up.railway.app',
        port: '', 
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
