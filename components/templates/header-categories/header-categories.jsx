import { useState } from 'react';
import Link from 'next/link';

// MUI
import { Grid } from '@mui/material';

// Icons
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

// Apis
import useCategories from '@/apis/categories/useCategories';

function HeaderCategories({ language }) {
   const [activeCategory, setActiveCategory] = useState();

   const { data: categoryList } = useCategories();

   return (
      <div className="flex">
         <div className="flex flex-1 flex-col border-e border-solid border-[#E4EAF0] pe-5">
            {categoryList?.map(
               item =>
                  item?.sub_cats && (
                     <Link
                        href={`/categoryDetail?category=${item?.title}`}
                        className="flex items-center justify-between gap-2 py-3.5 transition-all duration-150 hover:text-[#FF817E]"
                        id="arrowIcon"
                        key={item.id}
                        onMouseEnter={() => setActiveCategory(item)}
                     >
                        {item?.title}
                        {item === activeCategory &&
                           (language === 'en' ? (
                              <KeyboardArrowRightIcon fontSize="small" />
                           ) : (
                              <KeyboardArrowLeftIcon fontSize="small" />
                           ))}
                     </Link>
                  )
            )}
            {categoryList?.map(
               item =>
                  !item?.sub_cats && (
                     <Link
                        href={`/categoryDetail?category=${item?.title}`}
                        className="py-3.5 transition-all duration-150 hover:text-[#FF817E]"
                        id="arrowIcon"
                        key={item.id}
                        onMouseEnter={() => setActiveCategory(item)}
                     >
                        {item?.title}
                     </Link>
                  )
            )}
         </div>
         <div className="flex-1 ps-5">
            <Grid container>
               {activeCategory?.sub_cats?.map(item => (
                  <Grid item xs={6} key={item.id}>
                     <Link
                        href={`/categoryDetail?category=${item?.title}`}
                        className="block py-3 transition-all duration-200 hover:text-[#FF817E]"
                     >
                        {item.title}
                     </Link>
                  </Grid>
               ))}
            </Grid>
         </div>
      </div>
   );
}

export default HeaderCategories;
