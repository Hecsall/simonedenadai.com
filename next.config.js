/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['react-syntax-highlighter'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  webpack(config, options) {
    const { options: loaderOptions } = config.module.rules.find(rule => rule.test && rule.test.test('.svg'))
    config.module.rules.push({
      test: /\.svg$/i,
			issuer: /\.[jt]sx?$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: '@svgr/webpack',
          options: {
            babel: false,
            svgo: false,
          },
        },
      ],
    });

    return config;
  }
}

module.exports = nextConfig
