import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    domains: ['a.espncdn.com'], // ✅ add this line
  },
};

export default nextConfig;
