import useSWRMutation from 'swr/mutation';

import axiosInstance from '@/configs/axiosInstance';

const useVerificationCode = () =>
   useSWRMutation('accounts/send-verification-code/', (url, data) =>
      axiosInstance
         .post(url, data.arg)
         .then(res => {
            console.log('====================================================');
            console.log(res?.request?.responseURL);
            console.log('====================================================');
            return res.data;
         })
         .catch(err => {
            console.log('====================================================');
            console.log(err?.request?.responseURL);
            console.log('====================================================');
         })
   );

export default useVerificationCode;
