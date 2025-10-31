import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['three'],
};

module.exports = {
  turbopack: {
    rules: {
      '*.glsl': {
        loaders: ['raw-loader', 'glslify-loader'],
        as: '*.js',
      },
    },
  },
}

export default nextConfig;
