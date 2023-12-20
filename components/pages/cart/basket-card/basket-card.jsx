import { useTranslations } from 'next-intl';
import Image from 'next/image';

// MUI
import { IconButton } from '@mui/material';

// Icons
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

// Assets
import productPic from '@/assets/images/product-sample.png';
import discountShape from '@/assets/images/discount-shape.png';

function BasketCard({ hasDiscount }) {
   const t = useTranslations('home');

   return (
      <>
         <div className="hidden gap-5 rounded-2xl bg-white p-5 customMd:flex">
            <div className="h-[123px] w-[133px] shrink-0 rounded-xl bg-[#f5f8fc] p-4">
               <Image src={productPic} alt="product" className="h-full w-full object-cover" />
            </div>
            <div className="flex grow justify-between">
               <div className="flex flex-col justify-between">
                  <p className="font-bold">کیــف دیــبـا</p>
                  <div className="flex items-center gap-2 text-sm text-textColor">
                     <p>رنگ انتخاب شده : </p>
                     <div className="h-6 w-6 shrink-0 rounded-full bg-blue-700" />
                  </div>
                  <div />
               </div>
               <div className="flex flex-col items-end justify-between gap-7">
                  <div className="flex h-10 items-center gap-2">
                     {hasDiscount && (
                        <>
                           <div className="relative">
                              <Image src={discountShape} alt="discount" />
                              <p className="absolute right-[7px] top-[13px] text-10 text-white">40%</p>
                           </div>
                           <p className="text-sm text-[#B1B5C4] line-through">
                              {Number(125000).toLocaleString()} {t('unit')}
                           </p>
                        </>
                     )}
                  </div>
                  <p className="text-customPinkHigh">
                     {Number(345000).toLocaleString()} {t('unit')}
                  </p>
                  <div className="flex items-center justify-center gap-3">
                     <IconButton
                        className="!border !border-solid !border-textColor"
                        sx={{ width: '30px', height: '30px' }}
                     >
                        <RemoveIcon color="textColor" className="!text-base" />
                     </IconButton>
                     <p className="text-lg font-bold text-customPinkHigh">5</p>
                     <IconButton
                        className="!border !border-solid !border-customPink"
                        sx={{ width: '30px', height: '30px' }}
                     >
                        <AddIcon color="customPink" className="!text-base" />
                     </IconButton>
                  </div>
               </div>
            </div>
         </div>

         <div className="w-[230px] shrink-0 rounded-10 bg-white p-3 customMd:hidden">
            <div className="h-[205px] w-full shrink-0 rounded-xl bg-[#f5f8fc] p-4">
               <Image src={productPic} alt="product" className="h-full w-full object-cover" />
            </div>
            <div className="mt-5 space-y-3">
               <p className="h-4 overflow-hidden font-bold [-webkit-box-orient:vertical] [-webkit-line-clamp:1] [display:-webkit-box]">
                  کیــف دیــبـا
               </p>
               <div className="flex items-center gap-2 text-sm text-textColor">
                  <p>رنگ انتخاب شده : </p>
                  <div className="h-6 w-6 shrink-0 rounded-full bg-blue-700" />
               </div>
               <div className="flex items-center justify-between">
                  <div className="flex items-center justify-center gap-2">
                     <IconButton
                        className="!border !border-solid !border-textColor"
                        sx={{ width: '22px', height: '22px' }}
                     >
                        <RemoveIcon color="textColor" className="!text-base" />
                     </IconButton>
                     <p className="text-lg font-bold text-customPinkHigh">5</p>
                     <IconButton
                        className="!border !border-solid !border-customPink"
                        sx={{ width: '22px', height: '22px' }}
                     >
                        <AddIcon color="customPink" className="!text-base" />
                     </IconButton>
                  </div>

                  <div>
                     <div className="flex h-10 items-center gap-1">
                        {hasDiscount && (
                           <>
                              <div className="relative h-6 w-6">
                                 <Image src={discountShape} alt="discount" className="h-full w-full" />
                                 <p className="absolute right-[4px] top-[8px] text-[8px] text-white">40%</p>
                              </div>
                              <p className="text-[11px] text-[#B1B5C4] line-through">
                                 {Number(125000).toLocaleString()} {t('unit')}
                              </p>
                           </>
                        )}
                     </div>
                     <p className="text-sm text-customPinkHigh">
                        {Number(345000).toLocaleString()} {t('unit')}
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}

export default BasketCard;
