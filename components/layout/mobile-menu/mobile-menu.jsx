import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import Link from 'next/link';

// Redux
import { useSelector } from 'react-redux';

// MUI
import {
   Accordion,
   AccordionDetails,
   AccordionSummary,
   Button,
   CircularProgress,
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
import IsoIcon from '@mui/icons-material/Iso';

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
import MobileMenuStyle from './mobile-menu.style';

// Apis
import useCategories from '@/apis/categories/useCategories';
import useGetProductsCategory from '@/apis/categories/useGetProductsCategory';

function MobileMenu({ open, onClose, locale, isUserLogin }) {
   const [showLogoutModal, setShowLogoutModal] = useState(false);
   const [expanded, setExpanded] = useState(false);

   const router = useRouter();
   const userInfo = useSelector(state => state?.userInfoReducer);

   const t = useTranslations('header');

   const { data: categoryList } = useCategories();
   const { data: productsCategoryList, isLoading: productsCategoryIsLoading } = useGetProductsCategory(expanded);

   const { register, handleSubmit, setValue } = useForm({
      defaultValues: {
         searchInput: '',
      },
   });

   const formSubmit = data => {
      router.push(`/search?productName=${data.searchInput}&page=1`);
      onClose();
   };

   useEffect(() => {
      if (router.query?.productName) {
         setValue('searchInput', router.query.productName);
      } else {
         setValue('searchInput', '');
      }
   }, [router.query]);

   const handleAccordionChange = panel => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
   };

   return (
      <Drawer anchor="left" open={open} onClose={onClose} dir={locale === 'en' ? 'ltr' : 'rtl'}>
         <MobileMenuStyle className="w-[300px]">
            <div className="flex items-start justify-between">
               <Link href="/" className="flex items-center gap-2 p-5 customMd:gap-3">
                  <div className="w-[40px] shrink-0 customMd:h-16 customMd:w-[73px]">
                     <Image src={fakeLogo} alt="logo" className="size-full" />
                  </div>
                  <div className="space-y-0.5">
                     <p className="text-sm font-bold customMd:text-xl">{t('yalfan')}</p>
                     <p className="text-[8px] text-[#58595B] customMd:text-xs">{t('online shop for bags')}</p>
                  </div>
               </Link>
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
                              {userInfo?.is_admin && (
                                 <Link
                                    href="/adminPanel/products"
                                    className="flex w-full items-center gap-1 border-b border-solid border-[#E4EAF0] p-3 text-sm text-textColor"
                                 >
                                    <IsoIcon fontSize="small" />
                                    {t('Admin panel')}
                                 </Link>
                              )}
                              <Link
                                 href="/profile/information"
                                 className="flex w-full items-center gap-1 border-b border-solid border-[#E4EAF0] p-3 text-sm text-textColor"
                              >
                                 <PersonOutlinedIcon fontSize="small" />
                                 {t('Account information')}
                              </Link>
                              <Link
                                 href="/profile/address"
                                 className="flex w-full items-center gap-1 border-b border-solid border-[#E4EAF0] p-3 text-sm text-textColor"
                              >
                                 <LocationOnOutlinedIcon fontSize="small" />
                                 {t('My address')}
                              </Link>
                              <Link
                                 href="/profile/orders"
                                 className="flex w-full items-center gap-1 border-b border-solid border-[#E4EAF0] p-3 text-sm text-textColor"
                              >
                                 <AccountBalanceWalletOutlinedIcon fontSize="small" />
                                 {t('Track orders')}
                              </Link>
                              <Button
                                 className="!p-3 text-sm"
                                 color="textColor"
                                 startIcon={<LogoutOutlinedIcon fontSize="small" className="rotate-180" />}
                                 onClick={() => setShowLogoutModal(true)}
                              >
                                 {t('Log out')}
                              </Button>
                           </div>
                        </AccordionDetails>
                     </Accordion>
                  )}

                  <div>
                     <Accordion sx={{ boxShadow: 'none' }}>
                        <AccordionSummary
                           expandIcon={<ExpandMoreIcon color="customBlue" />}
                           sx={{ padding: '0 !important' }}
                        >
                           <div className="flex items-center gap-2 text-sm text-customBlue">
                              <Image src={categoriesIcon} alt="categories" />
                              {t('categories')}
                           </div>
                        </AccordionSummary>
                        <AccordionDetails>
                           <div className="ms-[-15px] max-h-[300px] overflow-auto pe-8 ps-3" id="scroll">
                              {categoryList?.map(item => (
                                 <Accordion
                                    key={item.id}
                                    sx={{ boxShadow: 'none' }}
                                    expanded={expanded === item.title}
                                    onChange={handleAccordionChange(item.title)}
                                 >
                                    <AccordionSummary
                                       expandIcon={<ExpandMoreIcon color="customBlue" />}
                                       sx={{ padding: '0 !important' }}
                                    >
                                       <div className="flex items-center gap-2 text-sm text-customBlue">
                                          <div className="size-1 rounded-full bg-customBlue" />
                                          {item?.title}
                                       </div>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                       {productsCategoryIsLoading ? (
                                          <div className="flex w-full items-center justify-center">
                                             <CircularProgress
                                                color="customPink"
                                                sx={{ width: '25px !important', height: '25px !important' }}
                                             />
                                          </div>
                                       ) : (
                                          productsCategoryList?.result?.map(innerItem => (
                                             <Link
                                                href={`/productDetail/${innerItem?.title}`}
                                                className="flex items-center gap-2 py-2 text-sm text-customBlue"
                                                id="arrowIcon"
                                                key={innerItem.id}
                                             >
                                                <div className="size-1 rounded-full bg-customBlue" />
                                                {innerItem?.title}
                                             </Link>
                                          ))
                                       )}
                                    </AccordionDetails>
                                 </Accordion>
                              ))}
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
                        <Link href="/categoryDetail?ordering=sales">
                           <Button size="small" color="customBlue" startIcon={<WhatshotIcon />}>
                              {t('top sellers')}
                           </Button>
                        </Link>
                        <Link href="/categoryDetail?ordering=created">
                           <Button size="small" color="customBlue" startIcon={<FiberNewIcon />}>
                              {t('newest')}
                           </Button>
                        </Link>
                        <Link href="/categoryDetail?has_discount=true">
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
                  <Link href="/aboutUs">{t('about us')}</Link>
                  <Link href="/contactUs">{t('contact us')}</Link>
               </div>
            </div>
         </MobileMenuStyle>
         <LogoutModal show={showLogoutModal} onClose={() => setShowLogoutModal(false)} />
      </Drawer>
   );
}

export default MobileMenu;
