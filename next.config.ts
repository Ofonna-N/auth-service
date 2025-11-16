import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config: any, { isServer }: { isServer: boolean }) => {
    if (isServer) {
      config.externals.push({
        "@prisma/client": "commonjs @prisma/client",
      });
    }
    return config;
  },
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client", "@prisma/engines"],
  },
};

export default nextConfig;
