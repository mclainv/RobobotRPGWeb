import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // Expose the API_URL environment variable to the browser
  env: {
    API_URL: process.env.API_URL || 'http://localhost:3001',
  },
  images: {
    domains: ["cdn.discordapp.com", "placecats.com"]
  }
};

export default nextConfig;