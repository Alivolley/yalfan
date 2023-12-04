import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';

// MUI
import { ThemeProvider, createTheme } from '@mui/material';

// Redux
import { Provider } from 'react-redux';
import store from '../../../store/store';

// Components
import PagesLayout from '../pages-layout/pages-layout';

// Styles
import getDesignTokens from '@/configs/theme';
import 'react-toastify/dist/ReactToastify.css';

function AppLayout({ children }) {
   const themeConfig = createTheme(getDesignTokens('light'));
   const router = useRouter();

   return (
      <Provider store={store}>
         <ThemeProvider theme={themeConfig}>
            <ToastContainer />
            <PagesLayout dir={router.locale === 'en' ? 'ltr' : 'rtl'}>{children}</PagesLayout>
         </ThemeProvider>
      </Provider>
   );
}

export default AppLayout;
