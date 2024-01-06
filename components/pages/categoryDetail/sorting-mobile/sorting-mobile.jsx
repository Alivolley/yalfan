import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';

// MUI
import { Button, Drawer, IconButton } from '@mui/material';

// Icons
import CloseIcon from '@mui/icons-material/Close';

function SortingMobile({ open, onClose, setSortingValue }) {
   const { query, push, locale } = useRouter();
   const t = useTranslations('categoryDetail');

   const changeSortHandler = newValue => {
      setSortingValue(newValue);

      push({
         query: {
            ...query,
            ordering: newValue,
         },
      });
      onClose();
   };

   return (
      <Drawer
         anchor="bottom"
         open={open}
         onClose={onClose}
         dir={locale === 'en' ? 'ltr' : 'rtl'}
         transitionDuration={500}
      >
         <div className="max-h-[500px] bg-white p-5">
            <div className="flex items-center justify-between">
               <div>
                  <p className="text-base font-bold text-[#385E8A]">{t('Filter based on')}</p>
               </div>
               <IconButton onClick={onClose}>
                  <CloseIcon />
               </IconButton>
            </div>
            <div className="mt-8 flex flex-col items-start gap-3">
               <Button color="textColor" onClick={() => changeSortHandler('')}>
                  {t('All')}
               </Button>
               <Button color="textColor" onClick={() => changeSortHandler('created')}>
                  {t('Newest')}
               </Button>
               <Button
                  color="textColor"
                  onClick={() => changeSortHandler(locale === 'fa' ? 'rial_price' : 'dollar_price')}
               >
                  {t('Cheapest')}
               </Button>
               <Button
                  color="textColor"
                  onClick={() => changeSortHandler(locale === 'fa' ? '-rial_price' : '-dollar_price')}
               >
                  {t('Most expensive')}
               </Button>
               <Button color="textColor" onClick={() => changeSortHandler('sales')}>
                  {t('Best sellers')}
               </Button>
            </div>
         </div>
      </Drawer>
   );
}

export default SortingMobile;
