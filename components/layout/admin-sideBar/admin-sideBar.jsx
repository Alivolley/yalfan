import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

// MUI
import { Button, IconButton, useMediaQuery, useTheme } from '@mui/material';

// Icons
import CloseIcon from '@mui/icons-material/Close';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AutoAwesomeMotionOutlinedIcon from '@mui/icons-material/AutoAwesomeMotionOutlined';
import TakeoutDiningOutlinedIcon from '@mui/icons-material/TakeoutDiningOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { changeToStatusTrue } from '@/store/reducers/pAdminSideBarStatus';

// Assets
import profilePic from '@/assets/images/userProfile.png';

// Components
import LogoutModal from '@/components/templates/logout-modal/logout-modal';

// Apis
import useGetUserInfo from '@/apis/userInfo/useGetUserInfo';

function AdminSideBar({ isMobile, onClose }) {
   const [showLogoutModal, setShowLogoutModal] = useState(false);
   const userInfo = useSelector(state => state?.userInfoReducer);
   const isLogin = useSelector(state => state?.loginStatusReducer);
   const isSideBarOpen = useSelector(state => state?.pAdminSideBarStatus);

   const { locale, pathname } = useRouter();
   const dispatch = useDispatch();
   const theme = useTheme();
   const isTablet = useMediaQuery(theme.breakpoints.down('md'));

   const t = useTranslations('adminPanel');
   // eslint-disable-next-line no-unused-vars
   const getUserInfo = useGetUserInfo(isLogin);

   useEffect(() => {
      if (isTablet) {
         dispatch(changeToStatusTrue());
      }
   }, [isTablet]);

   return (
      <aside
         className={`h-fit shrink-0 rounded-b-2xl bg-white px-8 py-4 transition-all duration-500 customMd:p-8 ${
            isSideBarOpen ? 'customXs:w-[330px]' : 'w-[137px]'
         } ${isMobile ? 'customMd:hidden' : 'sticky top-0 z-[2] hidden customMd:block'}`}
      >
         <div className="flex justify-end customMd:hidden">
            <IconButton onClick={onClose}>
               <CloseIcon />
            </IconButton>
         </div>
         <div
            className={`flex flex-wrap items-center border-b border-solid border-[#E4EAF0] pb-3 transition-all duration-500 ${
               isSideBarOpen ? 'gap-4' : 'gap-2.5'
            }`}
         >
            <div
               className={`transition-all duration-500 ${
                  isSideBarOpen ? 'h-[65px] w-[65px]' : 'mx-auto h-[40px] w-[40px]'
               }`}
            >
               {userInfo?.image ? (
                  <img alt="profile" src={userInfo?.image} className="h-full w-full rounded-full object-cover" />
               ) : (
                  <Image alt="profile" src={profilePic} className="h-full w-full rounded-full object-cover" />
               )}
            </div>
            <div className={`space-y-3 transition-all duration-500 ${isSideBarOpen ? '' : 'w-full'}`}>
               <p
                  className={`font-bold text-[#B1302E] transition-all duration-500 ${
                     isSideBarOpen ? 'text-base' : 'text-center text-xs'
                  }`}
               >
                  {userInfo?.name}
               </p>
               {isSideBarOpen && <p className="text-xs text-textColor">{userInfo?.phone_number}</p>}
            </div>
         </div>

         <div className="mb-3 mt-8 flex flex-col gap-3">
            <Link
               href="/adminPanel/products"
               className={`flex w-full items-center gap-4 rounded-2xl p-3 hover:bg-[#FCF7F7] ${
                  pathname === '/adminPanel/products' ? 'bg-[#FCF7F7] text-customPinkHigh' : ''
               }`}
            >
               <div
                  className={`flex h-11 w-11 items-center justify-center rounded-10 ${
                     pathname === '/adminPanel/products' ? 'bg-[#FFEEED]' : 'bg-[#F5F8FC]'
                  }`}
               >
                  <AutoAwesomeMotionOutlinedIcon
                     color={pathname === '/adminPanel/products' ? 'customPinkHigh' : 'textColor'}
                  />
               </div>
               {isSideBarOpen && <p className="text-[15px]">{t('Products')}</p>}
            </Link>
            <Link
               href="/adminPanel/orders"
               className={`flex w-full items-center gap-4 rounded-2xl p-3 hover:bg-[#FCF7F7] ${
                  pathname === '/adminPanel/orders' ? 'bg-[#FCF7F7] text-customPinkHigh' : ''
               }`}
            >
               <div
                  className={`flex h-11 w-11 items-center justify-center rounded-10 ${
                     pathname === '/adminPanel/orders' ? 'bg-[#FFEEED]' : 'bg-[#F5F8FC]'
                  }`}
               >
                  <TakeoutDiningOutlinedIcon
                     color={pathname === '/adminPanel/orders' ? 'customPinkHigh' : 'textColor'}
                  />
               </div>
               {isSideBarOpen && <p className="text-[15px]">{t('Orders')}</p>}
            </Link>
            <Link
               href="/adminPanel/orders"
               className={`flex w-full items-center gap-4 rounded-2xl p-3 hover:bg-[#FCF7F7] ${
                  pathname === '/adminPanel/orders' ? 'bg-[#FCF7F7] text-customPinkHigh' : ''
               }`}
            >
               <div
                  className={`flex h-11 w-11 items-center justify-center rounded-10 ${
                     pathname === '/adminPanel/orders' ? 'bg-[#FFEEED]' : 'bg-[#F5F8FC]'
                  }`}
               >
                  <PeopleAltOutlinedIcon color={pathname === '/adminPanel/orders' ? 'customPinkHigh' : 'textColor'} />
               </div>
               {isSideBarOpen && <p className="text-[15px]">{t('Users')}</p>}
            </Link>
            <Link
               href="/adminPanel/orders"
               className={`flex w-full items-center gap-4 rounded-2xl p-3 hover:bg-[#FCF7F7] ${
                  pathname === '/adminPanel/orders' ? 'bg-[#FCF7F7] text-customPinkHigh' : ''
               }`}
            >
               <div
                  className={`flex h-11 w-11 items-center justify-center rounded-10 ${
                     pathname === '/adminPanel/orders' ? 'bg-[#FFEEED]' : 'bg-[#F5F8FC]'
                  }`}
               >
                  <DescriptionOutlinedIcon color={pathname === '/adminPanel/orders' ? 'customPinkHigh' : 'textColor'} />
               </div>
               {isSideBarOpen && <p className="text-[15px]">{t('Reports')}</p>}
            </Link>
         </div>

         <Button
            variant="contained"
            size="large"
            color="white"
            className="!rounded-10 !px-3 !py-2.5"
            fullWidth
            onClick={() => setShowLogoutModal(true)}
         >
            <div className="flex w-full items-center gap-3">
               <LogoutOutlinedIcon
                  className={`rounded-xl bg-[#FFEEED] p-2.5 text-customPinkHigh ${locale === 'en' ? '' : 'rotate-180'}`}
               />
               {isSideBarOpen && <p className="text-customPinkHigh">{t('Log out')}</p>}
            </div>
         </Button>

         <LogoutModal show={showLogoutModal} onClose={() => setShowLogoutModal(false)} />
      </aside>
   );
}

export default AdminSideBar;
