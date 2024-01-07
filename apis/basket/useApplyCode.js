import { toast } from 'react-toastify';
import useSWRMutation from 'swr/mutation';
import { useSWRConfig } from 'swr';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import axiosInstance from '@/configs/axiosInstance';

const useApplyCode = closeDiscountModalHandler => {
   const { mutate } = useSWRConfig();
   const t = useTranslations('basket');
   const { locale } = useRouter();

   return useSWRMutation('store/cart/get_update/', (url, data) =>
      axiosInstance
         .patch(
            url,
            {},
            {
               params: {
                  discount_code: data.arg,
               },
            }
         )
         .then(res => {
            mutate('store/cart/get_update/', res.data);
            console.log('res', res);
            if (res.status === 200) {
               closeDiscountModalHandler();
               toast.success(t('Code registered successfully'), {
                  style: {
                     direction: locale === 'en' ? 'ltr' : 'rtl',
                     fontFamily:
                        locale === 'en' ? 'poppins' : locale === 'fa' ? 'dana' : locale === 'ar' ? 'rubik' : 'poppins',
                     lineHeight: '25px',
                  },
                  theme: 'colored',
                  autoClose: 5000,
               });
            }
            return res.data;
         })
         .catch(err => {
            console.log('err', err);
            if (err?.response?.status === 400) {
               toast.error(t('Code is not valid'), {
                  style: {
                     direction: locale === 'en' ? 'ltr' : 'rtl',
                     fontFamily:
                        locale === 'en' ? 'poppins' : locale === 'fa' ? 'dana' : locale === 'ar' ? 'rubik' : 'poppins',
                     lineHeight: '25px',
                  },
                  theme: 'colored',
                  autoClose: 5000,
               });
            }
         })
   );
};

export default useApplyCode;
