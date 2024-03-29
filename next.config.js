/* eslint-disable @typescript-eslint/no-var-requires */
const { withSentryConfig } = require('@sentry/nextjs');

const sentryConfig = require('./config/sentry');
const svgrConfig = require('./config/svgr');

const isPreviewOrDevMode = ['preview', 'development'].includes(
  process.env.NEXT_PUBLIC_VERCEL_ENV
);
const shouldNoIndex = isPreviewOrDevMode;
const optimizationConfig = (config) => {
  if (isPreviewOrDevMode) {
    config.optimization.minimize = false;
    config.optimization.minimizer = [];
  }
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    scrollRestoration: true,
  },
  async headers() {
    const headers = [];
    if (shouldNoIndex) {
      headers.push({
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex',
          },
        ],
        source: '/:path*',
      });
    }
    return headers;
  },
  reactStrictMode: true,
  webpack(config, context) {
    svgrConfig(config);
    sentryConfig(config, context);
    optimizationConfig(config);
    return config;
  },
  productionBrowserSourceMaps: isPreviewOrDevMode,
  compiler: {
    emotion: {
      labelFormat: '[filename]_[local]',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_IMAGE_HOSTNAME,
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: process.env.NEXT_PUBLIC_LUNCH_IMAGE_HOSTNAME,
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_LUNCH_IMAGE_HOSTNAME,
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    deviceSizes: [576],
  },
  /* proxy */
  // async rewrites() {
  //   return [
  //     {
  //       source: '/',
  //       destination: 'https://dev.ssafsound.com',
  //     },
  //   ];
  // },
};

// eslint-disable-next-line import/order
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);

// Injected content via Sentry wizard below

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,

    org: 'ssafsound',
    project: 'ssaf-sound-fe',
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: false,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: '/monitoring',

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,
  }
);
