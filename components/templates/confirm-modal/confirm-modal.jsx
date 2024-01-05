import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';

// MUI
import { LoadingButton } from '@mui/lab';
import { Button, Dialog } from '@mui/material';

function ConfirmModal({ closeModal, title, confirmHandler, open, confirmLoading = false }) {
   const { locale } = useRouter();
   const t = useTranslations('profile');

   return (
      <Dialog open={open} onClose={closeModal} dir={locale === 'en' ? 'ltr' : 'rtl'}>
         <div className="flex flex-col gap-3 bg-white px-10 py-5">
            <p className="text-center text-base font-bold">{title}</p>

            <div className="mt-5 flex items-center gap-3">
               <Button variant="contained" color="textColor" className="!text-white" fullWidth onClick={closeModal}>
                  {t('No')}
               </Button>
               <LoadingButton
                  variant="contained"
                  color="customPink"
                  fullWidth
                  className={confirmLoading ? '' : '!text-white'}
                  onClick={confirmHandler}
                  loading={confirmLoading}
               >
                  {t('Yes')}
               </LoadingButton>
            </div>
         </div>
      </Dialog>
   );
}

export default ConfirmModal;
