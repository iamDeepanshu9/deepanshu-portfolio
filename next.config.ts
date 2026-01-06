import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: 'admin.deepanshukumar.com',
            },
          ],
          destination: '/admin/:path*',
        },
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: 'admin.localhost(:\\d+)?',
            },
          ],
          destination: '/admin/:path*',
        },
      ]
    };
  },
  async redirects() {
    return [
      {
        source: '/admin/:path*',
        missing: [
          { type: 'host', value: 'admin.deepanshukumar.com' },
          { type: 'host', value: 'admin.localhost(:\\d+)?' }
        ],
        destination: '/404',
        permanent: false,
      }
    ];
  },
};

export default nextConfig;
