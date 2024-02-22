import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Link from 'next/link';

// MUI
import { Button, Grow, Paper, Popper } from '@mui/material';

// Icons
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IsoIcon from '@mui/icons-material/Iso';

// Components
import LogoutModal from '../logout-modal/logout-modal';

function ProfileDropdown({ profileDropDown, setProfileDropDown, profileRef, isAdmin }) {
   const [showLogoutModal, setShowLogoutModal] = useState(false);
   const t = useTranslations('header');

   return (
      <>
         <Popper
            open={profileDropDown}
            anchorEl={profileRef.current}
            transition
            disablePortal
            onMouseEnter={() => setProfileDropDown(true)}
            onMouseLeave={() => setProfileDropDown(false)}
         >
            {({ TransitionProps, placement }) => (
               <Grow
                  {...TransitionProps}
                  style={{
                     transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                  }}
               >
                  <Paper sx={{ boxShadow: 'none' }}>
                     <div className="flex min-w-[193px] flex-col overflow-hidden rounded-md bg-customPink">
                        {isAdmin && (
                           <Link
                              href="/adminPanel/products"
                              className="flex items-center gap-1 p-3 text-sm text-white transition-all duration-150 hover:bg-[#D1706F]"
                              onClick={() => setProfileDropDown(false)}
                           >
                              <IsoIcon fontSize="small" />
                              {t('Admin panel')}
                           </Link>
                        )}
                        <Link
                           href="/profile/information"
                           className="flex items-center gap-1 border-t border-solid border-[#E4EAF0] p-3 text-sm text-white transition-all
                            duration-150 hover:bg-[#D1706F]"
                           onClick={() => setProfileDropDown(false)}
                        >
                           <PersonOutlinedIcon fontSize="small" />
                           {t('Account information')}
                        </Link>
                        <Link
                           href="/profile/address"
                           className="flex items-center gap-1 border-t border-solid border-[#E4EAF0] p-3 text-sm text-white transition-all
                                      duration-150 hover:bg-[#D1706F]"
                           onClick={() => setProfileDropDown(false)}
                        >
                           <LocationOnOutlinedIcon fontSize="small" />
                           {t('My address')}
                        </Link>
                        <Link
                           href="/profile/orders"
                           className="flex items-center gap-1 border-t border-solid border-[#E4EAF0] p-3 text-sm text-white transition-all
                                      duration-150 hover:bg-[#D1706F]"
                           onClick={() => setProfileDropDown(false)}
                        >
                           <AccountBalanceWalletOutlinedIcon fontSize="small" />
                           {t('Track orders')}
                        </Link>
                        <Link
                           href="/profile/favorites"
                           className="flex items-center gap-1 border-t border-solid border-[#E4EAF0] p-3 text-sm text-white transition-all
                                      duration-150 hover:bg-[#D1706F]"
                           onClick={() => setProfileDropDown(false)}
                        >
                           <FavoriteBorderIcon fontSize="small" />
                           {t('Favorites')}
                        </Link>
                        <Button
                           className="!flex !items-center !justify-start !gap-1 !rounded-none !border-t !border-solid
                            !border-[#E4EAF0] !p-3 !text-sm !text-white !transition-all !duration-150 hover:!bg-[#D1706F]"
                           onClick={() => setShowLogoutModal(true)}
                        >
                           <LogoutOutlinedIcon fontSize="small" className="rotate-180" />
                           {t('Log out')}
                        </Button>
                     </div>
                  </Paper>
               </Grow>
            )}
         </Popper>

         <LogoutModal show={showLogoutModal} onClose={() => setShowLogoutModal(false)} />
      </>
   );
}

export default ProfileDropdown;
