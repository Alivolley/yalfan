import { useTranslations } from 'next-intl';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';

// Redux
import { useSelector } from 'react-redux';

// MUI
import { Grid, Rating } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// Icons
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

// Assets
import productSample from '@/assets/images/product-sample2.png';
import productSample2 from '@/assets/images/productDetailSample.png';

// Apis
import useGetFavorites from '@/apis/favorites/useGetFavorites';
import useToggleFavorites from '@/apis/favorites/useToggleFavorites';

function ProductDetail({ error, productDetail }) {
   const isLogin = useSelector(state => state?.loginStatusReducer);
   const { locale } = useRouter();
   const t = useTranslations('home');

   const { trigger: toggleFavoriteTrigger, isMutating: toggleFavoriteIsMutating } = useToggleFavorites();
   const { data: favoritesData } = useGetFavorites(isLogin);
   const isLiked = favoritesData?.find(item => item?.id === productDetail?.id);

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

   const toggleLike = () => {
      if (isLogin) {
         toggleFavoriteTrigger(productDetail?.id);
      } else {
         toast.info(t('To add to your favorites , you need to login first'), {
            style: {
               direction: locale === 'en' ? 'ltr' : 'rtl',
               fontFamily:
                  locale === 'en' ? 'poppins' : locale === 'fa' ? 'dana' : locale === 'ar' ? 'rubik' : 'poppins',
               lineHeight: '25px',
               fontSize: '14px',
            },
            theme: 'colored',
            autoClose: 5000,
         });
      }
   };

   return (
      <div className="bg-[#fcf7f7] px-8 py-[60px] customMd:px-16">
         <Grid container columnSpacing={4}>
            <Grid item xs={12} md={6}>
               <div className="h-[250px] w-full customSm:h-[500px]">
                  <Image src={productSample2} alt="product" className="h-full w-full rounded-2xl object-cover" />
               </div>

               <div className="mt-3">
                  <Grid container spacing={1}>
                     <Grid item xs={2} xl={1}>
                        <div className="h-[40px] w-full customSm:h-[80px] customMd:h-[60px]">
                           <Image
                              src={productSample}
                              alt="product"
                              className="h-full w-full cursor-pointer rounded-[4px] object-cover"
                           />
                        </div>
                     </Grid>
                     <Grid item xs={2} xl={1}>
                        <div className="h-[40px] w-full customSm:h-[80px] customMd:h-[60px]">
                           <Image
                              src={productSample2}
                              alt="product"
                              className="h-full w-full cursor-pointer rounded-[4px] object-cover"
                           />
                        </div>
                     </Grid>
                     <Grid item xs={2} xl={1}>
                        <div className="h-[40px] w-full customSm:h-[80px] customMd:h-[60px]">
                           <Image
                              src={productSample}
                              alt="product"
                              className="h-full w-full cursor-pointer rounded-[4px] object-cover"
                           />
                        </div>
                     </Grid>
                     <Grid item xs={2} xl={1}>
                        <div className="h-[40px] w-full customSm:h-[80px] customMd:h-[60px]">
                           <Image
                              src={productSample2}
                              alt="product"
                              className="h-full w-full cursor-pointer rounded-[4px] object-cover"
                           />
                        </div>
                     </Grid>
                     <Grid item xs={2} xl={1}>
                        <div className="h-[40px] w-full customSm:h-[80px] customMd:h-[60px]">
                           <Image
                              src={productSample}
                              alt="product"
                              className="h-full w-full cursor-pointer rounded-[4px] object-cover"
                           />
                        </div>
                     </Grid>
                  </Grid>
               </div>
            </Grid>

            <Grid item xs={12} md={6}>
               <div className="">
                  <div className="flex items-start justify-between gap-1">
                     <p className="text-2xl font-bold">کیف دستی مدل دیبا</p>
                     <LoadingButton
                        className="!h-[25px] !w-[25px] !min-w-0 !shrink-0 !p-0 customMd:!h-[30px] customMd:!w-[30px]"
                        variant="contained"
                        color="customPink2"
                        onClick={toggleLike}
                        loading={toggleFavoriteIsMutating}
                     >
                        {isLiked ? (
                           <FavoriteIcon color="customPinkHigh" />
                        ) : (
                           <FavoriteBorderIcon color="customPinkHigh" />
                        )}
                     </LoadingButton>
                  </div>

                  <div className="mt-5 flex items-center gap-5 text-xs">
                     <p>
                        <Rating value={4} readOnly size="small" sx={{ color: '#D14D72' }} />
                     </p>
                     <div className="flex items-center gap-1 text-10">
                        <p>4.5</p>
                        <p className="text-textColor">( از ۳۰۰ نظر )</p>
                     </div>
                     <p className="flex items-center gap-1 text-textColor">
                        <QuestionAnswerOutlinedIcon color="customPink" fontSize="small" /> 2دیدگاه
                     </p>
                  </div>
               </div>
            </Grid>
         </Grid>

         {/* <div className="mt-9 bg-white p-5">
            <div>
               <Grid container columnSpacing={3}>
                  <Grid item xs={12} md={7}>
                     <div>
                        <p className="flex items-center gap-2 text-xl font-bold text-customBlue">
                           <InfoOutlinedIcon /> درباره محصول
                        </p>
                        <p className="mt-4 text-sm text-customBlue">
                           ورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است،
                           چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی
                           تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در
                           شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها
                           شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی
                           ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط
                           سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچین
                        </p>
                        <div className="mt-14">
                           <p className="flex items-center gap-1 text-sm">
                              <ColorLensOutlinedIcon fontSize="small" color="customBlue" /> رنگ های موجود
                           </p>
                        </div>
                     </div>
                  </Grid>
                  <Grid item xs={12} md={5}>
                     <div className="">some</div>
                  </Grid>
               </Grid>
            </div>
         </div> */}
      </div>
   );
}

export default ProductDetail;

export async function getServerSideProps(context) {
   const { query, locale } = context;

   try {
      const productDetail = await axios(
         'https://yalfantest.pythonanywhere.com/api/store/products/get_update_destroy/',
         {
            params: {
               lang: locale,
               // pk: query?.productTitle,
               pk: 1,
            },
         }
      ).then(res => res.data);

      return {
         props: {
            messages: (await import(`../../messages/${context.locale}.json`)).default,
            productDetail,
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
