import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useForm } from 'react-hook-form';

// MUI
import { Button, Fab, FormControl, IconButton, InputAdornment, TextField } from '@mui/material';

// Icons
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

// Assets
import Link from 'next/link';
import fakeLogo from '@/assets/images/fake-logo.png';
import searchIcon from '@/assets/icons/search-icon.svg';
import categoriesIcon from '@/assets/icons/menu-categories-icon.svg';
import discountIcon from '@/assets/icons/discount-icon.svg';
import callIcon from '@/assets/icons/call-icon.svg';

function Header({ language }) {
   const t = useTranslations('header');
   const router = useRouter();
   const { pathname, asPath, query } = router;

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

   const changeDirection = () => {
      if (language === 'en') {
         router.push({ pathname, query }, asPath, { locale: 'fa' });
      } else if (language === 'fa') {
         router.push({ pathname, query }, asPath, { locale: 'en' });
      }
   };

   return (
      <header className="sticky top-0 z-10 bg-white px-8 pt-5 customMd:px-16 customMd:pt-10">
         <div className="flex items-center justify-between border-solid border-borderColor pb-6 customMd:border-b">
            <div className="flex items-center gap-2 customMd:gap-11">
               <IconButton className="!p-0 customMd:!hidden">
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
                  onClick={changeDirection}
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
                     // onClick={() => setShowSearch(true)}
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
                  onClick={changeDirection}
                  color="textColor"
                  className="!uppercase"
               >
                  {language}
               </Button>

               <div className="me-3 h-10 w-[1px] bg-[#E4EAF0]" />
               <Fab
                  sx={{
                     width: '44px',
                     height: '44px',
                     borderRadius: '8px',
                     color: '#D14F4D',
                  }}
                  color="customPinkLow"
               >
                  <PersonOutlineOutlinedIcon />
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
      </header>
   );
}

export default Header;
