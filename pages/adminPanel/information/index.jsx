import Head from 'next/head';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';

// Redux
import { useSelector } from 'react-redux';

// MUI
import { Backdrop, CircularProgress, IconButton, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// Icons
import PublishIcon from '@mui/icons-material/Publish';
import PhotoCameraBackOutlinedIcon from '@mui/icons-material/PhotoCameraBackOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';

// Assets
import userProfilePic from '../../../assets/images/userProfile.png';

// Components
import AdminLayout from '@/components/layout/admin-layout/admin-layout';

// Apis
import useChangeProfileImage from '@/apis/profile/useChangeProfileImage';
import useChangeProfileInfo from '@/apis/profile/useChangeProfileInfo';

function Information() {
   const { locale, back, pathname } = useRouter();

   const userInfo = useSelector(state => state?.userInfoReducer);

   const { trigger: changeProfileTrigger, isMutating: changeProfileIsMutating } = useChangeProfileImage();
   const { trigger: changeProfileInfoTrigger, isMutating: changeProfileInfoIsMutating } = useChangeProfileInfo();
   const t = useTranslations('profile');

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

   useEffect(() => {
      if (userInfo?.phone_number && !userInfo?.is_admin) {
         back();
         toast.warn(t("You don't have permission to visit this page"), {
            style: {
               direction: locale === 'en' ? 'ltr' : 'rtl',
               fontFamily:
                  locale === 'en' ? 'poppins' : locale === 'fa' ? 'dana' : locale === 'ar' ? 'rubik' : 'poppins',
               lineHeight: '25px',
            },
            theme: 'colored',
            autoClose: 5000,
         });
      }
   }, [userInfo, pathname]);

   return (
      <AdminLayout>
         <Head>
            <title>{locale === 'fa' ? `یلفان - پنل ادمین` : `Yalfan-admin panel`}</title>
         </Head>
         <div>
            <p className="flex items-center gap-2 rounded bg-white p-7 text-lg font-bold">
               <FeedOutlinedIcon /> {t('Account information')}
            </p>

            {Object.keys(userInfo).length > 0 ? (
               <div className="mt-6 rounded bg-white p-7">
                  <div className="relative mx-auto w-fit cursor-pointer customMd:mx-0">
                     <div className="relative size-28 cursor-pointer">
                        <Image
                           src={userInfo?.image || userProfilePic}
                           alt="user profile"
                           className="cursor-pointer rounded-full object-cover"
                           fill
                        />
                     </div>
                     <IconButton
                        className="!absolute !bottom-[-15px] !start-1 !cursor-pointer !bg-customPinkHigh"
                        sx={{ width: '33px', height: '33px' }}
                     >
                        <PhotoCameraBackOutlinedIcon fontSize="small" color="white" />
                     </IconButton>

                     <input
                        type="file"
                        className="absolute inset-0 cursor-pointer opacity-0"
                        onChange={changeProfileImageHandler}
                        accept="image/*"
                     />
                  </div>

                  <form onSubmit={handleSubmit(formSubmit)} className="mt-12">
                     <div className="mb-12 flex flex-col gap-6 customLg:flex-row">
                        <div className="flex flex-1 flex-col gap-2">
                           <p className="text-sm">{t('FullName')}</p>

                           <TextField
                              variant="outlined"
                              fullWidth
                              color="customPink"
                              placeholder={t('Enter your name')}
                              {...register('fullName', {
                                 required: {
                                    value: true,
                                    message: t('This filed is required'),
                                 },
                              })}
                              error={!!errors?.fullName}
                              helperText={errors?.fullName?.message}
                              disabled={changeProfileInfoIsMutating}
                           />
                        </div>

                        <div className="flex flex-1 flex-col gap-2">
                           <p className="text-sm">{t('Phone number')}</p>
                           <TextField
                              variant="outlined"
                              fullWidth
                              {...register('phoneNumber')}
                              error={!!errors?.phoneNumber}
                              helperText={errors?.phoneNumber?.message}
                              disabled
                           />
                        </div>
                     </div>

                     <LoadingButton
                        variant="contained"
                        type="submit"
                        size="large"
                        color="customPinkHigh"
                        loading={changeProfileInfoIsMutating}
                        className="!rounded-10 !py-3 !text-white"
                        fullWidth
                        startIcon={<PublishIcon className="rotate-180" />}
                     >
                        {t('Edit information')}
                     </LoadingButton>
                  </form>
               </div>
            ) : (
               <div className="mt-10 flex items-center justify-center">
                  <CircularProgress color="customPink" />
               </div>
            )}
         </div>
         <Backdrop sx={{ zIndex: 2 }} open={changeProfileIsMutating}>
            <CircularProgress color="customPink" />
         </Backdrop>
      </AdminLayout>
   );
}

export default Information;

export async function getServerSideProps(context) {
   const { req } = context;
   const accessToken = req?.cookies?.yalfan_accessToken;
   const refreshToken = req?.cookies?.yalfan_refreshToken;

   if (accessToken && refreshToken) {
      return {
         props: {
            messages: (await import(`../../../messages/${context.locale}.json`)).default,
         },
      };
   }

   return {
      redirect: {
         destination: '/login',
      },
   };
}
