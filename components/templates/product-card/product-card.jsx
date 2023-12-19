import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';

// MUI
import { LoadingButton } from '@mui/lab';

// Icons
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';

// Assets
import productSample from '@/assets/images/product-sample.png';
import ProductCardStyle from './product-card.style';

function ProductCard({ isLiked = false, discount = false }) {
   const t = useTranslations('home');

   return (
      <ProductCardStyle
         href="/productDetail/کیف"
         className="w-[162px] shrink-0 rounded-10 bg-white p-2 customMd:w-[250px]"
      >
         <div
            className={`relative mb-5 flex h-[140px] items-center justify-center rounded-xl customMd:h-[230px] ${
               discount ? 'bg-[#FCF7F7]' : 'bg-[#F5F8FC]'
            }`}
            id="categoryImage"
         >
            <Link href="/productDetail/کیف" className="h-full w-full">
               <Image src={productSample} alt="product" className="h-full w-full object-contain" />
            </Link>
            <div className="absolute end-1.5 top-1.5 customMd:end-2 customMd:top-2">
               <LoadingButton
                  className="!h-[25px] !w-[25px] !min-w-0 !p-0 customMd:!h-[30px] customMd:!w-[30px]"
                  variant="contained"
                  color="white"
               >
                  {isLiked ? <FavoriteIcon color="customPink" /> : <FavoriteBorderIcon color="customPink" />}
               </LoadingButton>
            </div>
            {discount && (
               <p
                  className="absolute start-1.5 top-1.5 bg-[#F2485D] px-0.5 pb-3 pt-1.5 text-xs text-white
                   customMd:start-2 customMd:top-2 customMd:px-[3px] customMd:pb-4 customMd:pt-2 customMd:text-sm"
                  id="discount"
               >
                  20%
               </p>
            )}

            <p className="absolute bottom-1 end-1 flex items-center rounded-lg bg-white px-1.5 py-0.5 text-xs font-bold customMd:bottom-2 customMd:end-2">
               4.1 <StarIcon fontSize="small" color="customGold" />
            </p>
         </div>
         <Link href="/productDetail/کیف">
            <div className="flex items-center justify-between gap-1">
               <p className="h-5 overflow-hidden text-sm font-bold [-webkit-box-orient:vertical] [-webkit-line-clamp:1] [display:-webkit-box] customMd:text-base">
                  کیف دیبا
               </p>
               {discount && (
                  <p className="whitespace-nowrap text-10 text-[#7E95B0] line-through customMd:text-xs">
                     {Number(128000).toLocaleString()} {t('unit')}
                  </p>
               )}
            </div>
            <div className="mt-3 flex items-center justify-between gap-1">
               <p className="h-5 overflow-hidden text-xs text-[#7E95B0] [-webkit-box-orient:vertical] [-webkit-line-clamp:1] [display:-webkit-box] customMd:text-sm">
                  ساک دستی
               </p>
               <p className="whitespace-nowrap text-[13px] text-customPinkHigh customMd:text-base">
                  {Number(110000).toLocaleString()} {t('unit')}
               </p>
            </div>
         </Link>
      </ProductCardStyle>
   );
}

export default ProductCard;
