import Head from 'next/head';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';

// MUI
import { Button, Grid } from '@mui/material';

// Icons
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import EastIcon from '@mui/icons-material/East';

// Config
import axiosInstance from '@/configs/axiosInstance';

// Assets
import contactUsPic1 from '@/assets/images/contactUsPic1.png';
import contactUsPic2 from '@/assets/images/contactUsPic2.png';
import bagIcon from '@/assets/icons/introduce-bag.svg';
import CategoryCard from '@/components/templates/category-card/category-card';

function AboutUs({ categoryList, error }) {
   const t = useTranslations('home');
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
      <>
         <Head>
            <title>{locale === 'fa' ? 'یلفان - درباره ما' : 'Yalfan-about us'}</title>
         </Head>
         <div className="bg-[#fcf7f7] px-8 py-16 customMd:px-16">
            <Grid container spacing={4}>
               <Grid item xs={12} md={7} order={{ xs: 2, md: 1 }}>
                  <div className="flex h-full flex-col justify-center">
                     <p className="text-xl font-bold text-[#000B2C] customMd:text-4xl">
                        {t('with yalfan')} {t('make great styles')}
                     </p>
                     <p className="my-8 text-sm leading-[30px] customMd:text-lg customMd:leading-[40px]">
                        {t('lorem')} {t('lorem')}
                     </p>
                     <div className="flex flex-col-reverse gap-5 customMd:flex-row customMd:items-center customMd:gap-8">
                        <Link href="/categoryDetail">
                           <Button
                              color="customPinkLow"
                              variant="contained"
                              size="large"
                              className="!w-full !rounded-10 !py-4 !text-customPinkHigh customMd:!font-bold"
                              startIcon={<Image src={bagIcon} alt="bag" />}
                           >
                              {t('shop now')}
                           </Button>
                        </Link>
                        <Link href="/categoryDetail" className="hidden customMd:block">
                           <Button
                              color="customPinkHigh"
                              className="!w-full !font-bold"
                              size="large"
                              endIcon={locale === 'en' ? <EastIcon /> : <KeyboardBackspaceIcon />}
                           >
                              {t('see all products')}
                           </Button>
                        </Link>
                        <Link href="/categoryDetail" className="block customMd:hidden">
                           <Button
                              color="customPinkHigh"
                              className="!w-full !rounded-10 !py-3"
                              size="large"
                              variant="outlined"
                              endIcon={locale === 'en' ? <EastIcon /> : <KeyboardBackspaceIcon />}
                           >
                              {t('see all products')}
                           </Button>
                        </Link>
                     </div>
                  </div>
               </Grid>

               <Grid item xs={12} md={5} order={{ xs: 1, md: 2 }}>
                  <div className="size-full">
                     <Image
                        src={contactUsPic1}
                        alt="introduce"
                        className="h-[250px] w-full object-contain customMd:h-full"
                     />
                  </div>
               </Grid>
            </Grid>
         </div>

         <div className="bg-[#F5F8FC] px-8 py-[70px] customMd:px-16">
            <div className="space-y-5 text-center">
               <p className="text-2xl font-bold">محصولات فروشگاه یلفان</p>
               <p className="text-base leading-[30px] text-[#626E94]">
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک{' '}
               </p>
            </div>
            <div className="mt-10 flex items-stretch gap-5 overflow-auto">
               {categoryList?.map((item, index) => index < 5 && <CategoryCard key={item?.id} detail={item} />)}
            </div>
         </div>

         <div className="bg-[#fcf7f7] px-8 py-16 customMd:px-16">
            <Grid container spacing={{ md: 8 }}>
               <Grid item xs={12} md={5}>
                  <div className="size-full">
                     <Image
                        src={contactUsPic2}
                        alt="introduce"
                        className="h-[250px] w-full object-contain customMd:h-full"
                     />
                  </div>
               </Grid>
               <Grid item xs={12} md={7}>
                  <div className="mt-7 flex h-full flex-col justify-center customMd:mt-0">
                     <p className="text-xl font-bold text-[#000B2C] customMd:text-4xl">
                        {t('with yalfan')} {t('make great styles')}
                     </p>
                     <p className="my-8 text-sm leading-[30px] customMd:text-lg customMd:leading-[40px]">
                        {t('lorem')} {t('lorem')} {t('lorem')}
                     </p>
                  </div>
               </Grid>
            </Grid>
         </div>
      </>
   );
}

export default AboutUs;

export async function getStaticProps(context) {
   try {
      const categoryList = await axiosInstance(`store/categories/list_create/`, {
         params: {
            lang: context.locale,
         },
      }).then(res => res.data);

      return {
         props: {
            messages: (await import(`../../messages/${context.locale}.json`)).default,
            categoryList,
         },
         revalidate: 600,
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
