import Head from 'next/head';
import { NextIntlClientProvider } from 'next-intl';
import { useRouter } from 'next/router';
import AppLayout from '@/components/layout/app-layout/app-layout';
import '@/styles/globals.css';
import '@/styles/reset.css';

export default function App({ Component, pageProps }) {
   const { locale } = useRouter();

   return (
      <NextIntlClientProvider locale={locale} messages={pageProps.messages}>
         <Head>
            <title>{locale === 'fa' ? 'یلفان' : 'Yalfan'}</title>
            <meta name="description" content="Your website description here" />
            <meta name="keywords" content="comma, separated, keywords" />
            <meta name="author" content={locale === 'fa' ? 'یلفان' : 'Yalfan'} />
         </Head>
         <AppLayout>
            <Component {...pageProps} />
         </AppLayout>
      </NextIntlClientProvider>
   );
}
