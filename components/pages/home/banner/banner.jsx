import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import Image from 'next/image';

// MUI
import { Button, Grid } from '@mui/material';

// Assets
import Link from 'next/link';
import bannerModel from '../../../../assets/images/banner-home-model.png';
import bagIcon from '../../../../assets/icons/Bag 2.svg';

// Styles
import BannerStyle from './banner.style';

function Banner() {
   const t = useTranslations('home');
   const router = useRouter();

   return (
      <BannerStyle className="px-8 customMd:px-16" locale={router.locale}>
         <Grid container>
            <Grid item xs={12} md={6}>
               <div className="flex h-full w-full flex-col justify-center py-12">
                  <p className="text-5xl font-bold text-[#284566]">{t('with yalfan')}</p>
                  <p className="mt-5 text-5xl font-bold text-[#284566]">{t('make great styles')}</p>
                  <p className="mt-8 leading-[30px]">{t('lorem')}</p>

                  <Link href="/" className="mt-11 w-fit">
                     <Button
                        color="customPinkHigh"
                        variant="contained"
                        size="large"
                        className="!rounded-10 !py-4 !text-white"
                        startIcon={<Image src={bagIcon} alt="bag" />}
                     >
                        {t('shop now')}
                     </Button>
                  </Link>
               </div>
            </Grid>
            <Grid item xs={12} md={6}>
               <div className="flex h-full flex-col justify-center">
                  <div className="w-full">
                     <Image
                        src={bannerModel}
                        alt="banner"
                        className={`h-full w-full ${router.locale === 'en' ? 'scale-x-[-1]' : ''}`}
                     />
                  </div>
               </div>
            </Grid>
         </Grid>
      </BannerStyle>
   );
}

export default Banner;
