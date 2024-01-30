import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

// MUI
import { Dialog, IconButton, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// Icons
import CloseIcon from '@mui/icons-material/Close';

// Apis
import useAddDiscount from '@/apis/pAdmin/discounts/useAddDiscount';
import useEditDiscount from '@/apis/pAdmin/discounts/useEditDiscount';

function AddEditDiscountModal({ show, onClose, isEdit = false, detail, discountsMutate }) {
   const { locale } = useRouter();
   const t = useTranslations('adminPanelDiscounts');

   const { trigger: addDiscountTrigger, isMutating: addDiscountIsMutating } = useAddDiscount();
   const { trigger: editDiscountTrigger, isMutating: editDiscountIsMutating } = useEditDiscount(detail?.id);

   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
      setValue,
   } = useForm({
      defaultValues: {
         codeName: '',
         discountPercent: '',
         productCount: '',
         daysLimit: '',
      },
      mode: 'onSubmit',
   });

   const closeModalHandler = () => {
      onClose();
      reset();
   };

   const formSubmit = data => {
      const newCode = {
         code: data?.codeName,
         percent: data?.discountPercent,
         count: data?.productCount,
         expiration_days: data?.daysLimit,
      };

      if (isEdit) {
         editDiscountTrigger(newCode, {
            onSuccess: () => {
               discountsMutate();
               closeModalHandler();
            },
         });
      } else {
         addDiscountTrigger(newCode, {
            onSuccess: () => {
               discountsMutate();
               closeModalHandler();
            },
         });
      }
   };

   useEffect(() => {
      if (isEdit && detail) {
         setValue('codeName', detail?.code);
         setValue('discountPercent', detail?.percent);
         setValue('productCount', detail?.count);
         setValue('daysLimit', detail?.expiration_time?.day);
      }
   }, [detail]);

   return (
      <Dialog open={show} onClose={closeModalHandler} fullWidth dir={locale === 'en' ? 'ltr' : 'rtl'}>
         <div className="relative p-5 pt-0">
            <div className="sticky top-0 z-[2] flex items-center justify-between border-b border-solid border-[#E4EAF0] bg-white pb-2 pt-3">
               <p className="text-lg font-bold">{isEdit ? t('Edit discount code') : t('Add discount code')}</p>
               <IconButton onClick={closeModalHandler}>
                  <CloseIcon />
               </IconButton>
            </div>

            <form onSubmit={handleSubmit(formSubmit)} className="mt-10 space-y-6">
               <div className="flex flex-col gap-5 customSm:flex-row customSm:items-start">
                  <div className="flex flex-1 flex-col gap-1">
                     <p className="text-sm text-customBlue">{t('Code name')}</p>
                     <TextField
                        variant="outlined"
                        fullWidth
                        autoComplete="off"
                        {...register('codeName', {
                           required: {
                              value: true,
                              message: t('This filed is required'),
                           },
                        })}
                        error={!!errors?.codeName}
                        helperText={errors?.codeName?.message}
                     />
                  </div>

                  <div className="flex flex-1 flex-col gap-1">
                     <p className="text-sm text-[#626E94]">{t('Discount percent')}</p>
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
                        {...register('discountPercent', {
                           required: {
                              value: true,
                              message: t('This filed is required'),
                           },
                        })}
                        error={!!errors?.discountPercent}
                        helperText={errors?.discountPercent?.message}
                     />
                  </div>
               </div>

               <div className="flex flex-col gap-5 customSm:flex-row customSm:items-start">
                  <div className="flex flex-1 flex-col gap-1">
                     <p className="mb-2 text-sm text-[#626E94]">{t('Count for discount')}</p>
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
                        {...register('productCount', {
                           required: {
                              value: true,
                              message: t('This filed is required'),
                           },
                        })}
                        error={!!errors?.productCount}
                        helperText={errors?.productCount?.message}
                     />
                  </div>

                  <div className="flex flex-1 flex-col gap-1">
                     <p className="mb-2 text-sm text-[#626E94]">{t('Days count')}</p>
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
                        {...register('daysLimit', {
                           required: {
                              value: true,
                              message: t('This filed is required'),
                           },
                        })}
                        error={!!errors?.daysLimit}
                        helperText={errors?.daysLimit?.message}
                     />
                  </div>
               </div>

               <div>
                  <LoadingButton
                     variant="contained"
                     type="submit"
                     size="large"
                     color="customPinkHigh"
                     loading={addDiscountIsMutating || editDiscountIsMutating}
                     fullWidth
                     className="!rounded-10 !p-3 !text-white"
                  >
                     {isEdit ? t('Edit discount code') : t('Add discount code')}
                  </LoadingButton>
               </div>
            </form>
         </div>
      </Dialog>
   );
}

export default AddEditDiscountModal;
