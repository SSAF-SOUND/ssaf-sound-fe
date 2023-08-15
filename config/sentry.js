const sentry = (config, { webpack }) => {
  // First Load JS 약 10KB 감소
  config.plugins.push(
    new webpack.DefinePlugin({
      __SENTRY_DEBUG__: false,
      __SENTRY_TRACING__: false,
    })
  );
  return config;
};

module.exports = sentry;
