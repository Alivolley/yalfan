import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

// MUI
import { Button, Grid } from '@mui/material';

// Icons
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import EastIcon from '@mui/icons-material/East';

// Assets
import introducePic from '@/assets/images/introduce-pic.png';
import bagIcon from '@/assets/icons/introduce-bag.svg';
import bannerBg from '@/assets/images/bannerBg.png';
import bagVector from '@/assets/images/bag-Vector.png';

function Introduce() {
   const t = useTranslations('home');
   const { locale } = useRouter();

   return (
      <div className="relative px-8 customMd:px-16">
         <Image
            src={bagVector}
            alt="vector"
            className={`absolute bottom-0 end-0 ${locale === 'en' ? '' : 'scale-x-[-1]'}`}
         />
         <Grid container spacing={4}>
            <Grid item xs={12} md={5}>
               <p className="mb-8 text-center text-xl font-bold customMd:hidden">
                  {t('with yalfan')} {t('make great styles')}
               </p>
               <div className="relative size-full">
                  <Image
                     src={introducePic}
                     alt="introduce"
                     className="h-[200px] w-full object-contain customMd:h-full"
                  />
                  <Image src={bannerBg} alt="introduce" className="absolute inset-0 z-[-1] size-full" />
               </div>
            </Grid>
            <Grid item xs={12} md={7}>
               <div className="flex h-full flex-col justify-center">
                  <p className="hidden text-xl font-bold text-[#385e8a] customMd:block">* * *</p>
                  <div className="relative hidden customMd:block">
                     <p className="text-4xl font-bold">
                        {t('with yalfan')} {t('make great styles')}
                     </p>
                     <span className="absolute -inset-y-3 start-0 z-[-1] w-[250px] rounded-e-full bg-customPinkLow" />
                  </div>
                  <p className="my-8 max-w-[732px] text-sm leading-[30px] text-[#62768C] customMd:text-lg customMd:leading-[40px]">
                     {t('lorem')} {t('lorem')}
                  </p>
                  <div className="flex flex-col-reverse gap-5 customMd:flex-row customMd:items-center">
                     <Link href="/categoryDetail">
                        <Button
                           color="customPinkLow"
                           variant="contained"
                           size="large"
                           className="!w-full !rounded-10 !py-4 !text-customPinkHigh customMd:!font-bold"
                           startIcon={<Image src={bagIcon} alt="bag" />}
                        >
                           {t('shop now')}
                        </Button>
                     </Link>
                     <Link href="/categoryDetail" className="hidden customMd:block">
                        <Button
                           color="customPinkHigh"
                           className="!w-full !font-bold"
                           size="large"
                           endIcon={locale === 'en' ? <EastIcon /> : <KeyboardBackspaceIcon />}
                        >
                           {t('see all products')}
                        </Button>
                     </Link>
                     <Link href="/categoryDetail" className="block customMd:hidden">
                        <Button
                           color="customPinkHigh"
                           className="!w-full !rounded-10 !py-3"
                           size="large"
                           variant="outlined"
                           endIcon={locale === 'en' ? <EastIcon /> : <KeyboardBackspaceIcon />}
                        >
                           {t('see all products')}
                        </Button>
                     </Link>
                  </div>
               </div>
            </Grid>
         </Grid>
      </div>
   );
}

export default Introduce;
