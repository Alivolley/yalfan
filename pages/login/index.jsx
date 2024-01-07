import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

// MUI
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { MuiOtpInput } from 'mui-one-time-password-input';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';

// Icons
import CachedIcon from '@mui/icons-material/Cached';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// Assets
import LoginStyle from './login.style';
import fakeLogo from '@/assets/images/fake-logo.png';

// Components
import CountdownLogin from '@/components/templates/countdown-Login/countdown-Login';

// Apis
import useVerificationCode from '@/apis/login/useVerificationCode';
import useSendCode from '@/apis/login/useSendCode';
import useSendPassword from '@/apis/login/useSendPassword';

function Login() {
   const [loginStep, setLoginStep] = useState(1);
   const [phoneNumber, setPhoneNumber] = useState('');
   const [codeValue, setCodeValue] = useState('');
   const [passwordValue, setPasswordValue] = useState('');
   const [disableResend, setDisableResend] = useState(true);
   const [showPassword, setShowPassword] = useState(false);
   const router = useRouter();

   const { trigger: verificationCodeTrigger, isMutating: verificationCodeIsMutating } = useVerificationCode();
   const { trigger: sendCodeTrigger, isMutating: sendCodeIsMutating } = useSendCode();
   const { trigger: sendPasswordTrigger, isMutating: sendPasswordIsMutating } = useSendPassword();

   const t = useTranslations('login');

   const sendPhoneNumber = () => {
      if (phoneNumber) {
         verificationCodeTrigger(
            { phone_number: phoneNumber },
            {
               onSuccess: () => {
                  setLoginStep(2);
               },
            }
         );
      }
   };

   const sendCode = () => {
      const newData = {
         phone_number: phoneNumber,
         code: codeValue,
      };

      sendCodeTrigger(newData, {
         onSuccess: res => {
            console.log(res);
            if (!res.is_admin) {
               router.back();
            } else {
               setLoginStep(3);
            }
         },
      });
   };

   const sendPassword = () => {
      const newData = {
         phone_number: phoneNumber,
         code: codeValue,
         password: passwordValue,
      };

      sendPasswordTrigger(newData, {
         onSuccess: () => {
            router.back();
         },
      });
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
            ) : loginStep === 2 ? (
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
                           setLoginStep(1);
                           setCodeValue('');
                        }}
                     >
                        {t('Edit phone number')}
                     </Button>
                  </div>
                  <div className="mt-12">
                     <MuiOtpInput
                        value={codeValue}
                        onChange={e => setCodeValue(e)}
                        length={4}
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
            ) : loginStep === 3 ? (
               <>
                  <div className="mt-10">
                     <p className="text-xl font-bold customMd:text-2xl">{t('Your number is an admin number')}</p>
                     <p className="mb-3 mt-5 text-sm text-textColor customMd:text-base">
                        {t('Please enter your password')}
                     </p>
                     <Button
                        startIcon={<BorderColorIcon className="!text-sm" />}
                        size="small"
                        onClick={() => {
                           setLoginStep(1);
                           setCodeValue('');
                           setPasswordValue('');
                        }}
                     >
                        {t('Edit phone number')}
                     </Button>
                  </div>

                  <div className="mt-10">
                     <FormControl variant="outlined" fullWidth>
                        <InputLabel color="customPink">{t('Password')}</InputLabel>
                        <OutlinedInput
                           type={showPassword ? 'text' : 'password'}
                           color="customPink"
                           autoComplete="off"
                           value={passwordValue}
                           onChange={e => setPasswordValue(e.target.value)}
                           onKeyDown={e => {
                              if (e.key === 'Enter') {
                                 if (passwordValue) {
                                    sendPassword();
                                 }
                              }
                           }}
                           endAdornment={
                              <InputAdornment position="end">
                                 <IconButton onClick={() => setShowPassword(prev => !prev)} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                 </IconButton>
                              </InputAdornment>
                           }
                           label={t('Password')}
                        />
                     </FormControl>
                  </div>
               </>
            ) : null}

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
                     onClick={sendPhoneNumber}
                     loading={verificationCodeIsMutating}
                  >
                     {t('Resend the code')}
                  </LoadingButton>
               )}

               <LoadingButton
                  fullWidth
                  className={`!rounded-10 !py-3.5 ${verificationCodeIsMutating ? '' : '!text-white'}`}
                  variant="contained"
                  size="large"
                  color="customPink"
                  onClick={
                     loginStep === 1
                        ? sendPhoneNumber
                        : loginStep === 2
                          ? sendCode
                          : loginStep === 3
                            ? sendPassword
                            : null
                  }
                  loading={verificationCodeIsMutating || sendCodeIsMutating || sendPasswordIsMutating}
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
