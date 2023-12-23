import { useRouter } from 'next/router';

// Components
import Footer from '../footer/footer';
import Header from '../header/header';
import RtlProvider from '../rtlProvider/rtlProvider';

function PagesLayout({ children, dir, language }) {
   const router = useRouter();

   return (
      <div dir={dir} className={language === 'en' ? 'font-poppins' : language === 'fa' ? 'font-dana' : 'font-rubik'}>
         <RtlProvider isRtl={language !== 'en'}>
            {router.pathname !== '/login' && <Header language={language} />}
            <main>{children}</main>
            {router.pathname !== '/login' && <Footer language={language} />}
         </RtlProvider>
      </div>
   );
}

export default PagesLayout;
