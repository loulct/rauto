import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['three'],
  images: {
    remotePatterns: [{protocol: 'https', hostname:"jm8ktdnojji1jl4w.public.blob.vercel-storage.com"}],
  },
};

export default nextConfig;
