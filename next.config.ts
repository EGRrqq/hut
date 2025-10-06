import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const isProduction = process.env.NODE_ENV === 'production';

    return [{
      source: "/api/:path*",
      destination: isProduction ? "https://hut-server.vercel.app/api/:path*" : "http://localhost:5000/api/:path*"
    }];
  },
};

export default nextConfig;
