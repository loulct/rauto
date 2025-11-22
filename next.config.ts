import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['three'],
  images: {
    domains: ["jm8ktdnojji1jl4w.public.blob.vercel-storage.com"], // <-- domain of your Blob URLs
  },
};

export default nextConfig;
