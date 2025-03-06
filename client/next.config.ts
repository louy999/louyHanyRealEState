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
    local: "http://localhost:5000/api",
    // local: "https://louyhanyrealestate-production.up.railway.app/api",
    // img: "https://louyhanyrealestate-production.up.railway.app/",
    img: "http://localhost:5000",
    SecretToken: "novaraTo",
  },
};

export default nextConfig;
