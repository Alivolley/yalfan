// Components
import Banner from '@/components/pages/home/banner/banner';
import Categories from '@/components/pages/home/categories/categories';

export default function Home() {
   return (
      <main>
         <Banner />
         <Categories />
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
