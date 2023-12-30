import Cookies from 'js-cookie';
import axiosInstance from '@/configs/axiosInstance';

const logoutHandler = () => {
   axiosInstance
      .post('accounts/logout/', {
         refresh: Cookies.get('yalfan_refreshToken'),
      })
      .then(() => {
         Cookies.remove('yalfan_accessToken');
         Cookies.remove('yalfan_refreshToken');
         Cookies.remove('yalfan_isLogin');
         window.location.reload();
      });
};

export default logoutHandler;
