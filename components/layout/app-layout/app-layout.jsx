import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';

// MUI
import { ThemeProvider, createTheme } from '@mui/material';

// Redux
import { Provider } from 'react-redux';
import store from '@/store/store';

// Components
import PagesLayout from '../pages-layout/pages-layout';

// Styles
import getDesignTokens from '@/configs/theme';
import 'react-toastify/dist/ReactToastify.css';

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
            <PagesLayout dir={direction} language={router.locale}>
               {children}
            </PagesLayout>
         </ThemeProvider>
      </Provider>
   );
}

export default AppLayout;
