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

const top100Films = [
   { title: 'The Shawshank Redemption', year: 1994 },
   { title: 'The Godfather', year: 1972 },
   { title: 'The Godfather: Part II', year: 1974 },
   { title: 'The Dark Knight', year: 2008 },
   { title: '12 Angry Men', year: 1957 },
   { title: "Schindler's List", year: 1993 },
   { title: 'Pulp Fiction', year: 1994 },
   {
      title: 'The Lord of the Rings: The Return of the King',
      year: 2003,
   },
   { title: 'The Good, the Bad and the Ugly', year: 1966 },
   { title: 'Fight Club', year: 1999 },
   {
      title: 'The Lord of the Rings: The Fellowship of the Ring',
      year: 2001,
   },
   {
      title: 'Star Wars: Episode V - The Empire Strikes Back',
      year: 1980,
   },
   { title: 'Forrest Gump', year: 1994 },
   { title: 'Inception', year: 2010 },
   {
      title: 'The Lord of the Rings: The Two Towers',
      year: 2002,
   },
];

function AddEditUserModal({ show, onClose, isEdit = false, detail, pageStatus, countValue, categoryTitle }) {
   const { locale } = useRouter();
   const t = useTranslations('addresses');

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
      //   setPictures([]);
      //   setPicturesURL([]);
      //   setEditPictures([]);
      //   setEditPicturesURL([]);
      //   setCoverImage();
      //   setCoverImageURL();
      //   setColorsAndCount([]);
      //   setDeletedIds([]);
      reset();
   };

   const formSubmit = data => {
      console.log(data);
   };

   const isAdminCheckbox = watch('isAdmin');

   return (
      <Dialog open={show} onClose={closeModalHandler} fullWidth dir={locale === 'en' ? 'ltr' : 'rtl'} maxWidth="xs">
         <div className="relative p-5 pt-0">
            <div className="sticky top-0 z-[2] flex items-center justify-between border-b border-solid border-[#E4EAF0] bg-white pb-2 pt-3">
               <p className="text-lg font-bold">
                  {isEdit
                     ? // t('Add product')
                       'ویرایش شخص'
                     : //   t('Edit product')
                       'افزودن شخص'}
               </p>
               <IconButton onClick={closeModalHandler}>
                  <CloseIcon />
               </IconButton>
            </div>
            <form onSubmit={handleSubmit(formSubmit)} className="mt-10 space-y-4">
               <div className="flex flex-1 flex-col gap-1">
                  <p className="text-sm text-customBlue">شماره تماس</p>

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
                           label="ادمین است"
                           value={value}
                           onChange={onChange}
                        />
                     )}
                  />
               </div>

               {isAdminCheckbox && (
                  <>
                     <div className="flex flex-1 flex-col gap-1">
                        <p className="text-sm text-[#7E8AAB]">دسترسی ها</p>
                        <Controller
                           control={control}
                           name="permissions"
                           rules={{ required: t('This filed is required') }}
                           render={({ field: { onChange, value }, fieldState }) => (
                              <>
                                 <Autocomplete
                                    multiple
                                    options={top100Films}
                                    disableCloseOnSelect
                                    value={value}
                                    isOptionEqualToValue={(option, optValue) => option.title === optValue.title}
                                    onChange={(e, newValue) => onChange(newValue)}
                                    getOptionLabel={option => option.title}
                                    renderOption={(props, option, { selected }) => (
                                       <li {...props}>
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
                        <p className="text-sm text-customBlue">رمز عبور</p>
                        <TextField
                           variant="outlined"
                           fullWidth
                           autoComplete="off"
                           {...register('password', {
                              required: {
                                 value: true,
                                 message: t('This filed is required'),
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
                     // loading={addAddressIsMutating || editAddressIsMutating}
                     fullWidth
                     className="!rounded-10 !p-3 !text-white"
                  >
                     {isEdit ? 'ویرایش شخص' : 'افزودن شخص'}
                  </LoadingButton>
               </div>
            </form>
         </div>
      </Dialog>
   );
}

export default AddEditUserModal;
