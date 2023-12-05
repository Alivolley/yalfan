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
      <header className="px-8 customMd:px-16">
         <div className="mt-11 flex items-center justify-between border-b border-solid border-borderColor pb-6">
            <div className="flex items-center gap-11">
               <div className="flex items-center gap-3">
                  <Image src={fakeLogo} alt="logo" />
                  <div className="space-y-0.5">
                     <p className="text-xl font-bold">{t('yalfan')}</p>
                     <p className="text-xs text-[#58595B]">{t('online shop for bags')}</p>
                  </div>
               </div>

               <form onSubmit={handleSubmit(formSubmit)}>
                  <FormControl variant="outlined">
                     <TextField
                        placeholder={t('search')}
                        className="w-[300px]"
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

            <div className="flex items-stretch gap-3">
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
         </div>

         <div className="flex items-center justify-between py-5">
            <div className="flex items-center gap-6">
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

            <div className="flex items-center gap-6 text-xs text-textColor">
               <Link href="/">{t('any question')}</Link>
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
