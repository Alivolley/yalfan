// Components
import Introduce from '@/components/pages/home/Introduce/Introduce';
import Banner from '@/components/pages/home/banner/banner';
import BestSellers from '@/components/pages/home/best-sellers/best-sellers';
import BoldProducts from '@/components/pages/home/bold-products/bold-products';
import Categories from '@/components/pages/home/categories/categories';
import Newest from '@/components/pages/home/newest/newest';
import OffersBanner from '@/components/pages/home/offers-banner/offers-banner';

export default function Home() {
   return (
      <main>
         <Banner />
         <Categories />
         <OffersBanner />
         <Introduce />
         <Newest />
         <BoldProducts />
         <BestSellers />
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
