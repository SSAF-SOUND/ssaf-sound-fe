/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    emotion: {
      labelFormat: '[dirname]_[filename]_[local]',
    },
  },
};

module.exports = nextConfig;
