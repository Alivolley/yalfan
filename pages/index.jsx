// Components
import Banner from '@/components/pages/home/banner/banner';
import Categories from '@/components/pages/home/categories/categories';
import OffersBanner from '@/components/pages/home/offers-banner/offers-banner';

export default function Home() {
   return (
      <main>
         <Banner />
         <Categories />
         <OffersBanner />
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
