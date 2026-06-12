import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // ─── Allowed quality levels ───────────────────────────────────────────────
    // 75 is the default for content images; 90 for high-fidelity banners.
    qualities: [75, 80, 85, 90, 100],
    // ─── Cache ───────────────────────────────────────────────────────────────
    // Default is 60s. For production, cache optimised images for 7 days.
    minimumCacheTTL: 60 * 60 * 24 * 7,

    // ─── Breakpoints matched to Tailwind/site breakpoints ────────────────────
    // deviceSizes: widths used when sizes="Xvw" or fill
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920, 2048],
    // imageSizes: widths used for fixed/intrinsic sizing (w=N)
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // ─── Serve WebP to all modern browsers (avif has higher CPU cost) ────────
    formats: ['image/webp'],

    // ─── Remote domains ──────────────────────────────────────────────────────
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.ticketroko.retailian.in',
        pathname: '/**',
      },
      {
        // Support legacy http API in dev/staging
        protocol: 'http',
        hostname: 'api.ticketroko.retailian.in',
        pathname: '/**',
      },
    ],
  },
  allowedDevOrigins: ['172.24.144.1'] as any,
};

export default nextConfig;