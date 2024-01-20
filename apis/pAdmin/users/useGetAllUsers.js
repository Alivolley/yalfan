import useSWR from 'swr';
import axiosInstance from '@/configs/axiosInstance';

const useGetAllUsers = () => useSWR('accounts/users/', url => axiosInstance(url).then(res => res.data));

export default useGetAllUsers;
