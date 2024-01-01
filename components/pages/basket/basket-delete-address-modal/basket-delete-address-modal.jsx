import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';

// MUI
import { LoadingButton } from '@mui/lab';
import { Button, Dialog } from '@mui/material';

// Apis
import useDeleteAddress from '@/apis/profile/useDeleteAddress';

function BasketDeleteAddressModal({ show, onClose, detail }) {
   const { locale } = useRouter();
   const t = useTranslations('addresses');
   const { trigger: deleteAddressTrigger, isMutating: deleteAddressIsMutating } = useDeleteAddress();

   const deleteAddressHandler = () => {
      deleteAddressTrigger(detail?.id, {
         onSuccess: () => {
            onClose();
         },
      });
   };

   return (
      <Dialog open={show} onClose={onClose} dir={locale === 'en' ? 'ltr' : 'rtl'}>
         <div className="flex flex-col gap-10 bg-white px-10 py-5">
            <p className="text-center text-base font-bold">{t('Are you sure about deleting this address ?')}</p>

            <div className="flex items-center gap-3">
               <LoadingButton
                  variant="contained"
                  color="customPink2"
                  fullWidth
                  onClick={deleteAddressHandler}
                  loading={deleteAddressIsMutating}
                  className="!rounded-10 !py-[9px] !text-[#B1302E]"
               >
                  {t('Yes')}
               </LoadingButton>

               <Button
                  variant="outlined"
                  color="textColor"
                  fullWidth
                  className="!rounded-10 !py-2"
                  onClick={onClose}
                  disabled={deleteAddressIsMutating}
               >
                  {t('No')}
               </Button>
            </div>
         </div>
      </Dialog>
   );
}

export default BasketDeleteAddressModal;
