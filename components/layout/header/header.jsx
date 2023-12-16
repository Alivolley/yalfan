import Link from 'next/link';
import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useForm } from 'react-hook-form';

// MUI
import {
   Button,
   ClickAwayListener,
   Fab,
   FormControl,
   Grow,
   IconButton,
   InputAdornment,
   Paper,
   Popper,
   TextField,
} from '@mui/material';

// Icons
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

// hooks
import useOnClickOutside from '@/hooks/useOnclickOutside';

// Assets
import fakeLogo from '@/assets/images/fake-logo.png';
import searchIcon from '@/assets/icons/search-icon.svg';
import categoriesIcon from '@/assets/icons/menu-categories-icon.svg';
import discountIcon from '@/assets/icons/discount-icon.svg';
import callIcon from '@/assets/icons/call-icon.svg';

// Components
import MobileMenu from '../mobile-menu/mobile-menu';

function Header({ language }) {
   const [showLanguageSelector, setShowLanguageSelector] = useState(false);
   const [showLanguageDropDown, setShowLanguageDropDown] = useState(false);
   const [showMobileMenu, setShowMobileMenu] = useState(false);
   const languageDropDownRef = useRef();

   const t = useTranslations('header');
   const router = useRouter();
   const { pathname, asPath, query } = router;
   const [languageRef] = useOnClickOutside(() => setShowLanguageSelector(false));

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

   const changeLanguage = lang => {
      router.push({ pathname, query }, asPath, { locale: lang });
      setShowLanguageSelector(false);
      setShowLanguageDropDown(false);
   };

   return (
      <header className="sticky top-0 z-10 bg-white px-8 pt-5 customMd:px-16 customMd:pt-10">
         <div className="flex items-center justify-between border-solid border-borderColor pb-6 customMd:border-b">
            <div className="flex items-center gap-2 customMd:gap-11">
               <IconButton className="!p-0 customMd:!hidden" onClick={() => setShowMobileMenu(true)}>
                  <MenuOutlinedIcon />
               </IconButton>
               <div className="flex items-center gap-2 customMd:gap-3">
                  <div className="w-[40px] shrink-0 customMd:h-16 customMd:w-[73px]">
                     <Image src={fakeLogo} alt="logo" className="h-full w-full" />
                  </div>
                  <div className="space-y-0.5">
                     <p className="text-sm font-bold customMd:text-xl">{t('yalfan')}</p>
                     <p className="text-[8px] text-[#58595B] customMd:text-xs">{t('online shop for bags')}</p>
                  </div>
               </div>

               <form onSubmit={handleSubmit(formSubmit)} className="hidden customMd:block">
                  <FormControl variant="outlined">
                     <TextField
                        placeholder={t('search')}
                        className="customLg:w-[300px]"
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
            </div>

            <div className="hidden items-stretch gap-1 customMd:flex lg:gap-3">
               <div
                  className={`flex items-center transition-all duration-100 ${
                     showLanguageSelector ? 'visible opacity-100' : 'invisible -translate-x-3 opacity-0'
                  }`}
               >
                  <Button
                     className={`!min-w-0 !px-2 !py-1 ${language === 'ar' ? '!text-[#B1302E]' : ''}`}
                     color="textColor"
                     onClick={() => changeLanguage('ar')}
                  >
                     AR
                  </Button>
                  <div className="mx-1 h-8 w-[1px] bg-[#E4EAF0]" />
                  <Button
                     className={`!min-w-0 !px-2 !py-1 ${language === 'en' ? '!text-[#B1302E]' : ''}`}
                     color="textColor"
                     onClick={() => changeLanguage('en')}
                  >
                     EN
                  </Button>
                  <div className="mx-1 h-8 w-[1px] bg-[#E4EAF0]" />
                  <Button
                     className={`!min-w-0 !px-2 !py-1 ${language === 'fa' ? '!text-[#B1302E]' : ''}`}
                     color="textColor"
                     onClick={() => changeLanguage('fa')}
                  >
                     FA
                  </Button>
               </div>
               <Fab
                  sx={{
                     width: '60px',
                     height: '60px',
                     borderRadius: '10px',
                     color: '#626E94',
                     fontSize: '16px',
                     border: '1px solid #E4EAF0',
                  }}
                  color="white"
                  onClick={() => setShowLanguageSelector(prev => !prev)}
                  ref={languageRef}
               >
                  {language}
               </Fab>

               <Link href="/">
                  <Fab
                     sx={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '10px',
                        color: '#626E94',
                        border: '1px solid #E4EAF0',
                     }}
                     color="white"
                  >
                     <ShoppingBasketOutlinedIcon />
                  </Fab>
               </Link>

               <Link href="/">
                  <Button
                     variant="contained"
                     color="customPink"
                     className="!h-full !rounded-10 !text-white"
                     size="large"
                  >
                     {t('signup')}
                  </Button>
               </Link>
            </div>

            <div className="flex items-center customMd:hidden">
               <Button
                  endIcon={<LanguageOutlinedIcon />}
                  size="small"
                  onClick={() => setShowLanguageDropDown(true)}
                  color="textColor"
                  className="!uppercase"
                  ref={languageDropDownRef}
               >
                  {language}
               </Button>

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
                                    className={`${language === 'fa' ? '!text-[#B1302E]' : ''}`}
                                    color="textColor"
                                    onClick={() => changeLanguage('fa')}
                                 >
                                    FA
                                 </Button>
                                 <Button
                                    className={`${language === 'en' ? '!text-[#B1302E]' : ''}`}
                                    color="textColor"
                                    onClick={() => changeLanguage('en')}
                                 >
                                    EN
                                 </Button>
                                 <Button
                                    className={`${language === 'ar' ? '!text-[#B1302E]' : ''}`}
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

               <div className="me-2 h-10 w-[1px] bg-[#E4EAF0]" />
               <Fab
                  sx={{
                     width: '38px',
                     height: '38px',
                     borderRadius: '8px',
                     color: '#D14F4D',
                  }}
                  color="customPinkLow"
               >
                  <ShoppingBasketOutlinedIcon />
               </Fab>
            </div>
         </div>

         <div className="hidden items-center justify-between py-3 customMd:flex">
            <div className="flex items-center gap-1 customLg:gap-6">
               <Button
                  size="small"
                  color="textColor"
                  startIcon={<Image src={categoriesIcon} alt="categories" />}
                  endIcon={<KeyboardArrowDownIcon />}
               >
                  {t('categories')}
               </Button>
               <Link href="/">
                  <Button size="small" color="textColor" startIcon={<WhatshotIcon />}>
                     {t('top sellers')}
                  </Button>
               </Link>
               <Link href="/">
                  <Button size="small" color="textColor" startIcon={<FiberNewIcon />}>
                     {t('newest')}
                  </Button>
               </Link>
               <Link href="/">
                  <Button size="small" color="textColor" startIcon={<Image src={discountIcon} alt="discount" />}>
                     {t('discounts and offers')}
                  </Button>
               </Link>
            </div>

            <div className="flex items-center gap-4 text-xs text-textColor customLg:gap-6">
               <Link href="/" className="hidden lg:block">
                  {t('any question')}
               </Link>
               <Link href="/">{t('about us')}</Link>
               <Link href="/">{t('contact us')}</Link>
               <a href="tel:02152687469" className="flex items-center gap-1">
                  <p>021-52687469</p>
                  <Image src={callIcon} alt="phone number" />
               </a>
            </div>
         </div>
         <MobileMenu open={showMobileMenu} onClose={() => setShowMobileMenu(false)} locale={router.locale} />
      </header>
   );
}

export default Header;
