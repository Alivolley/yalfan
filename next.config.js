/** @type {import('next').NextConfig} */

const mainBaseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
const sliced = mainBaseURL?.slice(8);
const baseURl = sliced?.slice(0, -1);

const withTM = require('next-transpile-modules')(['mui-one-time-password-input']);

const nextConfig = {
   reactStrictMode: true,

   images: {
      remotePatterns: [
         {
            hostname: baseURl,
         },
      ],
   },

   i18n: {
      locales: ['fa', 'en', 'ar'],
      defaultLocale: 'fa',
      localeDetection: false,
   },
};

module.exports = withTM(nextConfig);
