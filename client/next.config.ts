import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/image/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
    ],
  },
  env: {
    customKey: "novaraTo",
    local: "https://louyhanyrealestate-production.up.railway.app/api",
    img: "https://louyhanyrealestate-production.up.railway.app/",
    SecretToken: "novaraTo",
  },
};

export default nextConfig;
