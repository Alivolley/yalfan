import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';

// MUI
import { Dialog, FormControl, FormHelperText, IconButton, MenuItem, Select, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// Icons
import CloseIcon from '@mui/icons-material/Close';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ReplayIcon from '@mui/icons-material/Replay';
import MoneyOffCsredOutlinedIcon from '@mui/icons-material/MoneyOffCsredOutlined';

// Apis
import useChangeStatus from '@/apis/pAdmin/orders/useChangeStatus';

function EditOrderStatusModal({ show, onClose, detail, pageStatus, countValue, status }) {
   const { locale } = useRouter();
   const { mutate } = useSWRConfig();
   const t = useTranslations('orders');

   const { isMutating: changeStatusIsMutating, trigger: changeStatusTrigger } = useChangeStatus(detail?.order_code);

   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
      setValue,
      control,
   } = useForm({
      defaultValues: {
         orderStatus: '',
         changeStatusDescription: '',
      },
      mode: 'onSubmit',
   });

   const closeModalHandler = () => {
      onClose();
      reset();
   };

   const formSubmit = data => {
      const newData = {
         status: data?.orderStatus,
         status_reason: data?.changeStatusDescription,
      };
      changeStatusTrigger(newData, {
         onSuccess: () => {
            mutate(`store/cart/list/?status=${status}&page=${pageStatus}&page_size=${countValue}&is_admin_panel=True`);
            closeModalHandler();
            toast.success('وضعیت با موفقیت تغییر یافت', {
               style: {
                  direction: locale === 'en' ? 'ltr' : 'rtl',
                  fontFamily:
                     locale === 'en' ? 'poppins' : locale === 'fa' ? 'dana' : locale === 'ar' ? 'rubik' : 'poppins',
                  lineHeight: '25px',
               },
               theme: 'colored',
               autoClose: 5000,
            });
         },
      });
   };

   useEffect(() => {
      if (detail) {
         setValue('changeStatusDescription', detail?.status_reason);
      }
   }, [detail]);

   console.log(detail);

   return (
      <Dialog open={show} onClose={closeModalHandler} fullWidth dir={locale === 'en' ? 'ltr' : 'rtl'}>
         <div className="relative p-5 pt-0">
            <div className="sticky top-0 z-[2] flex items-center justify-between border-b border-solid border-[#E4EAF0] bg-white pb-2 pt-3">
               <p className="text-lg font-bold">تغییر وضعیت سفارش</p>
               <IconButton onClick={closeModalHandler}>
                  <CloseIcon />
               </IconButton>
            </div>
            <form onSubmit={handleSubmit(formSubmit)} className="mt-5 space-y-8">
               <div className="flex items-center justify-between gap-1">
                  <p className="text-sm text-textColor customMd:text-base">
                     {/* {t('Order status')} : */}
                     وضعیت کنونی
                  </p>
                  {detail?.status === 'sending' ? (
                     <div className="flex items-center gap-2 rounded-lg bg-[#FF9F1C] px-2 py-1 text-xs text-white">
                        <LocalShippingOutlinedIcon fontSize="small" />
                        <p>{t('Sending')}</p>
                     </div>
                  ) : detail?.status === 'delivered' ? (
                     <div className="flex items-center gap-2 rounded-lg bg-[#2EC4B6] px-2 py-1 text-xs text-white">
                        <CheckCircleOutlinedIcon fontSize="small" />
                        <p>{t('Delivered')}</p>
                     </div>
                  ) : detail?.status === 'returned' ? (
                     <div className="flex items-center gap-2 rounded-lg bg-[#CBB464] px-2 py-1 text-xs text-white">
                        <ReplayIcon fontSize="small" />
                        <p>{t('Returned')}</p>
                     </div>
                  ) : detail?.status === 'unpaid' ? (
                     <div className="flex items-center gap-1 rounded-lg bg-[#F03A50] px-2 py-1 text-xs text-white">
                        <MoneyOffCsredOutlinedIcon fontSize="small" />
                        <p>{t('Unpaid')}</p>
                     </div>
                  ) : null}
               </div>

               <div className="flex items-center justify-between gap-3">
                  <p className="text-sm text-textColor customMd:text-base">
                     {/* {t('Order status')} : */}
                     تغییر وضعیت به حالت
                  </p>

                  <div className="max-w-[200px] grow">
                     <Controller
                        control={control}
                        name="orderStatus"
                        // rules={{ required: t('This filed is required') }}
                        rules={{ required: 'این فیلد اجباری است' }}
                        render={({ field: { onChange, value }, fieldState }) => (
                           <FormControl error={!!errors?.orderStatus} fullWidth>
                              <Select value={value} onChange={onChange} size="small" className="!text-sm">
                                 {detail?.status !== 'sending' && (
                                    <MenuItem
                                       className="!text-sm"
                                       value="sending"
                                       dir={locale === 'en' ? 'ltr' : 'rtl'}
                                    >
                                       درحال ارسال
                                    </MenuItem>
                                 )}
                                 {detail?.status !== 'delivered' && (
                                    <MenuItem
                                       className="!text-sm"
                                       value="delivered"
                                       dir={locale === 'en' ? 'ltr' : 'rtl'}
                                    >
                                       تحویل داده شده
                                    </MenuItem>
                                 )}
                                 {detail?.status !== 'returned' && (
                                    <MenuItem
                                       className="!text-sm"
                                       value="returned"
                                       dir={locale === 'en' ? 'ltr' : 'rtl'}
                                    >
                                       مرجوعی
                                    </MenuItem>
                                 )}
                                 {detail?.status !== 'unpaid' && (
                                    <MenuItem className="!text-sm" value="unpaid" dir={locale === 'en' ? 'ltr' : 'rtl'}>
                                       پرداخت نشده
                                    </MenuItem>
                                 )}
                              </Select>
                              {fieldState.invalid
                                 ? errors?.orderStatus?.message && (
                                      <FormHelperText error>{errors?.orderStatus?.message}</FormHelperText>
                                   )
                                 : null}
                           </FormControl>
                        )}
                     />
                  </div>
               </div>

               <div className="flex flex-1 flex-col gap-1">
                  <p className="mb-2 text-sm text-[#626E94] customMd:text-base">توضیح تغییر وضعیت</p>
                  <TextField
                     fullWidth
                     multiline
                     rows={6}
                     {...register('changeStatusDescription', {
                        required: {
                           value: true,
                           //    message: t('This filed is required'),
                           message: 'این فیلد اجباری است',
                        },
                     })}
                     error={!!errors?.changeStatusDescription}
                     helperText={errors?.changeStatusDescription?.message}
                  />
               </div>

               <div className="mt-16">
                  <LoadingButton
                     variant="contained"
                     color="customPinkHigh"
                     fullWidth
                     className="!rounded-10 !py-2 !text-white"
                     size="large"
                     type="submit"
                     loading={changeStatusIsMutating}
                  >
                     اعمال تغییر
                  </LoadingButton>
               </div>
            </form>
         </div>
      </Dialog>
   );
}

export default EditOrderStatusModal;
