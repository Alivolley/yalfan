import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

// MUI
import { Button, Dialog, IconButton, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// Icons
import CloseIcon from '@mui/icons-material/Close';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';

// Styles
import BasketAddressModalStyle from './basket-address-modal.style';

// Components
import RtlProvider from '@/components/layout/rtlProvider/rtlProvider';

// Apis
import useAddAddress from '@/apis/profile/useAddAddress';
import useEditAddress from '@/apis/profile/useEditAddress';

function BasketAddressModal({ show, onClose, isEdit = false, detail }) {
   const { trigger: addAddressTrigger, isMutating: addAddressIsMutating } = useAddAddress();
   const { trigger: editAddressTrigger, isMutating: editAddressIsMutating } = useEditAddress();

   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
      setValue,
   } = useForm({
      defaultValues: {
         fullAddress: '',
         fullName: '',
         phoneNumber: '',
      },
      mode: 'onSubmit',
   });

   const closeModalHandler = () => {
      onClose();
      if (!isEdit) {
         reset();
      }
   };

   const formSubmit = data => {
      const newAddress = {
         address: data?.fullAddress,
         recipient_name: data?.fullName,
         phone_number: data?.phoneNumber,
      };

      if (isEdit) {
         editAddressTrigger(
            { newAddress, addressId: detail?.id },
            {
               onSuccess: () => {
                  closeModalHandler();
               },
            }
         );
      } else {
         addAddressTrigger(newAddress, {
            onSuccess: () => {
               closeModalHandler();
            },
         });
      }
   };

   useEffect(() => {
      if (isEdit) {
         setValue('fullAddress', detail?.address);
         setValue('fullName', detail?.recipient_name);
         setValue('phoneNumber', detail?.phone_number);
      }
   }, [detail, detail?.id]);

   return (
      <Dialog open={show} onClose={closeModalHandler} fullWidth>
         <BasketAddressModalStyle className="relative p-5 pt-0">
            <div className="sticky top-0 z-[2] flex h-10 w-full items-center bg-white py-5">
               <IconButton onClick={closeModalHandler}>
                  <CloseIcon fontSize="small" />
               </IconButton>
               <p className="grow text-center text-lg font-bold">{isEdit ? 'ویرایش آدرس' : 'ثبت آدرس جدید'}</p>
            </div>

            <p className="my-6 rounded-10 bg-[#F5F8FC] px-4 py-3 font-bold">اطلاعات آدرس</p>

            <RtlProvider>
               <form onSubmit={handleSubmit(formSubmit)} className="space-y-6">
                  <div className="flex flex-col gap-1">
                     <p className="text-sm text-[#7E8AAB]">آدرس دقیق شما</p>
                     <TextField
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={5}
                        color="customOrange"
                        {...register('fullAddress', {
                           required: {
                              value: true,
                              message: 'این فیلد اجباری است',
                           },
                        })}
                        error={!!errors?.fullAddress}
                        helperText={errors?.fullAddress?.message}
                        disabled={addAddressIsMutating || editAddressIsMutating}
                     />
                  </div>

                  <p className="my-6 rounded-10 bg-[#F5F8FC] px-4 py-3 font-bold">اطلاعات تحویل گیرنده</p>

                  <div className="flex flex-col gap-3 customSm:flex-row customSm:items-center">
                     <div className="flex flex-1 flex-col gap-1">
                        <p className="text-sm text-[#7E8AAB]">نام و نام خانوادگی تحویل گیرنده</p>
                        <TextField
                           variant="outlined"
                           fullWidth
                           color="customOrange"
                           {...register('fullName', {
                              required: {
                                 value: true,
                                 message: 'این فیلد اجباری است',
                              },
                           })}
                           error={!!errors?.fullName}
                           helperText={errors?.fullName?.message}
                           disabled={addAddressIsMutating || editAddressIsMutating}
                        />
                     </div>

                     <div className="flex flex-1 flex-col gap-1">
                        <p className="text-sm text-[#7E8AAB]">شماره موبایل تحویل گیرنده</p>
                        <TextField
                           variant="outlined"
                           fullWidth
                           color="customOrange"
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
                           {...register('phoneNumber', {
                              required: {
                                 value: true,
                                 message: 'این فیلد اجباری است',
                              },
                              pattern: {
                                 value: /^09\d{9}$/,
                                 message: 'لطفا یک شماره تلفن معتبر ۱۱ رقمی وارد کنید',
                              },
                           })}
                           error={!!errors?.phoneNumber}
                           helperText={errors?.phoneNumber?.message}
                           disabled={addAddressIsMutating || editAddressIsMutating}
                        />
                     </div>
                  </div>

                  <div className="flex flex-col-reverse gap-3 customSm:flex-row customSm:items-stretch">
                     <div className="grow-[1]">
                        <Button
                           onClick={closeModalHandler}
                           variant="contained"
                           fullWidth
                           className="h-full !rounded-10 !py-3 !font-bold !text-[#626E94]"
                           color="buttonBgGray"
                           disabled={addAddressIsMutating || editAddressIsMutating}
                        >
                           بازگشت
                        </Button>
                     </div>
                     <div className="grow-[2]">
                        <LoadingButton
                           variant="contained"
                           type="submit"
                           size="large"
                           color="customOrange2"
                           loading={addAddressIsMutating || editAddressIsMutating}
                           fullWidth
                           className="!rounded-10 !p-2"
                        >
                           <div className="flex w-full items-center justify-between">
                              <p>{isEdit ? 'ویرایش آدرس' : 'افزودن آدرس'}</p>

                              <AutoStoriesOutlinedIcon className="rounded-xl bg-white p-2 text-customOrange" />
                           </div>
                        </LoadingButton>
                     </div>
                  </div>
               </form>
            </RtlProvider>
         </BasketAddressModalStyle>
      </Dialog>
   );
}

export default BasketAddressModal;
