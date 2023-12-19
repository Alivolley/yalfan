import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';

// MUI
import { Button, Drawer, IconButton } from '@mui/material';

// Icons
import CloseIcon from '@mui/icons-material/Close';

function SortingMobile({ open, onClose }) {
   const router = useRouter();
   const t = useTranslations('categoryDetail');

   return (
      <Drawer
         anchor="bottom"
         open={open}
         onClose={onClose}
         dir={router.locale === 'en' ? 'ltr' : 'rtl'}
         transitionDuration={500}
      >
         <div
            className={`max-h-[500px] bg-white p-5 ${
               router.locale === 'en' ? 'font-poppins' : router.locale === 'fa' ? 'font-dana' : 'font-rubik'
            }`}
         >
            <div className="flex items-center justify-between">
               <div>
                  <p className="text-base font-bold text-[#385E8A]">{t('Filter based on')}</p>
               </div>
               <IconButton onClick={onClose}>
                  <CloseIcon />
               </IconButton>
            </div>
            <div className="mt-8 flex flex-col items-start gap-3">
               <Button color="textColor">{t('All')}</Button>
               <Button color="textColor">{t('Newest')}</Button>
               <Button color="textColor">{t('Cheapest')}</Button>
               <Button color="textColor">{t('Most expensive')}</Button>
               <Button color="textColor">{t('Best sellers')}</Button>
            </div>
         </div>
      </Drawer>
   );
}

export default SortingMobile;
