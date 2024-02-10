/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-globals */
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const axiosInstance = axios.create({
   baseURL: `${baseURL}api/`,
});

axiosInstance.interceptors.request.use(
   config => {
      const accessToken = Cookies.get('yalfan_accessToken');
      const lang = Cookies.get('NEXT_LOCALE');

      if (accessToken) {
         config.headers.Authorization = `Bearer ${accessToken}`;
      }

      if (lang) {
         config.params = { ...config.params, lang };
      }

      return config;
   },
   error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
   res => {
      if (res?.data?.detail) {
         const lang = Cookies.get('NEXT_LOCALE');

         toast.success(res?.data?.detail, {
            style: {
               direction: lang === 'en' ? 'ltr' : 'rtl',
               fontFamily: lang === 'en' ? 'poppins' : lang === 'fa' ? 'dana' : lang === 'ar' ? 'rubik' : 'poppins',
               lineHeight: '25px',
            },
            theme: 'colored',
            autoClose: 5000,
         });
      }

      return res;
   },
   async error => {
      console.log(error);
      const refreshToken = Cookies.get('yalfan_refreshToken');
      const originalReq = error.config;

      if (error?.response?.status === 401) {
         // access expired
         if (refreshToken) {
            const res = await axiosInstance.post('accounts/token/refresh/', {
               refresh: refreshToken,
            });
            Cookies.set('yalfan_accessToken', res.data.access, { expires: 365 });
            originalReq.headers.Authorization = `Bearer ${res.data.access}`;
            return axiosInstance(originalReq);
         }
         Cookies.remove('yalfan_accessToken');
         Cookies.remove('yalfan_refreshToken');
         Cookies.remove('yalfan_isLogin');
         location.href = '/login';
      } else if (error?.response?.status === 410) {
         // refresh expired
         Cookies.remove('yalfan_accessToken');
         Cookies.remove('yalfan_refreshToken');
         Cookies.remove('yalfan_isLogin');
         location.href = '/login';
      } else if (error?.response?.data?.detail) {
         const lang = Cookies.get('NEXT_LOCALE');

         toast.error(error?.response?.data?.detail, {
            style: {
               direction: lang === 'en' ? 'ltr' : 'rtl',
               fontFamily: lang === 'en' ? 'poppins' : lang === 'fa' ? 'dana' : lang === 'ar' ? 'rubik' : 'poppins',
               lineHeight: '25px',
            },
            theme: 'colored',
            autoClose: 5000,
         });
      }

      return Promise.reject(error);
   }
);

export default axiosInstance;
