/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['mui-one-time-password-input']);

const nextConfig = {
   reactStrictMode: true,

   images: {
      domains: ['yalfan.com'],
   },

   i18n: {
      locales: ['fa', 'en', 'ar'],
      defaultLocale: 'fa',
   },
};

module.exports = withTM(nextConfig);
