import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// MUI
import { Badge, Button, ClickAwayListener, Grow, IconButton, Paper, Popper } from '@mui/material';

// Icons
import LanguageIcon from '@mui/icons-material/Language';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AutoAwesomeMotionOutlinedIcon from '@mui/icons-material/AutoAwesomeMotionOutlined';
import TakeoutDiningOutlinedIcon from '@mui/icons-material/TakeoutDiningOutlined';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { toggleStatusStatus } from '@/store/reducers/pAdminSideBarStatus';

// Assets
import profilePic from '@/assets/images/userProfile.png';

// Components
import LogoutModal from '@/components/templates/logout-modal/logout-modal';

// Apis
import useGetUserInfo from '@/apis/userInfo/useGetUserInfo';

function AdminLayout({ children }) {
   const [showLogoutModal, setShowLogoutModal] = useState(false);
   const [showLanguageDropDown, setShowLanguageDropDown] = useState(false);

   const userInfo = useSelector(state => state?.userInfoReducer);
   const isLogin = useSelector(state => state?.loginStatusReducer);
   const isSideBarOpen = useSelector(state => state?.pAdminSideBarStatus);

   const { locale, pathname, push, query, asPath } = useRouter();
   const dispatch = useDispatch();
   const languageDropDownRef = useRef();

   const t = useTranslations('adminPanel');
   // eslint-disable-next-line no-unused-vars
   const getUserInfo = useGetUserInfo(isLogin);

   const changeLanguage = lang => {
      push({ pathname, query }, asPath, { locale: lang });
      setShowLanguageDropDown(false);
   };

   return (
      <div className="flex bg-[#f5f8fc]">
         <aside
            className={`hidden h-fit shrink-0 rounded-b-2xl bg-white p-8 transition-all duration-500 customMd:block ${
               isSideBarOpen ? 'w-[330px]' : 'w-[137px]'
            }`}
         >
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
                     className={`rounded-xl bg-[#FFEEED] p-2.5 text-customPinkHigh ${
                        locale === 'en' ? '' : 'rotate-180'
                     }`}
                  />
                  {isSideBarOpen && <p className="text-customPinkHigh">{t('Log out')}</p>}
               </div>
            </Button>
         </aside>

         <div className="grow">
            <div className="flex items-center justify-between bg-white p-8 customMd:px-16">
               <IconButton onClick={() => dispatch(toggleStatusStatus())}>
                  {isSideBarOpen ? (
                     <MenuOutlinedIcon className="!text-3xl" />
                  ) : (
                     <MenuOpenOutlinedIcon className="!text-3xl" />
                  )}
               </IconButton>
               <div className="flex items-center gap-6">
                  <Link href="/">
                     <IconButton sx={{ backgroundColor: '#F5F8FC' }}>
                        <Badge
                           badgeContent={5}
                           color="error"
                           anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'left',
                           }}
                           sx={{
                              '& .MuiBadge-badge': {
                                 fontSize: 10,
                                 width: 16,
                                 height: 16,
                                 minWidth: 16,
                              },
                           }}
                        >
                           <NotificationsNoneOutlinedIcon />
                        </Badge>
                     </IconButton>
                  </Link>

                  <IconButton
                     sx={{ backgroundColor: '#F5F8FC' }}
                     onClick={() => setShowLanguageDropDown(true)}
                     ref={languageDropDownRef}
                  >
                     <LanguageIcon />
                  </IconButton>

                  <Popper
                     open={showLanguageDropDown}
                     anchorEl={languageDropDownRef.current}
                     transition
                     disablePortal
                     sx={{
                        zIndex: 1,
                     }}
                  >
                     {({ TransitionProps, placement }) => (
                        <Grow
                           {...TransitionProps}
                           style={{
                              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                           }}
                        >
                           <Paper>
                              <ClickAwayListener onClickAway={() => setShowLanguageDropDown(false)}>
                                 <div className="flex flex-col">
                                    <Button
                                       className={`${locale === 'fa' ? '!text-[#B1302E]' : ''}`}
                                       color="textColor"
                                       onClick={() => changeLanguage('fa')}
                                    >
                                       FA
                                    </Button>
                                    <Button
                                       className={`${locale === 'en' ? '!text-[#B1302E]' : ''}`}
                                       color="textColor"
                                       onClick={() => changeLanguage('en')}
                                    >
                                       EN
                                    </Button>
                                    <Button
                                       className={`${locale === 'ar' ? '!text-[#B1302E]' : ''}`}
                                       color="textColor"
                                       onClick={() => changeLanguage('ar')}
                                    >
                                       AR
                                    </Button>
                                 </div>
                              </ClickAwayListener>
                           </Paper>
                        </Grow>
                     )}
                  </Popper>
               </div>
            </div>
            <div className="p-8 py-6 customMd:px-16">{children}</div>
         </div>

         <LogoutModal show={showLogoutModal} onClose={() => setShowLogoutModal(false)} />
      </div>
   );
}

export default AdminLayout;
