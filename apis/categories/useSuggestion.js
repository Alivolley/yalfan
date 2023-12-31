import useSWR from 'swr';
import axiosInstance from '@/configs/axiosInstance';

const useSuggestion = () =>
   useSWR(
      'store/products/list_create/',
      url =>
         axiosInstance(url, {
            params: {
               suggest: true,
            },
         }).then(res => res.data),
      {
         revalidateIfStale: false,
         revalidateOnFocus: false,
         revalidateOnReconnect: false,
      }
   );

export default useSuggestion;
