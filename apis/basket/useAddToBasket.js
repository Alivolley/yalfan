import useSWRMutation from 'swr/mutation';
import { useSWRConfig } from 'swr';
import { toast } from 'react-toastify';
import axiosInstance from '@/configs/axiosInstance';

const useAddToBasket = () => {
   const { mutate } = useSWRConfig();
   return useSWRMutation('store/cart/get_update/', (url, data) =>
      axiosInstance.patch(url, data.arg).then(res => {
         if (data?.arg?.food_count === 1) {
            toast.success('محصول به سبد خرید اضافه شد', {
               style: {
                  direction: 'rtl',
                  fontFamily: 'rokhRegular',
                  lineHeight: '25px',
               },
               theme: 'colored',
               autoClose: 5000,
            });
         }
         mutate('store/cart/get_update/', res.data);
         return res.data;
      })
   );
};

export default useAddToBasket;
