// import type { NextConfig } from "next";

const nextConfig = {
  transpilePackages: ['three'],
  experimental: {
    turbo: {
      rules: {
        '*.glsl': {
          loaders: ['raw-loader', 'glslify-loader'],
          as: '*.js',
        },
      },
    },
  },
  webpack(config: import("webpack").Configuration) {
    config.module?.rules?.push({
      test: /\.glsl$/,
      use: ['raw-loader', 'glslify-loader'],
    });
    return config;
  },
};

// module.exports = {
//   // turbopack: {
//   //   rules: {
//   //     '*.glsl': {
//   //       loaders: ['raw-loader', 'glslify-loader'],
//   //       as: '*.js',
//   //     },
//   //   },
//   // },
// }

export default nextConfig;
