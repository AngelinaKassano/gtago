// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'cdn.akamai.steamstatic.com',
      'media.contentapi.ea.com',
      'www.playstation.com',
      'nvidianews.nvidia.com'
    ],
  },
};

export default nextConfig;