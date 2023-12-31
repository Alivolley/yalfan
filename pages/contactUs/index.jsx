import { useTranslations } from 'next-intl';
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useForm } from 'react-hook-form';
import Image from 'next/image';

// MUI
import { Button, Grid, TextField } from '@mui/material';

// Icons
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import SettingsCellOutlinedIcon from '@mui/icons-material/SettingsCellOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';

// Assets
import contactUsPic from '@/assets/images/contactUs-vector.png';
import ContactUsStyle from './contactUs.style';

function ContactUs() {
   const t = useTranslations('contactUs');

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      defaultValues: {
         firstName: '',
         familyName: '',
         phoneNumber: '',
         email: '',
         message: '',
      },
      mode: 'onSubmit',
   });

   const formSubmit = data => {
      console.log(data);
   };

   return (
      <ContactUsStyle className="bg-[#fcf7f7] px-8 py-[60px] customMd:px-16">
         <Grid container columnSpacing={4}>
            <Grid item xs={12} md={5} lg={3.5}>
               <div className="rounded-2xl bg-white p-5">
                  <div className="w-full rounded-2xl bg-[#fcf7f7] px-2 pb-2 pt-12">
                     <Image src={contactUsPic} alt="contact us" className="h-full w-full" />
                  </div>
                  <p className="mt-14 text-base font-bold customMd:text-xl">
                     {t('We are waiting for your warm voice')}
                  </p>
                  <p className="mt-2 text-xs text-textColor customMd:text-sm">
                     {t('You can contact us through the following ways')}
                  </p>

                  <div className="mt-10 space-y-5">
                     <a href="tel:02152687469" className="flex items-center gap-4">
                        <p>
                           <PhoneOutlinedIcon color="customPinkHigh" fontSize="small" />
                        </p>
                        <div className="space-y-2">
                           <p>{t('Phone number')}</p>
                           <p className="text-sm text-textColor">09383935719</p>
                        </div>
                     </a>
                     <div className="flex items-center gap-4">
                        <p>
                           <FmdGoodOutlinedIcon color="customPinkHigh" fontSize="small" />
                        </p>
                        <div className="space-y-2">
                           <p>{t('Address')}</p>
                           <address className="text-sm text-textColor">{t('address')}</address>
                        </div>
                     </div>

                     <div className="flex items-center gap-4">
                        <p>
                           <SettingsCellOutlinedIcon color="customPinkHigh" fontSize="small" />
                        </p>
                        <div className="space-y-2">
                           <p>{t('Social medias')}</p>
                           <div className="flex items-center gap-5 text-textColor">
                              <a href="/">
                                 <TelegramIcon fontSize="small" />
                              </a>

                              <a href="/">
                                 <WhatsAppIcon fontSize="small" />
                              </a>

                              <a href="/">
                                 <InstagramIcon fontSize="small" />
                              </a>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </Grid>
            <Grid item xs={12} md={7} lg={8.5}>
               <div className="mt-10 rounded-2xl bg-white px-5 py-10 customMd:mt-0 customMd:px-10">
                  <p className="flex items-center gap-2 text-sm font-bold customMd:text-lg">
                     <MailOutlineIcon color="customPinkHigh" /> {t('Send message to yalfan team')}
                  </p>
                  <p className="mt-4 text-xs text-textColor customMd:text-sm">
                     {t('Send us the text of your message')}
                  </p>
                  <form className="mt-10 space-y-6" onSubmit={handleSubmit(formSubmit)}>
                     <div className="flex flex-col justify-between gap-8 customMd:flex-row customMd:items-start">
                        <div className="flex-1 space-y-3">
                           <p className="text-sm font-bold text-[#713802]">{t('Name')}</p>
                           <TextField
                              placeholder={t('Enter your name')}
                              color="textColor"
                              fullWidth
                              {...register('firstName', {
                                 required: {
                                    value: true,
                                    message: t('This filed is required'),
                                 },
                              })}
                              error={!!errors?.firstName}
                              helperText={errors?.firstName?.message}
                           />
                        </div>
                        <div className="flex-1 space-y-3">
                           <p className="text-sm font-bold text-[#713802]">{t('Family name')}</p>
                           <TextField
                              placeholder={t('Enter your family name')}
                              color="textColor"
                              fullWidth
                              {...register('familyName', {
                                 required: {
                                    value: true,
                                    message: t('This filed is required'),
                                 },
                              })}
                              error={!!errors?.familyName}
                              helperText={errors?.familyName?.message}
                           />
                        </div>
                     </div>
                     <div className="flex flex-col justify-between gap-8 customMd:flex-row customMd:items-start">
                        <div className="flex-1 space-y-3" id="inputNumber">
                           <p className="text-sm font-bold text-[#713802]">{t('Phone number')}</p>
                           <TextField
                              placeholder={t('Enter your phone number')}
                              color="textColor"
                              fullWidth
                              type="number"
                              {...register('phoneNumber', {
                                 required: {
                                    value: true,
                                    message: t('This filed is required'),
                                 },
                              })}
                              error={!!errors?.phoneNumber}
                              helperText={errors?.phoneNumber?.message}
                           />
                        </div>
                        <div className="flex-1 space-y-3">
                           <p className="text-sm font-bold text-[#713802]">{t('Email')}</p>
                           <TextField
                              placeholder={t('Enter your email')}
                              color="textColor"
                              fullWidth
                              {...register('email', {
                                 pattern: {
                                    value: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/,
                                    message: t('Please enter a valid email'),
                                 },
                              })}
                              error={!!errors?.email}
                              helperText={errors?.email?.message}
                           />
                        </div>
                     </div>
                     <div className="flex-1 space-y-3">
                        <p className="text-sm font-bold text-[#713802]">{t('Text')}</p>
                        <TextField
                           color="textColor"
                           placeholder={t('Enter your text')}
                           multiline
                           fullWidth
                           minRows={6}
                           {...register('message', {
                              required: {
                                 value: true,
                                 message: t('This filed is required'),
                              },
                           })}
                           error={!!errors?.message}
                           helperText={errors?.message?.message}
                        />
                     </div>

                     <Button
                        variant="contained"
                        fullWidth
                        type="submit"
                        size="large"
                        color="customPink2"
                        className="!mt-14 !text-customPinkHigh"
                        startIcon={<ForwardToInboxIcon />}
                     >
                        {t('Send message')}
                     </Button>
                  </form>
               </div>
            </Grid>
         </Grid>
      </ContactUsStyle>
   );
}

export default ContactUs;

export async function getStaticProps(context) {
   return {
      props: {
         messages: (await import(`../../messages/${context.locale}.json`)).default,
      },
   };
}
