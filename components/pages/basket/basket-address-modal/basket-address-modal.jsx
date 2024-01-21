import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

// MUI
import { Button, Dialog, FormHelperText, IconButton, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';

// Icons
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

// Apis
import useAddAddress from '@/apis/profile/useAddAddress';
import useEditAddress from '@/apis/profile/useEditAddress';

function BasketAddressModal({ show, onClose, isEdit = false, detail, usersMutate, userId }) {
   const { trigger: addAddressTrigger, isMutating: addAddressIsMutating } = useAddAddress(userId);
   const { trigger: editAddressTrigger, isMutating: editAddressIsMutating } = useEditAddress();
   const { locale } = useRouter();
   const t = useTranslations('addresses');

   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
      setValue,
      control,
   } = useForm({
      defaultValues: {
         postCode: '',
         fullAddress: '',
         transfereeFullName: '',
         transfereePhoneNumber: '',
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
         recipient_name: data?.transfereeFullName,
         phone_number: data?.transfereePhoneNumber,
         postal_code: data?.postCode,
      };

      if (isEdit) {
         editAddressTrigger(
            { newAddress, addressId: detail?.id },
            {
               onSuccess: () => {
                  closeModalHandler();
                  if (usersMutate) {
                     usersMutate();
                  }
               },
            }
         );
      } else {
         addAddressTrigger(newAddress, {
            onSuccess: () => {
               closeModalHandler();
               if (usersMutate) {
                  usersMutate();
               }
            },
         });
      }
   };

   useEffect(() => {
      if (isEdit) {
         setValue('fullAddress', detail?.address);
         setValue('postCode', detail?.postal_code);
         setValue('transfereeFullName', detail?.recipient_name);
         setValue('transfereePhoneNumber', detail?.phone_number);
      }
   }, [detail, detail?.id]);

   return (
      <Dialog open={show} onClose={closeModalHandler} fullWidth dir={locale === 'en' ? 'ltr' : 'rtl'}>
         <div className="relative p-5 pt-0">
            <div className="sticky top-0 z-[2] flex h-10 w-full items-center bg-white py-7">
               <IconButton onClick={closeModalHandler}>
                  <HighlightOffIcon />
               </IconButton>
               <p className="grow text-center text-lg font-bold">{isEdit ? t('Edit address') : t('Add new address')}</p>
            </div>

            <p className="my-6 rounded-10 bg-[#F5F8FC] p-4 font-bold">{t('Address information')}</p>

            <form onSubmit={handleSubmit(formSubmit)} className="space-y-6">
               <div className="flex flex-1 flex-col gap-1">
                  <p className="text-sm text-[#7E8AAB]">{t('Post code')}</p>
                  <TextField
                     variant="outlined"
                     fullWidth
                     color="customPink"
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
                     {...register('postCode', {
                        required: {
                           value: true,
                           message: t('This filed is required'),
                        },
                     })}
                     error={!!errors?.postCode}
                     helperText={errors?.postCode?.message}
                     disabled={addAddressIsMutating || editAddressIsMutating}
                  />
               </div>

               <div className="flex flex-col gap-1">
                  <p className="text-sm text-[#7E8AAB]">{t('Your accurate address')}</p>
                  <TextField
                     variant="outlined"
                     fullWidth
                     multiline
                     rows={5}
                     color="customPink"
                     {...register('fullAddress', {
                        required: {
                           value: true,
                           message: t('This filed is required'),
                        },
                     })}
                     error={!!errors?.fullAddress}
                     helperText={errors?.fullAddress?.message}
                     disabled={addAddressIsMutating || editAddressIsMutating}
                  />
               </div>

               <p className="my-6 rounded-10 bg-[#F5F8FC] p-4 font-bold">{t('Transferee information')}</p>

               <div className="flex flex-col gap-3 customSm:flex-row">
                  <div className="flex flex-1 flex-col gap-1">
                     <p className="text-sm text-[#7E8AAB]">{t('Transferee fullName')}</p>
                     <TextField
                        variant="outlined"
                        fullWidth
                        color="customPink"
                        {...register('transfereeFullName', {
                           required: {
                              value: true,
                              message: t('This filed is required'),
                           },
                        })}
                        error={!!errors?.transfereeFullName}
                        helperText={errors?.transfereeFullName?.message}
                        disabled={addAddressIsMutating || editAddressIsMutating}
                     />
                  </div>

                  <div className="flex flex-1 flex-col gap-1">
                     <p className="text-sm text-[#7E8AAB]">{t('Transferee phoneNumber')}</p>

                     <div dir="ltr">
                        <Controller
                           control={control}
                           name="transfereePhoneNumber"
                           rules={{ required: t('This filed is required') }}
                           render={({ field: { onChange, value }, fieldState }) => (
                              <>
                                 <PhoneInput
                                    country="ir"
                                    inputClass="!w-full"
                                    specialLabel=""
                                    inputStyle={{
                                       borderRadius: '10px',
                                       ...(errors?.transfereePhoneNumber?.message && {
                                          borderColor: 'red',
                                       }),
                                    }}
                                    value={value}
                                    onChange={onChange}
                                    disabled={addAddressIsMutating || editAddressIsMutating}
                                 />

                                 {fieldState.invalid
                                    ? errors?.transfereePhoneNumber?.message && (
                                         <FormHelperText error>{errors?.transfereePhoneNumber?.message}</FormHelperText>
                                      )
                                    : null}
                              </>
                           )}
                        />
                     </div>
                  </div>
               </div>

               <div className="flex flex-col gap-3 customSm:flex-row customSm:items-stretch">
                  <div className="grow-[2]">
                     <LoadingButton
                        variant="contained"
                        type="submit"
                        size="large"
                        color="customPink2"
                        loading={addAddressIsMutating || editAddressIsMutating}
                        fullWidth
                        className="!rounded-10 !p-3 !text-[#B1302E]"
                     >
                        {isEdit ? t('Edit address') : t('Add address')}
                     </LoadingButton>
                  </div>

                  <div className="grow-[1]">
                     <Button
                        onClick={closeModalHandler}
                        variant="contained"
                        fullWidth
                        className="!h-full !rounded-10 !py-3 !font-bold !text-[#626E94]"
                        color="borderColor"
                        disabled={addAddressIsMutating || editAddressIsMutating}
                     >
                        {t('Cancel')}
                     </Button>
                  </div>
               </div>
            </form>
         </div>
      </Dialog>
   );
}

export default BasketAddressModal;
