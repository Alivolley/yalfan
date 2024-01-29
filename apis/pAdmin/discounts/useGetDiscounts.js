import useSWR from 'swr';
import axiosInstance from '@/configs/axiosInstance';

const useGetDiscounts = () =>
   useSWR('store/discount-code/list_create/', url => axiosInstance(url).then(res => res.data));

export default useGetDiscounts;
