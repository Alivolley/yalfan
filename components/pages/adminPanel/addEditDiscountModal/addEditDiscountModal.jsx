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

function AddEditDiscountModal({ show, onClose, isEdit = false, detail, discountsMutate }) {
   const { locale } = useRouter();
   const t = useTranslations('adminPanelUsers');

   const { trigger: addDiscountTrigger, isMutating: addDiscountIsMutating } = useAddDiscount();

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
      let newCode = null;

      if (isEdit) {
         //    const codesArray = data?.permissions?.map(item => item.code);
         //    newCode = new FormData();
         //    newCode.append('phone_number', data?.phoneNumber);
         //    newCode.append('is_admin', data?.isAdmin);
         //    if (data?.password) {
         //       newCode.append('password', data?.password);
         //    }
         //    codesArray?.map(item => newCode.append('codes', item));
         //    addUserTrigger(newCode, {
         //       onSuccess: () => {
         //          usersMutate();
         //          closeModalHandler();
         //       },
         //    });
      } else {
         newCode = {
            code: data?.codeName,
            percent: data?.discountPercent,
            count: data?.productCount,
            expiration_days: data?.daysLimit,
         };
         addDiscountTrigger(newCode, {
            onSuccess: () => {
               discountsMutate();
               closeModalHandler();
            },
         });
      }
   };

   return (
      <Dialog open={show} onClose={closeModalHandler} fullWidth dir={locale === 'en' ? 'ltr' : 'rtl'}>
         <div className="relative p-5 pt-0">
            <div className="sticky top-0 z-[2] flex items-center justify-between border-b border-solid border-[#E4EAF0] bg-white pb-2 pt-3">
               <p className="text-lg font-bold">{isEdit ? 'ویرایش کد تخفیف' : 'افزودن کد تخفیف'}</p>
               <IconButton onClick={closeModalHandler}>
                  <CloseIcon />
               </IconButton>
            </div>

            <form onSubmit={handleSubmit(formSubmit)} className="mt-10 space-y-6">
               <div className="flex flex-col gap-5 customSm:flex-row customSm:items-start">
                  <div className="flex flex-1 flex-col gap-1">
                     <p className="text-sm text-customBlue">نام کد</p>
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
                     <p className="text-sm text-[#626E94]">درصد تخفیف</p>
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
                     <p className="mb-2 text-sm text-[#626E94]">تعداد محصول</p>
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
                     <p className="mb-2 text-sm text-[#626E94]">تعداد روزها</p>
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
                     loading={addDiscountIsMutating}
                     fullWidth
                     className="!rounded-10 !p-3 !text-white"
                  >
                     {isEdit ? 'ویرایش کد تخفیف' : 'افزودن کد تخفیف'}
                  </LoadingButton>
               </div>
            </form>
         </div>
      </Dialog>
   );
}

export default AddEditDiscountModal;
