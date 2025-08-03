import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_URL ? 
    (() => {
      const pathname = new URL(process.env.NEXT_PUBLIC_BASE_URL).pathname;
      return pathname === '/' ? '' : pathname;
    })() 
    : '',
};

export default nextConfig;
