import { useRef } from 'react';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

import { IconButton } from '@mui/material';

// Icons
import HistoryIcon from '@mui/icons-material/History';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

// Assets
import starIcon from '@/assets/icons/top-search.svg';

// Components
import ProductCard from '../product-card/product-card';
import useOnClickOutside from '@/hooks/useOnclickOutside';

function SearchSection({ onClose, isUserLogin }) {
   const t = useTranslations('header');
   const router = useRouter();
   const productsRef = useRef();

   const [sectionRef] = useOnClickOutside(onClose);

   const scrollToStart = () => {
      productsRef.current.scrollLeft -= 300;
   };

   const scrollToEnd = () => {
      productsRef.current.scrollLeft += 300;
   };

   return (
      <div ref={sectionRef}>
         {isUserLogin && (
            <div className="mb-4">
               <p className="flex items-center gap-2 text-sm">
                  <HistoryIcon color="customPinkHigh" />
                  {t('your last search')}
               </p>
               <div className="mt-6 flex items-center gap-4">
                  <Link href="/" className="rounded-2xl bg-[#F5F8FC] px-4 py-2 text-sm text-[#626E94]">
                     کیف دستی
                  </Link>
                  <Link href="/" className="rounded-2xl bg-[#F5F8FC] px-4 py-2 text-sm text-[#626E94]">
                     کیف دستی
                  </Link>
                  <Link href="/" className="rounded-2xl bg-[#F5F8FC] px-4 py-2 text-sm text-[#626E94]">
                     کیف دستی
                  </Link>
               </div>
            </div>
         )}

         <div className="border-t border-solid border-[#E4EAF0] pt-4">
            <p className="flex items-center gap-2 text-sm">
               <Image src={starIcon} alt="favorite" />
               {t('popular search')}
            </p>
            <div className="mt-4 flex items-center gap-4">
               <Link href="/" className="rounded-2xl bg-[#F5F8FC] px-4 py-2 text-sm text-[#626E94]">
                  کیف دستی
               </Link>
               <Link href="/" className="rounded-2xl bg-[#F5F8FC] px-4 py-2 text-sm text-[#626E94]">
                  کیف دستی
               </Link>
               <Link href="/" className="rounded-2xl bg-[#F5F8FC] px-4 py-2 text-sm text-[#626E94]">
                  کیف دستی
               </Link>
            </div>
         </div>

         <div className="relative flex items-center gap-4 customMd:gap-12">
            <div className="mt-5 flex items-center gap-4 overflow-auto scroll-smooth pb-5" ref={productsRef}>
               <ProductCard discount />
               <ProductCard isLiked />
               <ProductCard discount />
               <ProductCard isLiked />
               <ProductCard />
               <ProductCard discount />
               <ProductCard isLiked />
               <ProductCard />
            </div>
            <div
               className={`absolute hidden customMd:block ${router.locale === 'en' ? 'start-[-10px]' : 'end-[-10px]'}`}
            >
               <IconButton
                  sx={{
                     backgroundColor: '#000B2C',
                     boxShadow: '2px 2px 14px 0px #0000000D',
                     ':hover': { backgroundColor: '#000b2cb5' },
                  }}
                  onClick={scrollToStart}
               >
                  <KeyboardBackspaceIcon color="white" />
               </IconButton>
            </div>
            <div
               className={`absolute hidden customMd:block ${router.locale === 'en' ? 'end-[-10px]' : 'start-[-10px]'}`}
            >
               <IconButton
                  sx={{
                     backgroundColor: '#000B2C',
                     boxShadow: '2px 2px 14px 0px #0000000D',
                     ':hover': { backgroundColor: '#000b2cb5' },
                  }}
                  onClick={scrollToEnd}
               >
                  <KeyboardBackspaceIcon className="rotate-180" color="white" />
               </IconButton>
            </div>
         </div>
      </div>
   );
}

export default SearchSection;