import AppLayout from '@/components/layout/app-layout/app-layout';
import '@/styles/globals.css';
import '@/styles/reset.css';

export default function App({ Component, pageProps }) {
   return (
      <AppLayout>
         <Component {...pageProps} />
      </AppLayout>
   );
}
