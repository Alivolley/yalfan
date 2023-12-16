import Link from 'next/link';

// Icons
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

// Assets
import { Grid } from '@mui/material';
import HeaderCategoriesStyle from './header-categories.style';

function HeaderCategories({ language }) {
   return (
      <HeaderCategoriesStyle className="flex">
         <div className="flex flex-1 flex-col border-e border-solid border-[#E4EAF0] pe-5">
            <Link href="/" className="flex items-center justify-between gap-2 py-3" id="arrowIcon">
               دسته بندی
               {language === 'en' ? (
                  <KeyboardArrowRightIcon fontSize="small" />
               ) : (
                  <KeyboardArrowLeftIcon fontSize="small" />
               )}
            </Link>
            <Link href="/" className="flex items-center justify-between gap-2 py-3" id="arrowIcon">
               دسته بندی
               {language === 'en' ? (
                  <KeyboardArrowRightIcon fontSize="small" />
               ) : (
                  <KeyboardArrowLeftIcon fontSize="small" />
               )}
            </Link>
            <Link href="/" className="flex items-center justify-between gap-2 py-3" id="arrowIcon">
               دسته بندی
               {language === 'en' ? (
                  <KeyboardArrowRightIcon fontSize="small" />
               ) : (
                  <KeyboardArrowLeftIcon fontSize="small" />
               )}
            </Link>
            <Link href="/" className="flex items-center justify-between gap-2 py-3" id="arrowIcon">
               دسته بندی
               {language === 'en' ? (
                  <KeyboardArrowRightIcon fontSize="small" />
               ) : (
                  <KeyboardArrowLeftIcon fontSize="small" />
               )}
            </Link>
         </div>
         <div className="flex-1 ps-5">
            <Grid container>
               <Grid item xs={6}>
                  <Link href="/" className="block py-3 transition-all duration-200 hover:text-[#FF817E]">
                     کیف
                  </Link>
               </Grid>
               <Grid item xs={6}>
                  <Link href="/" className="block py-3 transition-all duration-200 hover:text-[#FF817E]">
                     کیف
                  </Link>
               </Grid>
               <Grid item xs={6}>
                  <Link href="/" className="block py-3 transition-all duration-200 hover:text-[#FF817E]">
                     کیف
                  </Link>
               </Grid>
               <Grid item xs={6}>
                  <Link href="/" className="block py-3 transition-all duration-200 hover:text-[#FF817E]">
                     کیف
                  </Link>
               </Grid>
               <Grid item xs={6}>
                  <Link href="/" className="block py-3 transition-all duration-200 hover:text-[#FF817E]">
                     کیف
                  </Link>
               </Grid>
               <Grid item xs={6}>
                  <Link href="/" className="block py-3 transition-all duration-200 hover:text-[#FF817E]">
                     کیف
                  </Link>
               </Grid>
               <Grid item xs={6}>
                  <Link href="/" className="block py-3 transition-all duration-200 hover:text-[#FF817E]">
                     کیف
                  </Link>
               </Grid>
               <Grid item xs={6}>
                  <Link href="/" className="block py-3 transition-all duration-200 hover:text-[#FF817E]">
                     کیف
                  </Link>
               </Grid>
               <Grid item xs={6}>
                  <Link href="/" className="block py-3 transition-all duration-200 hover:text-[#FF817E]">
                     کیف
                  </Link>
               </Grid>
               <Grid item xs={6}>
                  <Link href="/" className="block py-3 transition-all duration-200 hover:text-[#FF817E]">
                     کیف
                  </Link>
               </Grid>
            </Grid>
         </div>
      </HeaderCategoriesStyle>
   );
}

export default HeaderCategories;
