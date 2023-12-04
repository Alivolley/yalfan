import { NextIntlClientProvider } from 'next-intl';
import { useRouter } from 'next/router';
import AppLayout from '@/components/layout/app-layout/app-layout';
import '@/styles/globals.css';
import '@/styles/reset.css';

export default function App({ Component, pageProps }) {
   const router = useRouter();

   return (
      <NextIntlClientProvider locale={router.locale} messages={pageProps.messages}>
         <AppLayout>
            <Component {...pageProps} />
         </AppLayout>
      </NextIntlClientProvider>
   );
}
