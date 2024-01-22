import Head from 'next/head';
import { useTranslations } from 'next-intl';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

// Configs
import axios from 'axios';

// MUI
import { Button, Pagination } from '@mui/material';

// Icons
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

// Assets
import noResult from '@/assets/images/search-not-found.png';
import categoriesIcon from '@/assets/icons/categories-icon.svg';

// components
import ProductCard from '@/components/templates/product-card/product-card';

function Search({ searchResultList, error, suggestsList }) {
   const t = useTranslations('search');
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
      <>
         <Head>
            <title>{locale === 'fa' ? `یلفان - ${productNameQuery}` : `Yalfan-${productNameQuery}`}</title>
         </Head>
         <div className="bg-[#f6f2f3] p-8 customMd:px-16 customLg:pb-6 customLg:pt-16">
            <p className="text-center text-2xl font-bold">
               {t('Results for :')} <span className="text-customPinkHigh">{productNameQuery}</span>
            </p>

            <div className="mt-14 flex flex-wrap justify-center gap-5">
               {searchResultList?.total_objects === 0 ? (
                  <div>
                     <p className="mb-10 text-center font-bold">{t('No product with this title')}</p>
                     <div className="mt-4 w-[250px]">
                        <Image alt="no result" src={noResult} className="h-full w-full" priority />
                     </div>
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
                        '& .Mui-selected': { color: 'white !important' },
                     }}
                  />
               </div>
            )}
         </div>
         <section className="bg-[#FCF7F7] px-8 py-[70px] customMd:px-16">
            <div className="flex items-center justify-between border-b border-solid border-[#E4EAF0] pb-2">
               <div className="flex items-center gap-2">
                  <Image src={categoriesIcon} alt="categories" />
                  <p className="text-lg font-bold text-textColor">{t('Our suggestion')}</p>
               </div>
               <Link href="/categoryDetail" className="hidden customMd:block">
                  <Button
                     endIcon={locale === 'en' ? <KeyboardArrowRightIcon /> : <KeyboardArrowLeftIcon />}
                     color="textColor"
                  >
                     {t('Show all')}
                  </Button>
               </Link>
            </div>

            <div className="mt-10 flex items-center gap-4 overflow-auto pb-5">
               {suggestsList?.result?.map(item => (
                  <ProductCard key={item.id} detail={item} />
               ))}
            </div>

            <Link href="/categoryDetail" className="mt-8 block customMd:hidden">
               <Button
                  color="white"
                  variant="contained"
                  size="large"
                  className="!rounded-10 !py-4 !text-customPinkHigh"
                  fullWidth
                  startIcon={<ShoppingCartIcon />}
               >
                  {t('Show all')}
               </Button>
            </Link>
         </section>
      </>
   );
}

export default Search;

export async function getServerSideProps(context) {
   const { query, req, locale } = context;
   const accessToken = req?.cookies?.yalfan_accessToken;
   const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

   try {
      const searchResultList = await axios(`${baseURL}api/store/products/list_create/`, {
         params: {
            lang: locale,
            search: query?.productName,
            page: query?.page,
         },
         ...(accessToken && {
            headers: {
               Authorization: `Bearer ${accessToken}`,
            },
         }),
      }).then(res => res.data);

      const suggestsList = await axios(`${baseURL}api/store/products/list_create/`, {
         params: {
            lang: locale,
            suggest: true,
         },
      }).then(res => res.data);

      return {
         props: {
            messages: (await import(`../../messages/${context.locale}.json`)).default,
            searchResultList,
            suggestsList,
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
