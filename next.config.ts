import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['three'],
  images: {
    remotePatterns: [{protocol: 'https', hostname:"jm8ktdnojji1jl4w.public.blob.vercel-storage.com"}],
  },
  async rewrites() {
    if (process.env.NEXT_PUBLIC_ENV === "static-export") {
      return [
        {
          source: "/api/files",
          destination: "/404",
        },
      ];
    }
    return [];
  },
  exportTrailingSlash: process.env.NEXT_PUBLIC_ENV === "static-export",
};

export default nextConfig;
