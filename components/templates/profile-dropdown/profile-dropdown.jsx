import { useState } from 'react';
import Link from 'next/link';

// MUI
import { Button, Grow, Paper, Popper } from '@mui/material';

// Icons
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

// Components
import LogoutModal from '../logout-modal/logout-modal';

function ProfileDropdown({ profileDropDown, setProfileDropDown, profileRef }) {
   const [showLogoutModal, setShowLogoutModal] = useState(false);

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
                  <Paper>
                     <div className="flex flex-col rounded-md bg-customPink">
                        <Link
                           href="/profile/information"
                           className="flex items-center gap-1 p-3 text-sm text-white transition-all duration-150 hover:bg-customPink2 hover:text-black"
                           onClick={() => setProfileDropDown(false)}
                        >
                           <PersonOutlinedIcon fontSize="small" />
                           اطلاعات حساب
                        </Link>
                        <Link
                           href="/profile/address"
                           className="flex items-center gap-1 border-t border-solid border-[#E4EAF0] p-3 text-sm text-white transition-all
                                      duration-150 hover:bg-customPink2 hover:text-black"
                           onClick={() => setProfileDropDown(false)}
                        >
                           <LocationOnOutlinedIcon fontSize="small" />
                           آدرس های من
                        </Link>
                        <Link
                           href="/profile/orders"
                           className="flex items-center gap-1 border-t border-solid border-[#E4EAF0] p-3 text-sm text-white transition-all
                                      duration-150 hover:bg-customPink2 hover:text-black"
                           onClick={() => setProfileDropDown(false)}
                        >
                           <AccountBalanceWalletOutlinedIcon fontSize="small" />
                           پیگیری سفارش ها
                        </Link>
                        <Button
                           className="flex items-center gap-1 !border-t !border-solid !border-[#E4EAF0] !p-3 text-sm !text-white transition-all
                                      duration-150 hover:!bg-customPink2 hover:!text-black"
                           onClick={() => setShowLogoutModal(true)}
                        >
                           <LogoutOutlinedIcon fontSize="small" className="rotate-180" />
                           خروج از حساب کاربری
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
