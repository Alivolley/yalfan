import Header from '../header/header';
import RtlProvider from '../rtlProvider/rtlProvider';

function PagesLayout({ children, dir, language }) {
   return (
      <div dir={dir} className={language === 'en' ? 'font-poppins' : language === 'fa' ? 'font-dana' : 'font-dana'}>
         <RtlProvider isRtl={language !== 'en'}>
            <Header language={language} />
            <main>{children}</main>
         </RtlProvider>
      </div>
   );
}

export default PagesLayout;
