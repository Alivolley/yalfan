import { useTranslations } from 'next-intl';

export default function Home() {
   const t = useTranslations('home');

   return (
      <main>
         {/* {t('welcome')} */}
         {/* {t('welcome')} */}
         {/* {t('welcome')} */}
      </main>
   );
}

export async function getStaticProps(context) {
   return {
      props: {
         messages: (await import(`../messages/${context.locale}.json`)).default,
      },
   };
}
