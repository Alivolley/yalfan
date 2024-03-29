import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

// MUI
import { Button } from '@mui/material';

// Icons
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

// Assets
import categoriesIcon from '@/assets/icons/categories-icon.svg';

// Components
import ProductCard from '@/components/templates/product-card/product-card';

function Newest({ detail }) {
   const t = useTranslations('home');
   const router = useRouter();

   return (
      <section className="bg-[#FCF7F7] px-8 py-[70px] customMd:px-16">
         <div className="flex items-center justify-between border-b border-solid border-[#E4EAF0] pb-2">
            <div className="flex items-center gap-2">
               <Image src={categoriesIcon} alt="categories" />
               <p className="text-lg font-bold text-textColor">{t('newest')}</p>
            </div>
            <Link href="/categoryDetail?ordering=created" className="hidden customMd:block">
               <Button
                  endIcon={router.locale === 'en' ? <KeyboardArrowRightIcon /> : <KeyboardArrowLeftIcon />}
                  color="textColor"
               >
                  {t('Show all')}
               </Button>
            </Link>
         </div>

         <div className="mt-10 flex items-center gap-4 overflow-auto pb-8">
            {detail?.result?.map(item => (
               <ProductCard key={item.id} detail={item} />
            ))}
         </div>

         <Link href="/categoryDetail?ordering=created" className="mt-8 block customMd:hidden">
            <Button
               color="white"
               variant="contained"
               size="large"
               className="!rounded-10 !py-4 !text-customPinkHigh"
               fullWidth
               startIcon={<ShoppingCartIcon />}
            >
               {t('Show all')}
            </Button>
         </Link>
      </section>
   );
}

export default Newest;
