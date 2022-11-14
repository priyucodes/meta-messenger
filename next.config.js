/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    // optimize image(for different screen sizes acc to our need etc. on the server)
    domains: ['links.papareact.com', 'scontent.fdel11-2.fna.fbcdn.net'],
  },
  // BETA still
  experimental: { appDir: true },
  // env: {
  //   PUSHER_SECRET_1: process.env.PUSHER_SECRET,
  // },
};
