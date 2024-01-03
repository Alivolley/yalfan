import useSWR from 'swr';
import axiosInstance from '@/configs/axiosInstance';

const useGetCards = filter =>
   useSWR(`store/cart/list/?status=${filter}`, url => axiosInstance(url).then(res => res.data));

export default useGetCards;
