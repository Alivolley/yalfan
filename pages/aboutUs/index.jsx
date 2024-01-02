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
import contactUsPic1 from '@/assets/images/contactUsPic1.png';
import bagIcon from '@/assets/icons/introduce-bag.svg';

function AboutUs() {
   const t = useTranslations('home');
   const { locale } = useRouter();

   return (
      <div className="">
         <div className="bg-[#fcf7f7] px-8 py-16 customMd:px-16">
            <Grid container spacing={4}>
               <Grid item xs={12} md={7} order={{ xs: 2, md: 1 }}>
                  <div className="flex h-full flex-col justify-center">
                     <p className="text-xl font-bold text-[#000B2C] customMd:text-4xl">
                        {t('with yalfan')} {t('make great styles')}
                     </p>
                     <p className="my-8 text-sm leading-[30px] customMd:text-lg customMd:leading-[40px]">
                        {t('lorem')} {t('lorem')}
                     </p>
                     <div className="flex flex-col-reverse gap-5 customMd:flex-row customMd:items-center customMd:gap-8">
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

               <Grid item xs={12} md={5} order={{ xs: 1, md: 2 }}>
                  <div className="h-full w-full">
                     <Image
                        src={contactUsPic1}
                        alt="introduce"
                        className="h-[250px] w-full object-contain customMd:h-full"
                     />
                  </div>
               </Grid>
            </Grid>
         </div>
      </div>
   );
}

export default AboutUs;

export async function getStaticProps(context) {
   return {
      props: {
         messages: (await import(`../../messages/${context.locale}.json`)).default,
      },
   };
}
