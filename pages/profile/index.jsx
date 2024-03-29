import Head from 'next/head';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Redux
import { useSelector } from 'react-redux';

// MUI
import { Button } from '@mui/material';

// Icon
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

// Assets
import profilePic from '@/assets/images/userProfile.png';

// Components
import ProfileLayout from '@/components/layout/profile-layout/profile-layout';
import LogoutModal from '@/components/templates/logout-modal/logout-modal';

function Profile() {
   const [showLogoutModal, setShowLogoutModal] = useState(false);
   const pathName = usePathname();
   const { locale } = useRouter();
   const t = useTranslations('profile');

   const userInfo = useSelector(state => state?.userInfoReducer);

   return (
      <main>
         <Head>
            <title>{locale === 'fa' ? `یلفان - پروفایل` : `Yalfan-profile`}</title>
         </Head>
         <div className="hidden customMd:block">
            <ProfileLayout />
         </div>

         <div className="px-5 py-12 customMd:hidden">
            <div className="flex items-center gap-4">
               <div className="relative h-[75px] w-[75px]">
                  <Image alt="profile" src={userInfo?.image || profilePic} className="rounded-full object-cover" fill />
               </div>
               <div className="space-y-1.5">
                  <p className="text-xl font-bold">{userInfo?.name}</p>
                  <p className="text-[13px] text-textColor">{userInfo?.phone_number}</p>
               </div>
            </div>

            <div className="mb-2 mt-10 flex flex-col gap-2">
               <Link
                  href="/profile/information"
                  className={`flex w-full items-center gap-4 rounded-2xl border-s-[7px] border-solid py-3.5 pe-5 ps-3 hover:bg-[#FCF7F7] ${
                     pathName === '/profile/information'
                        ? 'border-customPinkHigh bg-[#FCF7F7] text-customPinkHigh'
                        : 'border-transparent'
                  }`}
               >
                  <div
                     className={`flex h-11 w-11 items-center justify-center rounded-10 ${
                        pathName === '/profile/information' ? 'bg-[#FFBEBC]' : 'bg-[#F5F8FC]'
                     }`}
                  >
                     <PersonOutlineIcon color={pathName === '/profile/information' ? 'white' : 'textColor'} />
                  </div>

                  <p className="text-[15px]">{t('Account information')}</p>

                  <div className="ms-auto">
                     <ArrowBackIosNewOutlinedIcon
                        fontSize="inherit"
                        {...(locale === 'en' && { className: 'rotate-180' })}
                     />
                  </div>
               </Link>

               <Link
                  href="/profile/address"
                  className={`flex w-full items-center gap-4 rounded-2xl border-s-[7px] border-solid py-3.5 pe-5 ps-3 hover:bg-[#FCF7F7] ${
                     pathName === '/profile/address'
                        ? 'border-customPinkHigh bg-[#FCF7F7] text-customPinkHigh'
                        : 'border-transparent'
                  }`}
               >
                  <div
                     className={`flex h-11 w-11 items-center justify-center rounded-10 ${
                        pathName === '/profile/address' ? 'bg-[#FFBEBC]' : 'bg-[#F5F8FC]'
                     }`}
                  >
                     <LocationOnOutlinedIcon color={pathName === '/profile/address' ? 'white' : 'textColor'} />
                  </div>

                  <p className="text-[15px]">{t('My address')}</p>

                  <div className="ms-auto">
                     <ArrowBackIosNewOutlinedIcon
                        fontSize="inherit"
                        {...(locale === 'en' && { className: 'rotate-180' })}
                     />
                  </div>
               </Link>

               <Link
                  href="/profile/orders"
                  className={`flex w-full items-center gap-4 rounded-2xl border-s-[7px] border-solid py-3.5 pe-5 ps-3 hover:bg-[#FCF7F7] ${
                     pathName === '/profile/orders'
                        ? 'border-customPinkHigh bg-[#FCF7F7] text-customPinkHigh'
                        : 'border-transparent'
                  }`}
               >
                  <div
                     className={`flex h-11 w-11 items-center justify-center rounded-10 ${
                        pathName === '/profile/orders' ? 'bg-[#FFBEBC]' : 'bg-[#F5F8FC]'
                     }`}
                  >
                     <AccountBalanceWalletOutlinedIcon color={pathName === '/profile/orders' ? 'white' : 'textColor'} />
                  </div>

                  <p className="text-[15px]">{t('Track orders')}</p>

                  <div className="ms-auto">
                     <ArrowBackIosNewOutlinedIcon
                        fontSize="inherit"
                        {...(locale === 'en' && { className: 'rotate-180' })}
                     />
                  </div>
               </Link>

               <Link
                  href="/profile/favorites"
                  className={`flex w-full items-center gap-4 rounded-2xl border-s-[7px] border-solid py-3.5 pe-5 ps-3 hover:bg-[#FCF7F7] ${
                     pathName === '/profile/favorites'
                        ? 'border-customPinkHigh bg-[#FCF7F7] text-customPinkHigh'
                        : 'border-transparent'
                  }`}
               >
                  <div
                     className={`flex h-11 w-11 items-center justify-center rounded-10 ${
                        pathName === '/profile/favorites' ? 'bg-[#FFBEBC]' : 'bg-[#F5F8FC]'
                     }`}
                  >
                     <FavoriteBorderIcon color={pathName === '/profile/favorites' ? 'white' : 'textColor'} />
                  </div>

                  <p className="text-[15px]">{t('Favorites')}</p>

                  <div className="ms-auto">
                     <ArrowBackIosNewOutlinedIcon
                        fontSize="inherit"
                        {...(locale === 'en' && { className: 'rotate-180' })}
                     />
                  </div>
               </Link>
            </div>

            <Button
               variant="contained"
               type="submit"
               size="large"
               color="white"
               className="!rounded-10 !px-5 !py-3.5"
               fullWidth
               onClick={() => setShowLogoutModal(true)}
            >
               <div className="flex w-full items-center gap-3">
                  <LogoutOutlinedIcon
                     className={`rounded-xl bg-[#FFEEED] p-2 text-customPinkHigh ${
                        locale === 'en' ? '' : 'rotate-180'
                     }`}
                  />
                  <p className="pt-1 text-customPinkHigh">{t('Log out')}</p>
               </div>
            </Button>
         </div>

         <LogoutModal show={showLogoutModal} onClose={() => setShowLogoutModal(false)} />
      </main>
   );
}

export default Profile;

export async function getServerSideProps(context) {
   const { req } = context;
   const accessToken = req?.cookies?.yalfan_accessToken;
   const refreshToken = req?.cookies?.yalfan_refreshToken;

   if (accessToken && refreshToken) {
      return {
         props: {
            messages: (await import(`../../messages/${context.locale}.json`)).default,
         },
      };
   }

   return {
      redirect: {
         destination: '/login',
      },
   };
}
