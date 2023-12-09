import { useTranslations } from 'next-intl';

// Components
import Banner from '@/components/pages/home/banner/banner';

export default function Home() {
   const t = useTranslations('home');

   return (
      <main>
         <Banner />
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
