import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["cdn.discordapp.com", "placecats.com"]
  },
  // Proxy API requests to the backend server, I don't understand why this is necessary
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/api/:path*',
      },
    ];
  }
};

export default nextConfig;
