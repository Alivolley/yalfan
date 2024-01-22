import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import Link from 'next/link';

// MUI
import { Button, ClickAwayListener, Drawer, Grow, IconButton, Paper, Popper } from '@mui/material';

// Icons
import LanguageIcon from '@mui/icons-material/Language';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { toggleStatusStatus } from '@/store/reducers/pAdminSideBarStatus';

// Components
import AdminSideBar from '../admin-sideBar/admin-sideBar';

function AdminLayout({ children }) {
   const [showLanguageDropDown, setShowLanguageDropDown] = useState(false);
   const [showMobileMenu, setShowMobileMenu] = useState(false);

   const isSideBarOpen = useSelector(state => state?.pAdminSideBarStatus);

   const { locale, pathname, push, query, asPath } = useRouter();
   const dispatch = useDispatch();
   const languageDropDownRef = useRef();

   const changeLanguage = lang => {
      push({ pathname, query }, asPath, { locale: lang });
      setShowLanguageDropDown(false);
   };

   return (
      <div className="relative flex bg-[#f5f8fc]">
         <AdminSideBar />

         <Drawer
            anchor="left"
            open={showMobileMenu}
            onClose={() => setShowMobileMenu(false)}
            dir={locale === 'en' ? 'ltr' : 'rtl'}
         >
            <AdminSideBar isMobile onClose={() => setShowMobileMenu(false)} />
         </Drawer>

         <div className="w-full customMd:grow">
            <div className="sticky top-0 z-[2] flex w-full items-center justify-between bg-white px-8 py-4 customMd:px-16 customMd:py-8">
               <div className="hidden customMd:block">
                  <IconButton onClick={() => dispatch(toggleStatusStatus())}>
                     {isSideBarOpen ? (
                        <MenuOutlinedIcon className="!text-3xl" />
                     ) : (
                        <MenuOpenOutlinedIcon className="!text-3xl" />
                     )}
                  </IconButton>
               </div>
               <div className="customMd:hidden">
                  <IconButton onClick={() => setShowMobileMenu(true)}>
                     <MenuOutlinedIcon className="!text-3xl" />
                  </IconButton>
               </div>
               <div className="flex items-center gap-6">
                  {/* <Link href="/">
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
                  </Link> */}

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

                  <Link href="/">
                     <IconButton sx={{ backgroundColor: '#F5F8FC' }}>
                        <HomeOutlinedIcon />
                     </IconButton>
                  </Link>
               </div>
            </div>
            <div className="w-full p-8">{children}</div>
         </div>
      </div>
   );
}

export default AdminLayout;
