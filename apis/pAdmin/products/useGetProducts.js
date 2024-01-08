import useSWR from 'swr';
import axiosInstance from '@/configs/axiosInstance';

const useGetProducts = (pageStatus, countValue) =>
   useSWR(`store/products/list_create/?page=${pageStatus}&page_size=${countValue}`, url =>
      axiosInstance(url).then(res => res.data)
   );

export default useGetProducts;
