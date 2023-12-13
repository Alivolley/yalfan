/* eslint-disable jsx-a11y/control-has-associated-label */
import { useTranslations } from 'next-intl';
import Image from 'next/image';

// MUI
import { Grid } from '@mui/material';

// Icons
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';

// Assets
import Link from 'next/link';
import fakeLogo from '@/assets/images/footerFakeLogo.png';

function Footer() {
   const t = useTranslations('footer');

   return (
      <footer className="bg-[#0A1B2F] px-8 pb-14 pt-20 text-white customMd:px-16">
         <div className="border-y border-solid border-[#ffffffa2] py-8 customMd:py-[70px]">
            <Grid container spacing={{ xs: 6, md: 0 }}>
               <Grid item xs={12} md={6}>
                  <div className="flex items-center justify-center gap-2 customMd:gap-3 customMd:ps-16">
                     <div className="w-[100px] shrink-0 customMd:w-[131px]">
                        <Image src={fakeLogo} alt="logo" className="h-full w-full" />
                     </div>
                     <div className="space-y-0.5">
                        <p className="text-2xl font-bold">{t('yalfan')}</p>
                        <p className="text-sm">{t('online shop for bags')}</p>
                     </div>
                  </div>
               </Grid>
               <Grid item xs={12} md={6}>
                  <div className="flex flex-col gap-5 text-sm">
                     <div className="flex items-center gap-2.5">
                        <p>
                           <LocationOnIcon fontSize="small" />
                        </p>
                        <p>{t('address')}</p>
                     </div>
                     <a href="tel:02152687469" className="flex items-center gap-2.5">
                        <p>
                           <PhoneEnabledIcon fontSize="small" />
                        </p>
                        <p>021-52687469</p>
                     </a>
                     <div className="flex items-center gap-3">
                        <p>{t('Social medias')} : </p>
                        <div className="flex items-center gap-5">
                           <a href="/">
                              <TelegramIcon fontSize="small" />
                           </a>

                           <a href="/">
                              <WhatsAppIcon fontSize="small" />
                           </a>

                           <a href="/">
                              <InstagramIcon fontSize="small" />
                           </a>
                        </div>
                     </div>
                  </div>
               </Grid>
            </Grid>
         </div>
         <div className="flex flex-col items-center justify-between gap-5 pt-5 customMd:flex-row customMd:gap-0">
            <div className="flex items-center gap-10 text-xs">
               <Link href="/">{t('any question')}</Link>
               <Link href="/">{t('about us')}</Link>
               <Link href="/">{t('contact us')}</Link>
            </div>
            <p className="text-xs text-[#7E8AAB]">
               {t('developers')}{' '}
               <a
                  href="https://neuro-code.ir/"
                  target="_blank"
                  rel="noreferrer"
                  className="px-1 font-bold text-customPinkHigh"
               >
                  {t('neuro code')}
               </a>{' '}
               {t('team')}
            </p>
         </div>
      </footer>
   );
}

export default Footer;
