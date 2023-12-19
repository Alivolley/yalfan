import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// MUI
import {
   Accordion,
   AccordionDetails,
   AccordionSummary,
   Button,
   Fab,
   Pagination,
   Slider,
   Switch,
   Tab,
   Tabs,
   TextField,
} from '@mui/material';

// Icons
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Assets
import filterIcon from '@/assets/icons/filter-icon.svg';
import filterIconBold from '@/assets/icons/filterIcon-bold.svg';

// Components
import ProductCard from '@/components/templates/product-card/product-card';
import FilterMobile from '@/components/pages/categoryDetail/filter-mobile/filter-mobile';
import SortingMobile from '@/components/pages/categoryDetail/sorting-mobile/sorting-mobile';

function CategoryDetail() {
   const [priceRange, setPriceRange] = useState([0, 128000]);
   const [showAvailableProducts, setShowAvailableProducts] = useState(false);
   const [showDiscountProducts, setShowDiscountProducts] = useState(false);
   const [showFilterMobile, setShowFilterMobile] = useState(false);
   const [showSortingMobile, setShowSortingMobile] = useState(false);
   const [sortingValue, setSortingValue] = useState('all');
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
      <div className="bg-[#f6f2f3] p-8 customMd:px-16 customLg:py-16">
         <div className="flex gap-8">
            <div className="hidden h-fit w-[370px] shrink-0 rounded-2xl bg-white p-5 customLg:block">
               <div>
                  <p className="flex items-center gap-1 text-base font-bold text-[#385E8A]">
                     <Image src={filterIcon} alt="filter" />
                     {t('Filter products')}
                  </p>
                  <p className="mt-1 text-xs text-[#626E94]">{t('To register the filters')}</p>
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

               <div className="mt-10">
                  <Accordion
                     sx={{
                        boxShadow: 'none',
                     }}
                  >
                     <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        sx={{
                           padding: '0 !important',
                        }}
                     >
                        <div>
                           {t('Categories')}

                           <div className="mt-3 flex flex-wrap gap-3">
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
                        </div>
                     </AccordionSummary>
                     <AccordionDetails>
                        <div className="-mt-4 flex flex-col items-start">
                           <Button color="textColor" size="small">
                              کیف
                           </Button>
                           <Button color="textColor" size="small">
                              کیف
                           </Button>
                           <Button color="textColor" size="small">
                              کیف
                           </Button>
                           <Button color="textColor" size="small">
                              کیف
                           </Button>
                           <Button color="textColor" size="small">
                              کیف
                           </Button>
                        </div>
                     </AccordionDetails>
                  </Accordion>
               </div>

               <div className="mt-6 border-t border-solid border-[#E4EAF0] pt-6">
                  <p>{t('Color')} :</p>
                  <div className="mt-5 flex flex-wrap items-center gap-6">
                     <Fab className="!h-10 !w-10 shrink-0 !rounded-full !bg-red-500" />
                     <Fab className="!h-10 !w-10 shrink-0 !rounded-full !bg-yellow-500" />
                     <Fab className="!h-10 !w-10 shrink-0 !rounded-full !bg-purple-500" />
                     <Fab className="!h-10 !w-10 shrink-0 !rounded-full !bg-green-500" />
                     <Fab className="!h-10 !w-10 shrink-0 !rounded-full !bg-blue-500" />
                  </div>
               </div>

               <div className="mt-6 border-t border-solid border-[#E4EAF0] pt-6">
                  <p>{t('Price range (unit)')}</p>
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
                  <Button
                     variant="contained"
                     color="customPink2"
                     className="!rounded-10 !py-3 !text-[#B1302E]"
                     fullWidth
                  >
                     <div className="flex w-full items-center justify-between px-2">
                        <Image src={filterIconBold} alt="filter" />
                        {t('Apply filter')}
                     </div>
                  </Button>
               </Link>
            </div>

            <div className="grow">
               <div className="hidden items-center justify-between rounded-2xl bg-white px-5 py-1 customLg:flex">
                  <p className="flex items-center gap-1">
                     <FilterListIcon color="customPinkHigh" />
                     {t('Sorting')}:
                  </p>

                  <div>
                     <Tabs
                        value={sortingValue}
                        onChange={(e, newValue) => setSortingValue(newValue)}
                        indicatorColor="secondary"
                        TabIndicatorProps={{
                           sx: {
                              backgroundColor: '#B1302E',
                           },
                        }}
                        variant="scrollable"
                     >
                        <Tab label={t('All')} value="all" className="!normal-case" custompinkhigh="true" />
                        <Tab label={t('Newest')} value="newest" className="!normal-case" custompinkhigh="true" />
                        <Tab label={t('Cheapest')} value="cheap" className="!normal-case" custompinkhigh="true" />
                        <Tab
                           label={t('Most expensive')}
                           value="expensive"
                           className="!normal-case"
                           custompinkhigh="true"
                        />
                        <Tab label={t('Best sellers')} value="top" className="!normal-case" custompinkhigh="true" />
                     </Tabs>
                  </div>
                  <p>{t('Products count')} : 355</p>
               </div>
               <div className="flex flex-wrap items-center justify-between rounded-2xl bg-white px-5 py-3 customLg:hidden">
                  <Button
                     startIcon={<Image src={filterIcon} alt="filter" />}
                     className="!text-xs !font-bold customSm:!text-sm"
                     color="black"
                     onClick={() => setShowFilterMobile(true)}
                  >
                     {t('Filter products')}
                  </Button>

                  <Button
                     startIcon={<FilterListIcon color="customPinkHigh" fontSize="small" />}
                     className="!text-xs !font-bold customSm:!text-sm"
                     color="black"
                     onClick={() => setShowSortingMobile(true)}
                  >
                     {t('Cheapest')}
                  </Button>
               </div>

               <FilterMobile
                  open={showFilterMobile}
                  onClose={() => setShowFilterMobile(false)}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  showAvailableProducts={showAvailableProducts}
                  setShowAvailableProducts={setShowAvailableProducts}
                  showDiscountProducts={showDiscountProducts}
                  setShowDiscountProducts={setShowDiscountProducts}
               />

               <SortingMobile open={showSortingMobile} onClose={() => setShowSortingMobile(false)} />

               <div className="mt-6">
                  <div className="flex flex-wrap justify-center gap-4 customMd:gap-8">
                     <ProductCard discount />
                     <ProductCard isLiked />
                     <ProductCard discount />
                     <ProductCard />
                     <ProductCard discount />
                     <ProductCard isLiked />
                     <ProductCard discount />
                     <ProductCard />
                     <ProductCard discount />
                     <ProductCard isLiked />
                     <ProductCard discount />
                     <ProductCard />
                  </div>
               </div>

               <div className="mt-10 flex items-center justify-center">
                  <Pagination
                     count={10}
                     color="customPinkHigh"
                     sx={{
                        '& .Mui-selected': {
                           color: 'white !important',
                        },
                     }}
                  />
               </div>
            </div>
         </div>
      </div>
   );
}

export default CategoryDetail;

export async function getServerSideProps(context) {
   return {
      props: {
         messages: (await import(`../../messages/${context.locale}.json`)).default,
      },
   };
}
