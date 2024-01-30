import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';

// MUI
import { CircularProgress, Dialog, IconButton, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// Icons
import CloseIcon from '@mui/icons-material/Close';

// Apis
import useGetShippingCost from '@/apis/pAdmin/orders/useGetShippingCost';
import useChangeShippingCost from '@/apis/pAdmin/orders/useChangeShippingCost';

function EditShippingCostModal({ show, onClose }) {
   const { locale } = useRouter();
   const t = useTranslations('adminPanelOrders');

   const {
      data: shippingCostData,
      isLoading: shippingCostIsLoading,
      mutate: shippingCostMutate,
   } = useGetShippingCost(show);

   const { trigger: changeShippingCostTrigger, isMutating: changeShippingCostIsMutating } = useChangeShippingCost();

   const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
      reset,
   } = useForm({
      defaultValues: {
         cost: '',
      },
      mode: 'onSubmit',
   });

   const closeModalHandler = () => {
      onClose();
      reset();
   };

   const formSubmit = data => {
      changeShippingCostTrigger(
         { price: data?.cost },
         {
            onSuccess: () => {
               closeModalHandler();
               shippingCostMutate();
            },
         }
      );
   };

   useEffect(() => {
      if (show && shippingCostData) {
         setValue('cost', shippingCostData?.price);
      }
   }, [show, shippingCostData]);

   return (
      <Dialog open={show} onClose={closeModalHandler} fullWidth dir={locale === 'en' ? 'ltr' : 'rtl'} maxWidth="xs">
         <div className="relative p-5 pt-0">
            <div className="sticky top-0 z-[2] flex items-center justify-between border-b border-solid border-[#E4EAF0] bg-white pb-2 pt-3">
               <p className="text-lg font-bold">
                  {/* {t('Change order status')} */}
                  تغییر هزینه ارسال
               </p>
               <IconButton onClick={closeModalHandler}>
                  <CloseIcon />
               </IconButton>
            </div>
            {shippingCostIsLoading ? (
               <div className="my-16 flex w-full items-center justify-center">
                  <CircularProgress color="customPink" />
               </div>
            ) : (
               <form onSubmit={handleSubmit(formSubmit)} className="mt-5">
                  <div className="flex flex-1 flex-col gap-1">
                     <p className="mb-2 text-sm text-[#626E94]">
                        {/* {t('Price')} ( {t('Toman')} ) */}
                        هزینه
                     </p>
                     <TextField
                        fullWidth
                        type="number"
                        sx={{
                           input: {
                              MozAppearance: 'textfield',
                              appearance: 'textfield',
                              '&::-webkit-inner-spin-button': {
                                 WebkitAppearance: 'none',
                                 appearance: 'none',
                              },
                           },
                        }}
                        {...register('cost', {
                           required: {
                              value: true,
                              message: t('This filed is required'),
                           },
                        })}
                        error={!!errors?.cost}
                        helperText={errors?.cost?.message}
                     />
                  </div>

                  <div className="mt-8">
                     <LoadingButton
                        variant="contained"
                        color="customPinkHigh"
                        fullWidth
                        className="!rounded-10 !py-2 !text-white"
                        size="large"
                        type="submit"
                        loading={changeShippingCostIsMutating}
                     >
                        تغییر هزینه
                     </LoadingButton>
                  </div>
               </form>
            )}
         </div>
      </Dialog>
   );
}

export default EditShippingCostModal;