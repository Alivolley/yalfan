/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['mui-one-time-password-input']);

const nextConfig = {
   reactStrictMode: true,

   i18n: {
      locales: ['fa', 'en', 'ar'],
      defaultLocale: 'fa',
      localeDetection: false,
   },
};

module.exports = withTM(nextConfig);
