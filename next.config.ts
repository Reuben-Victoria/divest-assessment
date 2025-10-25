import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  sassOptions: {
   includePaths: ["./src/styles"],
    // prependData: `@use "based/variables";`,
  },
};

export default nextConfig;
