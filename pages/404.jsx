import { useTranslations } from 'next-intl';

export default function Custom404() {
   const t = useTranslations('home');

   return (
      <h1 className="bg-[#fcf7f7] px-8 py-[150px] text-center text-xl font-bold customSm:text-2xl customMd:px-16">
         {t('Page not found')}
      </h1>
   );
}

export async function getStaticProps(context) {
   return {
      props: {
         messages: (await import(`../messages/${context.locale}.json`)).default,
      },
   };
}
