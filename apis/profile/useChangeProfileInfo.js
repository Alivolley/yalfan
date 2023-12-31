import useSWRMutation from 'swr/mutation';
import { useSWRConfig } from 'swr';
import axiosInstance from '@/configs/axiosInstance';

const useChangeProfileInfo = () => {
   const { mutate } = useSWRConfig();
   return useSWRMutation('accounts/panel/', (url, data) =>
      axiosInstance.patch(url, data.arg).then(res => {
         mutate('accounts/panel/', res.data);
         mutate('accounts/user-information/');
         return res.data;
      })
   );
};

export default useChangeProfileInfo;
