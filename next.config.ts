import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  transpilePackages: ['three'],
  images: {
    remotePatterns: [{protocol: 'https', hostname:"jm8ktdnojji1jl4w.public.blob.vercel-storage.com"}],
  },
  async redirects() {
    return [
      {
        source: '/api/files',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
