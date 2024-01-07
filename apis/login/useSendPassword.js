import useSWRMutation from 'swr/mutation';
import Cookies from 'js-cookie';

// Redux
import { useDispatch } from 'react-redux';
import { changeToLoginTrue } from '@/store/reducers/loginStatusReducer';

import axiosInstance from '@/configs/axiosInstance';

const useSendPassword = () => {
   const dispatch = useDispatch();

   return useSWRMutation('accounts/login-by-password/', (url, data) =>
      axiosInstance.post(url, data.arg).then(res => {
         Cookies.set('yalfan_accessToken', res?.data?.access, { expires: 7 });
         Cookies.set('yalfan_refreshToken', res?.data?.refresh, { expires: 7 });
         Cookies.set('yalfan_isLogin', true, { expires: 7 });
         dispatch(changeToLoginTrue());
      })
   );
};

export default useSendPassword;
