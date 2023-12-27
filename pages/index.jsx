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

export default function Home({ categoryList, error }) {
   const router = useRouter();
   console.log(categoryList);

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
         <Newest />
         <BoldProducts />
         <BestSellers />
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
      // const foodPartyList = await axiosInstance('restaurant/foods/discounted/').then(res => res.data);
      // const dailyMenuList = await axiosInstance('restaurant/today-menu/get_update_delete/').then(res => res.data);
      // const lastComments = await axiosInstance('restaurant/comments/list_create/?last_five=true').then(res => res.data);

      return {
         props: {
            messages: (await import(`../messages/${context.locale}.json`)).default,
            categoryList,
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
