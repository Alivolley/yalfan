import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

// Redux
import { useSelector } from 'react-redux';

// MUI
import { LoadingButton } from '@mui/lab';

// Icons
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';

// Assets
import ProductCardStyle from './product-card.style';

// Apis
import useToggleFavorites from '@/apis/favorites/useToggleFavorites';
import useGetFavorites from '@/apis/favorites/useGetFavorites';

function ProductCard({ detail }) {
   const t = useTranslations('home');
   const { locale } = useRouter();
   const isLogin = useSelector(state => state?.loginStatusReducer);

   const { trigger: toggleFavoriteTrigger, isMutating: toggleFavoriteIsMutating } = useToggleFavorites();
   const { data: favoritesData } = useGetFavorites(isLogin);
   const isLiked = favoritesData?.find(item => item?.id === detail?.id);

   const toggleLike = () => {
      if (isLogin) {
         toggleFavoriteTrigger(detail?.id);
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
      <ProductCardStyle
         href={`/productDetail/${detail?.title}`}
         className="w-[162px] shrink-0 rounded-10 bg-white p-2 customMd:w-[250px]"
      >
         <div
            className={`relative mb-5 flex h-[140px] items-center justify-center rounded-xl customMd:h-[230px] ${
               detail?.percentage ? 'bg-[#FCF7F7]' : 'bg-[#F5F8FC]'
            }`}
            id="categoryImage"
         >
            <Link href={`/productDetail/${detail?.title}`} className="h-full w-full">
               <img src={detail?.cover} alt={detail?.title} className="h-full w-full object-contain" />
            </Link>
            <div className="absolute end-1.5 top-1.5 customMd:end-2 customMd:top-2">
               <LoadingButton
                  className="!h-[25px] !w-[25px] !min-w-0 !p-0 customMd:!h-[30px] customMd:!w-[30px]"
                  variant="contained"
                  color="white"
                  onClick={toggleLike}
                  loading={toggleFavoriteIsMutating}
               >
                  {isLiked ? <FavoriteIcon color="customPink" /> : <FavoriteBorderIcon color="customPink" />}
               </LoadingButton>
            </div>
            {detail?.percentage ? (
               <p
                  className="absolute start-1.5 top-1.5 bg-[#F2485D] px-0.5 pb-3 pt-1.5 text-xs text-white
                   customMd:start-2 customMd:top-2 customMd:px-[3px] customMd:pb-4 customMd:pt-2 customMd:text-sm"
                  id="discount"
               >
                  {detail?.percentage}%
               </p>
            ) : null}

            <p className="absolute bottom-1 end-1 flex items-center rounded-lg bg-white px-1.5 py-0.5 text-xs font-bold customMd:bottom-2 customMd:end-2">
               {detail?.average_score} <StarIcon fontSize="small" color="customGold" />
            </p>
         </div>
         <Link href={`/productDetail/${detail?.title}`}>
            <div className="flex items-center justify-between gap-1">
               <p className="h-[22px] overflow-hidden text-sm font-bold [-webkit-box-orient:vertical] [-webkit-line-clamp:1] [display:-webkit-box] customMd:text-base">
                  {detail?.title}
               </p>
               {detail?.percentage ? (
                  <p className="whitespace-nowrap text-10 text-[#7E95B0] line-through customMd:text-xs">
                     {Number(detail?.before_discount_price).toLocaleString()} {t('unit')}
                  </p>
               ) : null}
            </div>
            <div className="mt-3 flex items-center justify-between gap-1">
               <p className="h-5 overflow-hidden text-xs text-[#7E95B0] [-webkit-box-orient:vertical] [-webkit-line-clamp:1] [display:-webkit-box] customMd:text-sm">
                  {detail?.category}
               </p>
               <p className="whitespace-nowrap text-[13px] text-customPinkHigh customMd:text-base">
                  {Number(detail?.price).toLocaleString()} {t('unit')}
               </p>
            </div>
         </Link>
      </ProductCardStyle>
   );
}

export default ProductCard;
