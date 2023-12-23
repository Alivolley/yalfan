import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

// MUI
import { Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { MuiOtpInput } from 'mui-one-time-password-input';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';

// Icons
import CachedIcon from '@mui/icons-material/Cached';
import BorderColorIcon from '@mui/icons-material/BorderColor';

// Assets
import LoginStyle from './login.style';
import fakeLogo from '@/assets/images/fake-logo.png';

// Components
import CountdownLogin from '@/components/templates/countdown-Login/countdown-Login';

function Login() {
   const [loginStep, setLoginStep] = useState(1);
   const [phoneNumber, setPhoneNumber] = useState('');
   const [codeValue, setCodeValue] = useState('');
   const [disableResend, setDisableResend] = useState(true);

   const t = useTranslations('login');

   const sendPhoneNumber = () => {
      if (phoneNumber) {
         setLoginStep(2);
         console.log(phoneNumber);
      }
   };

   const sendCode = () => {
      console.log(codeValue);
   };

   return (
      <LoginStyle className="fixed inset-0 px-5 py-12 customMd:p-16">
         <div className="h-full max-w-[486px] rounded-2xl bg-white p-7 2xl:max-w-[550px]" id="container">
            <Link href="/" className="flex w-fit items-center gap-2 customMd:gap-3">
               <div className="w-[73px] shrink-0 customMd:h-16">
                  <Image src={fakeLogo} alt="logo" className="h-full w-full" />
               </div>
               <div className="space-y-0.5">
                  <p className="text-xl font-bold">{t('yalfan')}</p>
                  <p className="text-xs text-[#58595B]">{t('online shop for bags')}</p>
               </div>
            </Link>
            {loginStep === 1 ? (
               <>
                  <div className="mt-10">
                     <p className="text-xl font-bold customMd:text-2xl">{t('signup')}</p>
                     <p className="mt-5 text-sm text-textColor customMd:text-base">
                        {t('To login yalfan enter your number first')}
                     </p>
                  </div>

                  <div dir="ltr" className="mt-14">
                     <PhoneInput
                        country="ir"
                        inputClass="!w-full"
                        specialLabel=""
                        value={phoneNumber}
                        onChange={e => setPhoneNumber(e)}
                        onKeyDown={e => {
                           if (e.key === 'Enter') {
                              if (phoneNumber) {
                                 sendPhoneNumber();
                              }
                           }
                        }}
                     />
                  </div>
               </>
            ) : (
               <>
                  <div className="mt-10">
                     <p className="text-xl font-bold customMd:text-2xl">{t('Login with one time password')}</p>
                     <p className="mb-2 mt-5 text-sm text-textColor customMd:text-base">
                        {t('Please enter the verification code sent to')} {phoneNumber} {t('number')}
                     </p>
                     <Button
                        startIcon={<BorderColorIcon className="!text-sm" />}
                        size="small"
                        onClick={() => {
                           setCodeValue('');
                           setLoginStep(1);
                        }}
                     >
                        {t('Edit phone number')}
                     </Button>
                  </div>
                  <div className="mt-12">
                     <MuiOtpInput
                        value={codeValue}
                        onChange={e => setCodeValue(e)}
                        length={6}
                        dir="ltr"
                        TextFieldsProps={{
                           type: 'number',
                        }}
                        sx={{
                           input: {
                              MozAppearance: 'textfield',
                              appearance: 'textfield',
                              '&::-webkit-inner-spin-button': {
                                 WebkitAppearance: 'none',
                                 appearance: 'none',
                              },
                           },
                        }}
                     />

                     <CountdownLogin initialCount={130} onComplete={() => setDisableResend(false)} />
                  </div>
               </>
            )}

            <div className="space-y-4 self-end">
               {loginStep === 2 && (
                  <LoadingButton
                     fullWidth
                     className="!rounded-10 !py-3.5"
                     variant="outlined"
                     size="large"
                     color="customPink"
                     type="submit"
                     endIcon={<CachedIcon />}
                     disabled={disableResend}
                  >
                     {t('Resend the code')}
                  </LoadingButton>
               )}

               <LoadingButton
                  fullWidth
                  className="!rounded-10 !py-3.5 !text-white"
                  variant="contained"
                  size="large"
                  color="customPink"
                  onClick={loginStep === 1 ? sendPhoneNumber : sendCode}
               >
                  {t('Proceed')}
               </LoadingButton>
            </div>
         </div>
      </LoginStyle>
   );
}

export default Login;

export async function getStaticProps(context) {
   return {
      props: {
         messages: (await import(`../../messages/${context.locale}.json`)).default,
      },
   };
}
