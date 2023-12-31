import useSWRMutation from 'swr/mutation';
import { useSWRConfig } from 'swr';
import axiosInstance from '@/configs/axiosInstance';

const useAddAddress = () => {
   const { mutate } = useSWRConfig();

   return useSWRMutation('accounts/address/list_create/', (url, data) =>
      axiosInstance.post(url, data.arg).then(res => {
         mutate('accounts/address/list_create/', prevData => {
            const newData = [...prevData, res.data];
            return newData;
         });
         return res.data;
      })
   );
};

export default useAddAddress;
