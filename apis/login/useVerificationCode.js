import useSWRMutation from 'swr/mutation';
import Cookies from 'js-cookie';

// Redux
import { useDispatch } from 'react-redux';
import { changeToLoginTrue } from '@/store/reducers/loginStatusReducer';

import axiosInstance from '@/configs/axiosInstance';

const useVerificationCode = () => {
   const dispatch = useDispatch();

   return useSWRMutation('accounts/send-verification-code/', (url, data) =>
      axiosInstance.post(url, data.arg).then(res => {
         axiosInstance
            .post('accounts/login/', {
               phone_number: data?.arg?.phone_number,
               code: res?.data?.code,
            })
            .then(innerRes => {
               Cookies.set('yalfan_accessToken', innerRes?.data?.access, { expires: 7 });
               Cookies.set('yalfan_refreshToken', innerRes?.data?.refresh, { expires: 7 });
               Cookies.set('yalfan_isLogin', true, { expires: 7 });
               dispatch(changeToLoginTrue());
            });
      })
   );
};

export default useVerificationCode;
