import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

// Configs
import axios from 'axios';

// MUI
import { Pagination } from '@mui/material';

// Assets
import noResult from '../../assets/images/search-not-found.png';

// components
import ProductCard from '@/components/templates/product-card/product-card';

function Search({ searchResultList, error }) {
   const { locale, push, query } = useRouter();
   const productNameQuery = query.productName;

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

   const changePageHandler = (e, newValue) => {
      push(`/search?productName=${productNameQuery}&page=${newValue}`);
   };

   return (
      <div className="bg-[#f6f2f3] p-8 customMd:px-16 customLg:py-16">
         <p className="text-center text-2xl font-bold">
            نتایج جستجو برای :<span className="text-customPinkHigh">{productNameQuery}</span>
         </p>

         <div className="mt-14 flex flex-wrap justify-center gap-5">
            {searchResultList?.total_objects === 0 ? (
               <div className="mt-4 w-[250px]">
                  <Image alt="no result" src={noResult} className="h-full w-full" priority />
               </div>
            ) : (
               searchResultList?.result?.map(item => <ProductCard key={item.id} detail={item} />)
            )}
         </div>
         {searchResultList?.total_objects !== 0 && (
            <div className="flex items-center justify-center py-16">
               <Pagination
                  count={searchResultList?.total_pages}
                  color="customPinkHigh"
                  page={Number(query?.page)}
                  onChange={changePageHandler}
                  sx={{
                     '& .Mui-selected': {
                        color: 'white !important',
                     },
                  }}
               />
            </div>
         )}
      </div>
   );
}

export default Search;

export async function getServerSideProps(context) {
   const { query, req } = context;
   const accessToken = req?.cookies?.yalfan_accessToken;

   try {
      const searchResultList = await axios('https://yalfantest.pythonanywhere.com/api/store/products/list_create/', {
         params: {
            search: query?.productName,
            page: query?.page,
         },
         ...(accessToken && {
            headers: {
               Authorization: `Bearer ${accessToken}`,
            },
         }),
      }).then(res => res.data);

      return {
         props: {
            messages: (await import(`../../messages/${context.locale}.json`)).default,
            searchResultList,
         },
      };
   } catch (error) {
      return {
         props: {
            messages: (await import(`../../messages/${context.locale}.json`)).default,
            error: error?.message,
         },
      };
   }
}
