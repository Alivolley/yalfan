import useSWRMutation from 'swr/mutation';
import { useSWRConfig } from 'swr';
import axiosInstance from '@/configs/axiosInstance';

const useDeleteProduct = (pageStatus, countValue) => {
   const { mutate } = useSWRConfig();

   return useSWRMutation('store/products/get_update_destroy/', (url, data) =>
      axiosInstance
         .delete(url, {
            params: {
               title: data.arg,
            },
         })
         .then(res => {
            mutate(`store/products/list_create/?page=${pageStatus}&page_size=${countValue}`);
            return res.data;
         })
   );
};

export default useDeleteProduct;
