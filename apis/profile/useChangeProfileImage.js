import useSWRMutation from 'swr/mutation';
import { useSWRConfig } from 'swr';
import axiosInstance from '@/configs/axiosInstance';

const useChangeProfileImage = () => {
   const { mutate } = useSWRConfig();
   return useSWRMutation('accounts/panel/', (url, data) =>
      axiosInstance
         .patch(url, data.arg, {
            headers: {
               'Content-Type': 'multipart/form-data',
            },
         })
         .then(res => {
            mutate('accounts/panel/', res.data);
            return res.data;
         })
   );
};

export default useChangeProfileImage;
