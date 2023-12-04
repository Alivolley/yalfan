/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: true,

   i18n: {
      locales: ['fa', 'en', 'ar'],
      defaultLocale: 'fa',
      localeDetection: false,
   },
};

module.exports = nextConfig;
