import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import axiosInstance from '@/configs/axiosInstance';

// Components
import Introduce from '@/components/pages/home/Introduce/Introduce';
import Banner from '@/components/pages/home/banner/banner';
import BestSellers from '@/components/pages/home/best-sellers/best-sellers';
import BoldProducts from '@/components/pages/home/bold-products/bold-products';
import Categories from '@/components/pages/home/categories/categories';
import Newest from '@/components/pages/home/newest/newest';
import OffersBanner from '@/components/pages/home/offers-banner/offers-banner';

export default function Home({ categoryList, error, newestList, bestSellersList }) {
   const { locale } = useRouter();

   useEffect(() => {
      if (error) {
         toast.error(error, {
            style: {
               direction: locale === 'en' ? 'ltr' : 'rtl',
               fontFamily:
                  locale === 'en' ? 'poppins' : locale === 'fa' ? 'dana' : locale === 'ar' ? 'rubik' : 'poppins',
               lineHeight: '25px',
            },
            theme: 'colored',
            autoClose: 5000,
         });
      }
   }, [error]);

   return (
      <div>
         <Head>
            <title>{locale === 'fa' ? `یلفان` : `Yalfan`}</title>
         </Head>
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
      const categoryList = await axiosInstance(`store/categories/list_create/?lang=${context.locale}`).then(
         res => res.data
      );

      const newestList = await axiosInstance(
         `store/products/list_create/?lang=${context.locale}&ordering=created`
      ).then(res => res.data);

      const bestSellersList = await axiosInstance(
         `store/products/list_create/?lang=${context.locale}&ordering=sales`
      ).then(res => res.data);

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
