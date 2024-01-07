import useSWRMutation from 'swr/mutation';
import { useSWRConfig } from 'swr';
import axiosInstance from '@/configs/axiosInstance';

const useApplyCode = () => {
   const { mutate } = useSWRConfig();
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
            return res.data;
         })
   );
};

export default useApplyCode;
