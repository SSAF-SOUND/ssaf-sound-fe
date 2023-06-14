// eslint-disable-next-line @typescript-eslint/no-var-requires
const svgrConfig = require('./config/svgr');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    svgrConfig(config);
    return config;
  },
  compiler: {
    emotion: {
      labelFormat: '[dirname]_[filename]_[local]',
    },
  },
};

module.exports = nextConfig;
