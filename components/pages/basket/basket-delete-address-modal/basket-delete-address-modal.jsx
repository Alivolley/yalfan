// MUI
import { LoadingButton } from '@mui/lab';
import { Button, Dialog } from '@mui/material';

// Apis
import useDeleteAddress from '@/apis/profile/useDeleteAddress';

function BasketDeleteAddressModal({ show, onClose, detail }) {
   const { trigger: deleteAddressTrigger, isMutating: deleteAddressIsMutating } = useDeleteAddress();

   const deleteAddressHandler = () => {
      deleteAddressTrigger(detail?.id, {
         onSuccess: () => {
            onClose();
         },
      });
   };

   return (
      <Dialog open={show} onClose={onClose}>
         <div className="flex flex-col gap-3 bg-white px-10 py-5">
            <p className="text-center text-base font-bold">آیا از حذف این آدرس مطمئن هستید ؟</p>

            <div className="flex items-center gap-3">
               <Button
                  variant="contained"
                  color="customPink"
                  fullWidth
                  onClick={onClose}
                  disabled={deleteAddressIsMutating}
               >
                  خیر
               </Button>
               <LoadingButton
                  variant="contained"
                  color="customPink"
                  fullWidth
                  onClick={deleteAddressHandler}
                  loading={deleteAddressIsMutating}
               >
                  بله
               </LoadingButton>
            </div>
         </div>
      </Dialog>
   );
}

export default BasketDeleteAddressModal;
