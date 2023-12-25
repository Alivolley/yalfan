import { useRouter } from 'next/router';

// Redux
import { useSelector } from 'react-redux';

// Components
import Footer from '../footer/footer';
import Header from '../header/header';
import RtlProvider from '../rtlProvider/rtlProvider';

function PagesLayout({ children, dir, language }) {
   const router = useRouter();
   const isLogin = useSelector(state => state?.loginStatusReducer);

   return (
      <div
         dir={dir}
         className={language === 'en' ? 'font-poppins' : language === 'fa' ? 'font-dana' : 'font-rubik'}
         id="pageLayout"
      >
         <RtlProvider isRtl={language !== 'en'}>
            {router.pathname !== '/login' && <Header language={language} isLogin={isLogin} />}
            <main>{children}</main>
            {router.pathname !== '/login' && <Footer language={language} />}
         </RtlProvider>
      </div>
   );
}

export default PagesLayout;
