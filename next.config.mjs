/** @type {import('next').NextConfig} */
import path from 'path';

const __dirname = new URL('.', import.meta.url).pathname;

const nextConfig = {
  images: {
    unoptimized: true,
  },
  output: 'standalone',
  compiler: {
    styledComponents: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, './src/'),
    };
    return config;
  },
};

export default nextConfig;
