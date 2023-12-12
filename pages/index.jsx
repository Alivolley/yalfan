// Components
import Introduce from '@/components/pages/home/Introduce/Introduce';
import Banner from '@/components/pages/home/banner/banner';
import Categories from '@/components/pages/home/categories/categories';
import OffersBanner from '@/components/pages/home/offers-banner/offers-banner';

export default function Home() {
   return (
      <main>
         <Banner />
         <Categories />
         <OffersBanner />
         <Introduce />
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
