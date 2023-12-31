import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';

// Redux
import { useSelector } from 'react-redux';

// MUI
import { Backdrop, CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// Icons
import BorderColorIcon from '@mui/icons-material/BorderColor';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';

// Assets
import userProfilePic from '../../../assets/images/userProfile.png';

// Components
import ProfileLayout from '@/components/layout/profile-layout/profile-layout';
import RtlProvider from '@/components/layout/rtlProvider/rtlProvider';

// Apis
import useChangeProfileImage from '@/apis/profile/useChangeProfileImage';
import useChangeProfileInfo from '@/apis/profile/useChangeProfileInfo';

function Information() {
   const userInfo = useSelector(state => state?.userInfoReducer);

   const { trigger: changeProfileTrigger, isMutating: changeProfileIsMutating } = useChangeProfileImage();
   const { trigger: changeProfileInfoTrigger, isMutating: changeProfileInfoIsMutating } = useChangeProfileInfo();

   const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
   } = useForm({
      defaultValues: {
         fullName: '',
         phoneNumber: '',
      },
      mode: 'onSubmit',
   });

   useEffect(() => {
      if (userInfo) {
         setValue('fullName', userInfo?.name);
         setValue('phoneNumber', userInfo?.phone_number);
      }
   }, [userInfo]);

   const formSubmit = data => {
      const newDetail = {
         name: data?.fullName,
      };

      changeProfileInfoTrigger(newDetail);
   };

   const changeProfileImageHandler = e => {
      const formData = new FormData();
      formData.append('image', e.target.files[0]);
      changeProfileTrigger(formData);
   };

   return (
      <ProfileLayout>
         <div>
            <p className="border-b border-solid border-[#E4EAF0] pb-4 font-bold">اطلاعات کاربری</p>

            {Object.keys(userInfo).length > 0 ? (
               <>
                  <div className="relative mx-auto mt-14 w-fit cursor-pointer customMd:mx-0">
                     <div className="h-28 w-28 cursor-pointer">
                        {userInfo?.image ? (
                           <img
                              src={userInfo?.image}
                              alt="user profile"
                              className="h-full w-full cursor-pointer rounded-full object-cover"
                           />
                        ) : (
                           <Image
                              src={userProfilePic}
                              alt="user profile"
                              className="h-full w-full cursor-pointer rounded-full object-cover"
                           />
                        )}
                     </div>
                     <IconButton
                        className="absolute bottom-0 left-0 cursor-pointer bg-customPink"
                        sx={{ width: '33px', height: '33px' }}
                     >
                        <BorderColorIcon fontSize="small" />
                     </IconButton>

                     <input
                        type="file"
                        className="absolute inset-0 cursor-pointer opacity-0"
                        onChange={changeProfileImageHandler}
                        accept="image/*"
                     />
                  </div>

                  <form onSubmit={handleSubmit(formSubmit)} className="mt-10">
                     <RtlProvider>
                        <div className="mb-12 flex flex-col gap-6 customLg:flex-row">
                           <div className="flex flex-1 flex-col gap-1">
                              <p className="text-sm text-[#7E8AAB]">نام و نام خانوادگی</p>

                              <TextField
                                 variant="outlined"
                                 fullWidth
                                 color="customPink"
                                 InputProps={{
                                    startAdornment: (
                                       <InputAdornment position="start">
                                          <DriveFileRenameOutlineIcon />
                                       </InputAdornment>
                                    ),
                                 }}
                                 {...register('fullName', {
                                    required: {
                                       value: true,
                                       message: 'این فیلد اجباری است',
                                    },
                                 })}
                                 error={!!errors?.fullName}
                                 helperText={errors?.fullName?.message}
                                 disabled={changeProfileInfoIsMutating}
                              />
                           </div>

                           <div className="flex flex-1 flex-col gap-1">
                              <p className="text-sm text-[#7E8AAB]">شماره تلفن همراه</p>
                              <TextField
                                 variant="outlined"
                                 fullWidth
                                 color="customPink"
                                 type="number"
                                 InputProps={{
                                    startAdornment: (
                                       <InputAdornment position="start">
                                          <PhoneAndroidIcon />
                                       </InputAdornment>
                                    ),
                                 }}
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
                                 })}
                                 error={!!errors?.phoneNumber}
                                 helperText={errors?.phoneNumber?.message}
                                 disabled
                              />
                           </div>
                        </div>
                     </RtlProvider>

                     <LoadingButton
                        variant="contained"
                        type="submit"
                        size="large"
                        color="customPink"
                        loading={changeProfileInfoIsMutating}
                        className="w-full !rounded-10 !p-2 customLg:w-auto"
                     >
                        <div className="flex w-full items-center justify-between customLg:w-[330px]">
                           <KeyboardTabIcon className="rotate-90 rounded-xl bg-white p-2 text-customPink" />
                           <p>ثبت اطلاعات</p>
                        </div>
                     </LoadingButton>
                  </form>
               </>
            ) : (
               <div className="mt-10 flex items-center justify-center">
                  <CircularProgress color="customPink" />
               </div>
            )}
         </div>
         <Backdrop sx={{ zIndex: 2 }} open={changeProfileIsMutating}>
            <CircularProgress color="customPink" />
         </Backdrop>
      </ProfileLayout>
   );
}

export default Information;

export async function getStaticProps(context) {
   return {
      props: {
         messages: (await import(`../../../messages/${context.locale}.json`)).default,
      },
   };
}
