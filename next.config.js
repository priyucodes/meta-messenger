/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    // optimize image(for different screen sizes acc to our need etc. on the server)
    domains: ['links.papareact.com'],
  },
  // BETA still
  experimental: { appDir: true },
};
