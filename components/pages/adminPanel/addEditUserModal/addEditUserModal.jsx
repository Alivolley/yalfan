import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

// MUI
import { Autocomplete, Checkbox, Dialog, FormControlLabel, FormHelperText, IconButton, TextField } from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import { LoadingButton } from '@mui/lab';
import 'react-phone-input-2/lib/material.css';

// Icons
import CloseIcon from '@mui/icons-material/Close';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

// Apis
import useAddUser from '@/apis/pAdmin/users/useAddUser';

function AddEditUserModal({ show, onClose, isEdit = false, detail, usersMutate }) {
   const { locale } = useRouter();
   const t = useTranslations('adminPanelUsers');

   const permissionList = [
      { title: t('Edit contact us'), code: 101 },
      { title: t('Add category'), code: 102 },
      { title: t('Edit category'), code: 103 },
      { title: t('Delete category'), code: 104 },
      { title: t('Add product'), code: 105 },
      { title: t('Edit product'), code: 106 },
      { title: t('Delete product'), code: 107 },
      { title: t('Edit shipping cost'), code: 108 },
      { title: t('Show discount code'), code: 109 },
      { title: t('Add discount code'), code: 110 },
      { title: t('Edit discount code'), code: 111 },
      { title: t('Delete discount code'), code: 112 },
      { title: t('Change order status'), code: 113 },
      { title: t('Reply to comment'), code: 114 },
      { title: t('Delete comment'), code: 115 },
      { title: t('Show reports'), code: 116 },
      { title: t('Edit users info'), code: 117 },
      { title: t('Block users'), code: 118 },
   ];

   const { trigger: addUserTrigger, isMutating: addUserIsMutating } = useAddUser();

   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
      setValue,
      watch,
      control,
   } = useForm({
      defaultValues: {
         phoneNumber: '',
         isAdmin: false,
         password: '',
         permissions: [],
      },
      mode: 'onSubmit',
   });

   const closeModalHandler = () => {
      onClose();
      reset();
   };

   useEffect(() => {
      if (isEdit && detail) {
         setValue('phoneNumber', detail?.phone_number);
         if (detail?.role === 'admin') {
            setValue('isAdmin', true);
            const selectedCodesAsNumbers = detail?.permissions.map(code => parseInt(code, 10));
            const filteredPermissions = permissionList.filter(item => selectedCodesAsNumbers.includes(item.code));
            setValue('permissions', filteredPermissions);
         }
      }
   }, [detail]);

   const formSubmit = data => {
      let newUser = null;
      if (data?.isAdmin) {
         const codesArray = data?.permissions?.map(item => item.code);

         newUser = new FormData();
         newUser.append('phone_number', data?.phoneNumber);
         newUser.append('is_admin', data?.isAdmin);
         if (data?.password) {
            newUser.append('password', data?.password);
         }
         codesArray?.map(item => newUser.append('codes', item));

         addUserTrigger(newUser, {
            onSuccess: () => {
               usersMutate();
               closeModalHandler();
            },
         });
      } else {
         newUser = {
            phone_number: data?.phoneNumber,
            is_admin: data?.isAdmin,
            password: null,
         };

         addUserTrigger(newUser, {
            onSuccess: () => {
               usersMutate();
               closeModalHandler();
            },
         });
      }
   };

   const isAdminCheckbox = watch('isAdmin');

   return (
      <Dialog open={show} onClose={closeModalHandler} fullWidth dir={locale === 'en' ? 'ltr' : 'rtl'} maxWidth="xs">
         <div className="relative p-5 pt-0">
            <div className="sticky top-0 z-[2] flex items-center justify-between border-b border-solid border-[#E4EAF0] bg-white pb-2 pt-3">
               <p className="text-lg font-bold">{isEdit ? t('Edit user') : t('Add user')}</p>
               <IconButton onClick={closeModalHandler}>
                  <CloseIcon />
               </IconButton>
            </div>
            <form onSubmit={handleSubmit(formSubmit)} className="mt-10 space-y-4">
               <div className="flex flex-1 flex-col gap-1">
                  <p className="text-sm text-customBlue">{t('Phone number')}</p>

                  <div dir="ltr">
                     <Controller
                        control={control}
                        name="phoneNumber"
                        rules={{ required: t('This filed is required') }}
                        render={({ field: { onChange, value }, fieldState }) => (
                           <>
                              <PhoneInput
                                 country="ir"
                                 inputClass="!w-full"
                                 specialLabel=""
                                 inputStyle={{
                                    borderRadius: '10px',
                                    ...(errors?.phoneNumber?.message && {
                                       borderColor: 'red',
                                    }),
                                 }}
                                 value={value}
                                 onChange={onChange}
                                 disabled={isEdit}
                              />

                              {fieldState.invalid
                                 ? errors?.phoneNumber?.message && (
                                      <FormHelperText error>{errors?.phoneNumber?.message}</FormHelperText>
                                   )
                                 : null}
                           </>
                        )}
                     />
                  </div>
               </div>

               <div className="flex h-full items-end">
                  <Controller
                     control={control}
                     name="isAdmin"
                     render={({ field: { onChange, value } }) => (
                        <FormControlLabel
                           control={<Checkbox checked={value} />}
                           label={t('This is admin')}
                           value={value}
                           onChange={onChange}
                        />
                     )}
                  />
               </div>

               {isAdminCheckbox && (
                  <>
                     <div className="flex flex-1 flex-col gap-1">
                        <p className="text-sm text-[#7E8AAB]">{t('Permissions')}</p>
                        <Controller
                           control={control}
                           name="permissions"
                           rules={{ required: t('This filed is required') }}
                           render={({ field: { onChange, value }, fieldState }) => (
                              <>
                                 <Autocomplete
                                    multiple
                                    options={permissionList}
                                    disableCloseOnSelect
                                    value={value}
                                    isOptionEqualToValue={(option, optValue) => option.title === optValue.title}
                                    onChange={(e, newValue) => onChange(newValue)}
                                    getOptionLabel={option => option.title}
                                    renderOption={(props, option, { selected }) => (
                                       <li {...props} dir={locale === 'en' ? 'ltr' : 'rtl'}>
                                          <Checkbox
                                             icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                             checkedIcon={<CheckBoxIcon fontSize="small" />}
                                             style={{ marginRight: 8 }}
                                             checked={selected}
                                          />
                                          {option.title}
                                       </li>
                                    )}
                                    renderInput={params => (
                                       <TextField {...params} error={!!errors?.permissions?.message} />
                                    )}
                                 />

                                 {fieldState.invalid
                                    ? errors?.permissions?.message && (
                                         <FormHelperText error>{errors?.permissions?.message}</FormHelperText>
                                      )
                                    : null}
                              </>
                           )}
                        />
                     </div>

                     <div className="flex flex-1 flex-col gap-1">
                        <p className="text-sm text-customBlue">{t('Password')}</p>
                        <TextField
                           variant="outlined"
                           fullWidth
                           autoComplete="off"
                           {...register('password', {
                              required: {
                                 value: !isEdit,
                                 message: t('This filed is required'),
                              },
                              minLength: {
                                 value: 8,
                                 message: t('Password most be greater than 8 characters'),
                              },
                           })}
                           error={!!errors?.password}
                           helperText={errors?.password?.message}
                        />
                     </div>
                  </>
               )}

               <div>
                  <LoadingButton
                     variant="contained"
                     type="submit"
                     size="large"
                     color="customPinkHigh"
                     loading={addUserIsMutating}
                     fullWidth
                     className="!rounded-10 !p-3 !text-white"
                  >
                     {isEdit ? t('Edit user') : t('Add user')}
                  </LoadingButton>
               </div>
            </form>
         </div>
      </Dialog>
   );
}

export default AddEditUserModal;
