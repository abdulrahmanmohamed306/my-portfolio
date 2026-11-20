import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/projects/kidney_disease", destination: "/projects/kidney-disease", permanent: true },
      { source: "/projects/ecommerce-customer-retention", destination: "/projects/retail-sales-profitability", permanent: true },
    ];
  },
};

export default nextConfig;
