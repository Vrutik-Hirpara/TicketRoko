import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [100, 75] as any,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  allowedDevOrigins: ['172.24.144.1'] as any,
};

export default nextConfig;