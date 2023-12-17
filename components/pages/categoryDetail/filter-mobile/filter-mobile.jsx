import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

// MUI
import { Button, Drawer, IconButton, Slider, Switch, TextField } from '@mui/material';

// Icons
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';

// Assets
import filterIcon from '@/assets/icons/filter-icon.svg';
import filterIconBold from '@/assets/icons/filterIcon-bold.svg';

function FilterMobile({
   open,
   onClose,
   priceRange,
   setPriceRange,
   showAvailableProducts,
   setShowAvailableProducts,
   showDiscountProducts,
   setShowDiscountProducts,
}) {
   const router = useRouter();
   const t = useTranslations('categoryDetail');

   const changePriceRange = (event, newValue, activeThumb) => {
      if (!Array.isArray(newValue)) {
         return;
      }

      if (newValue[1] - newValue[0] < 1) {
         if (activeThumb === 0) {
            const clamped = Math.min(newValue[0], 100 - 1);
            setPriceRange([clamped, clamped + 1]);
         } else {
            const clamped = Math.max(newValue[1], 1);
            setPriceRange([clamped - 1, clamped]);
         }
      } else {
         setPriceRange(newValue);
      }
   };

   return (
      <Drawer anchor="left" open={open} onClose={onClose} dir={router.locale === 'en' ? 'ltr' : 'rtl'}>
         <div
            className={`bg-white p-5 ${
               router.locale === 'en' ? 'font-poppins' : router.locale === 'fa' ? 'font-dana' : 'font-rubik'
            }`}
         >
            <div className="flex items-start justify-between">
               <div>
                  <p className="flex items-center gap-1 text-base font-bold text-[#385E8A]">
                     <Image src={filterIcon} alt="filter" />
                     {t('Filter products')}
                  </p>
                  <p className="mt-1 text-xs text-[#626E94]">{t('To register the filters')}</p>
               </div>
               <IconButton onClick={onClose}>
                  <CloseIcon />
               </IconButton>
            </div>

            <div className="mb-3 mt-8 flex items-center justify-between border-b border-solid border-[#E4EAF0] pb-2">
               <p>{t('Filters applied')}:</p>
               <Button color="customPinkHigh" size="small" startIcon={<DeleteOutlineOutlinedIcon />}>
                  {t('Remove all filters')}
               </Button>
            </div>

            <div className="flex flex-wrap gap-3">
               <Button
                  color="customPinkLow"
                  size="small"
                  variant="contained"
                  className="!text-xs !text-[#B1302E]"
                  endIcon={<CloseIcon />}
               >
                  کیف دستی
               </Button>
               <Button
                  color="customPinkLow"
                  size="small"
                  variant="contained"
                  className="!text-xs !text-[#B1302E]"
                  endIcon={<CloseIcon />}
               >
                  کیف دستی
               </Button>
            </div>

            <div className="mt-6 border-t border-solid border-[#E4EAF0] pt-6">
               <p>{t('Price range (toman)')}</p>
               <div className="my-5 flex items-center gap-4">
                  <p>{t('From')}</p>
                  <TextField
                     variant="outlined"
                     color="customPink"
                     type="number"
                     size="small"
                     value={priceRange[0]}
                     onChange={e => setPriceRange(prev => [Number(e.target.value), prev[1]])}
                  />
                  <p>{t('To')}</p>
                  <TextField
                     variant="outlined"
                     color="customPink"
                     type="number"
                     size="small"
                     value={priceRange[1]}
                     onChange={e => setPriceRange(prev => [prev[0], Number(e.target.value)])}
                  />
               </div>
            </div>
            <div className="border-b border-solid border-[#E4EAF0] px-3 pb-6">
               <Slider
                  color="customPinkHigh"
                  valueLabelDisplay="auto"
                  min={0}
                  max={128000}
                  value={priceRange}
                  onChange={changePriceRange}
                  valueLabelFormat={value => `${value.toLocaleString()} ${t('Unit')}`}
               />
               <div className="flex items-center justify-between text-sm text-textColor">
                  <p>{t('Cheapest')}</p>
                  <p>{t('Most expensive')}</p>
               </div>
            </div>
            <div className="text-customBlue">
               <div className="mt-3 flex items-center justify-between">
                  <p>{t('Has discount')}</p>
                  <Switch
                     color="customBlue"
                     value={showDiscountProducts}
                     onChange={(e, newValue) => setShowDiscountProducts(newValue)}
                     checked={showDiscountProducts}
                  />
               </div>
               <div className="mt-3 flex items-center justify-between border-t border-solid border-[#E4EAF0] pt-3">
                  <p>{t('Display available products')}</p>
                  <Switch
                     color="customBlue"
                     value={showAvailableProducts}
                     onChange={(e, newValue) => setShowAvailableProducts(newValue)}
                     checked={showAvailableProducts}
                  />
               </div>
               <div className="mt-3 flex items-center justify-between border-t border-solid border-[#E4EAF0] pt-5">
                  <p className="flex items-center gap-2 text-sm">
                     <WidgetsOutlinedIcon fontSize="small" /> {t('Filter results')}:
                  </p>
                  <p className="flex items-center gap-1 text-sm text-customPinkHigh">
                     438 {t('Product')} <PlayArrowOutlinedIcon fontSize="small" className="rotate-[270deg]" />
                  </p>
               </div>
            </div>

            <Link href="/categoryDetail" className="mt-10 block">
               <Button variant="contained" color="customPink2" className="!rounded-10 !py-3 !text-[#B1302E]" fullWidth>
                  <div className="flex w-full items-center justify-between px-2">
                     <Image src={filterIconBold} alt="filter" />
                     {t('Apply filter')}
                  </div>
               </Button>
            </Link>
         </div>
      </Drawer>
   );
}

export default FilterMobile;
