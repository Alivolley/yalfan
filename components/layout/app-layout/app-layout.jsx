import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';

// MUI
import { Backdrop, ThemeProvider, createTheme } from '@mui/material';

// Redux
import { Provider } from 'react-redux';
import store from '@/store/store';

// Components
import PagesLayout from '../pages-layout/pages-layout';
import LoadingComponent from '@/components/templates/loading-component/loading-component';

// Styles
import getDesignTokens from '@/configs/theme';
import 'react-toastify/dist/ReactToastify.css';

function Loading() {
   const [loading, setLoading] = useState(false);
   const router = useRouter();

   useEffect(() => {
      router.events.on('routeChangeStart', url => url !== router.asPath && setLoading(true));
      router.events.on('routeChangeComplete', url => url !== router.asPath && setLoading(false));
      router.events.on('routeChangeError', url => url !== router.asPath && setLoading(false));

      return () => {
         router.events.off('routeChangeStart', url => url !== router.asPath && setLoading(true));
         router.events.off('routeChangeComplete', url => url !== router.asPath && setLoading(false));
         router.events.off('routeChangeError', url => url !== router.asPath && setLoading(false));
      };
   });

   return (
      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={loading}>
         <LoadingComponent />
      </Backdrop>
   );
}

function AppLayout({ children }) {
   const router = useRouter();
   const direction = router.locale === 'en' ? 'ltr' : 'rtl';
   const themeConfig = createTheme(getDesignTokens('light', direction, router.locale));

   useEffect(() => {
      Cookies.set('NEXT_LOCALE', router.locale, { expires: 365 });
   }, [router.locale]);

   return (
      <Provider store={store}>
         <ThemeProvider theme={themeConfig}>
            <ToastContainer />
            <Loading />
            <PagesLayout dir={direction} language={router.locale}>
               {children}
            </PagesLayout>
         </ThemeProvider>
      </Provider>
   );
}

export default AppLayout;
