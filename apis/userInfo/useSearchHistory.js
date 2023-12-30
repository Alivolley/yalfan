import useSWR from 'swr';
import axiosInstance from '@/configs/axiosInstance';

const useSearchHistory = () => useSWR('restaurant/history/', url => axiosInstance(url).then(res => res.data));

export default useSearchHistory;
