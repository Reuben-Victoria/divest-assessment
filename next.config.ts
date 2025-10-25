import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
    ],
  },

  sassOptions: {
    includePaths: ["./src/styles"],
    // prependData: `@use "based/variables";`,
  },
};

export default nextConfig;
