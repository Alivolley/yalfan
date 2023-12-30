import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import axios from 'axios';

// Components
import Introduce from '@/components/pages/home/Introduce/Introduce';
import Banner from '@/components/pages/home/banner/banner';
import BestSellers from '@/components/pages/home/best-sellers/best-sellers';
import BoldProducts from '@/components/pages/home/bold-products/bold-products';
import Categories from '@/components/pages/home/categories/categories';
import Newest from '@/components/pages/home/newest/newest';
import OffersBanner from '@/components/pages/home/offers-banner/offers-banner';

export default function Home({ categoryList, error, newestList, bestSellersList }) {
   const router = useRouter();

   if (error) {
      toast.error(error, {
         style: {
            direction: router.locale === 'en' ? 'ltr' : 'rtl',
            fontFamily:
               router.locale === 'en'
                  ? 'poppins'
                  : router.locale === 'fa'
                    ? 'dana'
                    : router.locale === 'ar'
                      ? 'rubik'
                      : 'poppins',
            lineHeight: '25px',
         },
         theme: 'colored',
         autoClose: 5000,
      });
   }

   return (
      <div>
         <Banner />
         <Categories detail={categoryList} />
         <OffersBanner />
         <Introduce />
         <Newest detail={newestList} />
         <BoldProducts />
         <BestSellers detail={bestSellersList} />
      </div>
   );
}

export async function getStaticProps(context) {
   try {
      const categoryList = await axios('https://yalfantest.pythonanywhere.com/api/store/categories/list_create/', {
         params: {
            lang: context.locale,
         },
      }).then(res => res.data);

      const newestList = await axios('https://yalfantest.pythonanywhere.com/api/store/products/list_create/', {
         params: {
            lang: context.locale,
            ordering: 'created',
         },
      }).then(res => res.data);

      const bestSellersList = await axios('https://yalfantest.pythonanywhere.com/api/store/products/list_create/', {
         params: {
            lang: context.locale,
            ordering: 'sales',
         },
      }).then(res => res.data);

      return {
         props: {
            messages: (await import(`../messages/${context.locale}.json`)).default,
            categoryList,
            newestList,
            bestSellersList,
         },
         revalidate: 300,
      };
   } catch (error) {
      return {
         props: {
            messages: (await import(`../messages/${context.locale}.json`)).default,
            error: error?.message,
         },
      };
   }
}
