import Head from 'next/head';
import { NextIntlClientProvider } from 'next-intl';
import { useRouter } from 'next/router';
import AppLayout from '@/components/layout/app-layout/app-layout';
import '@/styles/globals.css';
import '@/styles/reset.css';

export default function App({ Component, pageProps }) {
   const { locale } = useRouter();
   const timeZone = 'Europe/Vienna';

   return (
      <NextIntlClientProvider locale={locale} messages={pageProps.messages} timeZone={timeZone}>
         <Head>
            <title>{locale === 'fa' ? 'یلفان' : 'Yalfan'}</title>
            <meta name="description" content="Your website description here" />
            <meta name="keywords" content="comma, separated, keywords" />
            <meta name="author" content={locale === 'fa' ? 'یلفان' : 'Yalfan'} />
            <meta name="enamad" content="101500" />
         </Head>
         <AppLayout>
            <Component {...pageProps} />
         </AppLayout>
      </NextIntlClientProvider>
   );
}
