import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import Link from 'next/link';

// MUI
import {
   Accordion,
   AccordionDetails,
   AccordionSummary,
   Button,
   Drawer,
   FormControl,
   IconButton,
   InputAdornment,
   TextField,
} from '@mui/material';

// Icons
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

// Icons
import CloseIcon from '@mui/icons-material/Close';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import categoriesIcon from '@/assets/icons/menu-categories-icon.svg';
import discountIcon from '@/assets/icons/discount-icon.svg';

// Assets
import fakeLogo from '@/assets/images/fake-logo.png';
import searchIcon from '@/assets/icons/search-icon.svg';

// Components
import LogoutModal from '@/components/templates/logout-modal/logout-modal';

function MobileMenu({ open, onClose, locale, isUserLogin }) {
   const [showLogoutModal, setShowLogoutModal] = useState(false);
   const t = useTranslations('header');

   const { register, handleSubmit } = useForm({
      defaultValues: {
         searchInput: '',
      },
   });

   const formSubmit = data => {
      console.log(data);
      // router.push(`/search?food_name=${data.searchInput}&page=1`);
      // closeModalHandler();
   };

   return (
      <Drawer anchor="left" open={open} onClose={onClose} dir={locale === 'en' ? 'ltr' : 'rtl'}>
         <div className="w-[300px]">
            <div className="flex items-start justify-between">
               <div className="flex items-center gap-2 p-5 customMd:gap-3">
                  <div className="w-[40px] shrink-0 customMd:h-16 customMd:w-[73px]">
                     <Image src={fakeLogo} alt="logo" className="h-full w-full" />
                  </div>
                  <div className="space-y-0.5">
                     <p className="text-sm font-bold customMd:text-xl">{t('yalfan')}</p>
                     <p className="text-[8px] text-[#58595B] customMd:text-xs">{t('online shop for bags')}</p>
                  </div>
               </div>
               <IconButton onClick={onClose}>
                  <CloseIcon />
               </IconButton>
            </div>
            <div className="px-5">
               <div className="border-y border-solid border-[#BFC4D5] py-9">
                  <form onSubmit={handleSubmit(formSubmit)}>
                     <FormControl variant="outlined">
                        <TextField
                           placeholder={t('search')}
                           color="customPink"
                           sx={{
                              bgcolor: '#F5F8FC',
                              borderRadius: '10px',
                           }}
                           {...register('searchInput', {
                              required: {
                                 value: true,
                              },
                           })}
                           InputProps={{
                              startAdornment: (
                                 <InputAdornment position="start">
                                    <IconButton type="submit" edge="start">
                                       <Image src={searchIcon} alt="search Icon" />
                                    </IconButton>
                                 </InputAdornment>
                              ),
                           }}
                        />
                     </FormControl>
                  </form>

                  <br />
                  {isUserLogin && (
                     <Accordion sx={{ boxShadow: 'none' }}>
                        <AccordionSummary
                           expandIcon={<ExpandMoreIcon color="customBlue" />}
                           sx={{ padding: '0 !important' }}
                        >
                           <div className="flex items-center gap-2 text-sm text-customBlue">
                              <PersonOutlineOutlinedIcon />
                              {t('Profile')}
                           </div>
                        </AccordionSummary>
                        <AccordionDetails>
                           <div className="-mt-4 flex flex-col items-start">
                              <Link
                                 href="/profile/information"
                                 className="flex w-full items-center gap-1 border-b border-solid border-[#E4EAF0] p-3 text-sm text-textColor"
                              >
                                 <PersonOutlinedIcon fontSize="small" />
                                 اطلاعات حساب
                              </Link>
                              <Link
                                 href="/profile/address"
                                 className="flex w-full items-center gap-1 border-b border-solid border-[#E4EAF0] p-3 text-sm text-textColor"
                              >
                                 <LocationOnOutlinedIcon fontSize="small" />
                                 آدرس های من
                              </Link>
                              <Link
                                 href="/profile/orders"
                                 className="flex w-full items-center gap-1 border-b border-solid border-[#E4EAF0] p-3 text-sm text-textColor"
                              >
                                 <AccountBalanceWalletOutlinedIcon fontSize="small" />
                                 پیگیری سفارش ها
                              </Link>
                              <Button
                                 className="!p-3 text-sm"
                                 color="textColor"
                                 startIcon={<LogoutOutlinedIcon fontSize="small" className="rotate-180" />}
                                 onClick={() => setShowLogoutModal(true)}
                              >
                                 خروج از حساب کاربری
                              </Button>
                           </div>
                        </AccordionDetails>
                     </Accordion>
                  )}

                  <div>
                     <Accordion
                        sx={{
                           boxShadow: 'none',
                        }}
                     >
                        <AccordionSummary
                           expandIcon={<ExpandMoreIcon color="customBlue" />}
                           sx={{
                              padding: '0 !important',
                           }}
                        >
                           <div className="flex items-center gap-2 text-sm text-customBlue">
                              <Image src={categoriesIcon} alt="categories" />
                              {t('categories')}
                           </div>
                        </AccordionSummary>
                        <AccordionDetails>
                           <div className="ms-[-15px] border-s border-solid border-[#B1302E] pe-8 ps-3">
                              <Accordion
                                 sx={{
                                    boxShadow: 'none',
                                 }}
                              >
                                 <AccordionSummary
                                    expandIcon={<ExpandMoreIcon color="customBlue" />}
                                    sx={{
                                       padding: '0 !important',
                                    }}
                                 >
                                    <div className="flex items-center gap-2 text-sm text-customBlue">
                                       <div className="h-1 w-1 rounded-full bg-customBlue" />
                                       {t('categories')}
                                    </div>
                                 </AccordionSummary>
                                 <AccordionDetails>
                                    <p>
                                       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
                                       lacus ex, sit amet blandit leo lobortis eget.
                                    </p>
                                 </AccordionDetails>
                              </Accordion>
                              <Accordion
                                 sx={{
                                    boxShadow: 'none',
                                 }}
                              >
                                 <AccordionSummary
                                    expandIcon={<ExpandMoreIcon color="customBlue" />}
                                    sx={{
                                       padding: '0 !important',
                                    }}
                                 >
                                    <div className="flex items-center gap-2 text-sm text-customBlue">
                                       <div className="h-1 w-1 rounded-full bg-customBlue" />
                                       {t('categories')}
                                    </div>
                                 </AccordionSummary>
                                 <AccordionDetails>
                                    <p>
                                       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
                                       lacus ex, sit amet blandit leo lobortis eget.
                                    </p>
                                 </AccordionDetails>
                              </Accordion>
                              <Accordion
                                 sx={{
                                    boxShadow: 'none',
                                 }}
                              >
                                 <AccordionSummary
                                    expandIcon={<ExpandMoreIcon color="customBlue" />}
                                    sx={{
                                       padding: '0 !important',
                                    }}
                                 >
                                    <div className="flex items-center gap-2 text-sm text-customBlue">
                                       <div className="h-1 w-1 rounded-full bg-customBlue" />
                                       {t('categories')}
                                    </div>
                                 </AccordionSummary>
                                 <AccordionDetails>
                                    <p>
                                       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
                                       lacus ex, sit amet blandit leo lobortis eget.
                                    </p>
                                 </AccordionDetails>
                              </Accordion>
                              <Accordion
                                 sx={{
                                    boxShadow: 'none',
                                 }}
                              >
                                 <AccordionSummary
                                    expandIcon={<ExpandMoreIcon color="customBlue" />}
                                    sx={{
                                       padding: '0 !important',
                                    }}
                                 >
                                    <div className="flex items-center gap-2 text-sm text-customBlue">
                                       <div className="h-1 w-1 rounded-full bg-customBlue" />
                                       {t('categories')}
                                    </div>
                                 </AccordionSummary>
                                 <AccordionDetails>
                                    <p>
                                       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
                                       lacus ex, sit amet blandit leo lobortis eget.
                                    </p>
                                 </AccordionDetails>
                              </Accordion>
                           </div>
                        </AccordionDetails>
                     </Accordion>

                     <div className="mt-1 flex flex-col items-start gap-3 text-sm">
                        {!isUserLogin && (
                           <Link href="/login">
                              <Button size="small" color="customBlue" startIcon={<PersonOutlineOutlinedIcon />}>
                                 {t('signup')}
                              </Button>
                           </Link>
                        )}
                        <Link href="/">
                           <Button size="small" color="customBlue" startIcon={<WhatshotIcon />}>
                              {t('top sellers')}
                           </Button>
                        </Link>
                        <Link href="/">
                           <Button size="small" color="customBlue" startIcon={<FiberNewIcon />}>
                              {t('newest')}
                           </Button>
                        </Link>
                        <Link href="/">
                           <Button
                              size="small"
                              color="customBlue"
                              startIcon={<Image src={discountIcon} alt="discount" />}
                           >
                              {t('discounts and offers')}
                           </Button>
                        </Link>
                     </div>
                  </div>
               </div>

               <div className="mt-5 flex flex-col items-start gap-4 pb-5 text-sm text-textColor">
                  <Link href="/faqs">{t('any question')}</Link>
                  <Link href="/">{t('about us')}</Link>
                  <Link href="/contactUs">{t('contact us')}</Link>
               </div>
            </div>
         </div>
         <LogoutModal show={showLogoutModal} onClose={() => setShowLogoutModal(false)} />
      </Drawer>
   );
}

export default MobileMenu;
