import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const source = "/api/v1/:path*"
    const isProduction = process.env.NODE_ENV === 'production';

    return [{
      source,
      destination: isProduction
        ? `https://hut-server.vercel.app/${source}`
        : `http://localhost:5000/${source}`,
    }];
  },
};

export default nextConfig;
