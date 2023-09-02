const webpack = require("webpack");
module.exports = function override(config, env) {
  config.ignoreWarnings = [/Failed to parse source map/];
  
  config.resolve.fallback = {
    crypto: false,
    stream: require.resolve("stream-browserify"),
    assert: require.resolve("assert"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: require.resolve("os-browserify"),
    url: require.resolve("url"),
    tls: false,
    path: require.resolve("path"),
    fs: false,
    net: false,
    zlib: false,
    polyfill:require.resolve("polyfill"),
    constants: false,
    vm: false,
    child_process: false,
  };
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    })
  );

  return config;
};
