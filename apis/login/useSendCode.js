import useSWRMutation from 'swr/mutation';
import Cookies from 'js-cookie';

// Redux
import { useDispatch } from 'react-redux';
import { changeToLoginTrue } from '@/store/reducers/loginStatusReducer';

import axiosInstance from '@/configs/axiosInstance';

const useSendCode = () => {
   const dispatch = useDispatch();

   return useSWRMutation('accounts/login/', (url, data) =>
      axiosInstance.post(url, data.arg).then(res => {
         if (!res.data?.is_admin) {
            Cookies.set('yalfan_accessToken', res?.data?.access, { expires: 7 });
            Cookies.set('yalfan_refreshToken', res?.data?.refresh, { expires: 7 });
            Cookies.set('yalfan_isLogin', true, { expires: 7 });
            dispatch(changeToLoginTrue());
         }
         return res.data;
      })
   );
};

export default useSendCode;
