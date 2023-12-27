import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

// MUI
import { Button } from '@mui/material';

// Icons
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

// Assets
import Link from 'next/link';
import categoriesIcon from '@/assets/icons/categories-icon.svg';
import CategoryCard from '@/components/templates/category-card/category-card';

function Categories({ detail }) {
   const t = useTranslations('home');
   const router = useRouter();

   return (
      <section className="bg-[#F5F8FC] px-8 py-[70px] customMd:px-16">
         <div className="flex items-center justify-between border-b border-solid border-[#E4EAF0] pb-2">
            <div className="flex items-center gap-2">
               <Image src={categoriesIcon} alt="categories" />
               <p className="text-lg font-bold">{t('Categories')}</p>
            </div>
            <Link href="/" className="hidden customMd:block">
               <Button
                  endIcon={router.locale === 'en' ? <KeyboardArrowRightIcon /> : <KeyboardArrowLeftIcon />}
                  color="textColor"
               >
                  {t('Show all')}
               </Button>
            </Link>
         </div>

         <div className="mt-10 flex items-center gap-5 overflow-auto pb-5">
            {detail?.map((item, index) => index < 5 && <CategoryCard key={item?.id} detail={item} />)}
         </div>

         <Link href="/" className="mt-8 block customMd:hidden">
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

export default Categories;
