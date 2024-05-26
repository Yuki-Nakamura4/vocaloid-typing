/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  webpack(config, options) {
    config.module.rules.push({
      test: /\.mp3$/,
      use: {
        loader: "url-loader",
        options: {},
      },
    });
    return config;
  },
};

module.exports = nextConfig;
