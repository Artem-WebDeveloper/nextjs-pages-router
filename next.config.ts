import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,

  images: {
    qualities: [75, 80, 100],
    unoptimized: process.env.NODE_ENV === 'development',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kaakjseyjzwmbsdptdop.supabase.co',

        // port: '',
        // pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
