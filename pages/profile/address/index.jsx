import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

// MUI
import { Button, CircularProgress } from '@mui/material';

// Icons
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';

// Assets
import noAddressPic from '@/assets/images/no-address.png';

// Components
import ProfileLayout from '@/components/layout/profile-layout/profile-layout';
import BasketAddressCard from '@/components/pages/basket/basket-address-card/basket-address-card';
import BasketAddressModal from '@/components/pages/basket/basket-address-modal/basket-address-modal';

// Apis
import useGetAddress from '@/apis/profile/useGetAddress';

function Address() {
   const [showBasketAddressModal, setShowBasketAddressModal] = useState(false);
   const { data: addressData, isLoading: addressIsLoading } = useGetAddress();
   const t = useTranslations('addresses');

   return (
      <ProfileLayout>
         <div>
            <div className="flex items-center gap-2 rounded-2xl bg-white p-7">
               <p className="text-lg font-bold text-[#050F2C]">{t('List of your addresses')}</p>
               {!addressIsLoading && addressData?.length ? (
                  <p className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D14F4D] text-white">
                     {addressData?.length}
                  </p>
               ) : null}
            </div>

            {addressIsLoading ? (
               <div className="mt-6 flex items-center justify-center">
                  <CircularProgress color="customPink" />
               </div>
            ) : (
               <div className="mt-6">
                  {addressData?.length ? (
                     <div className="flex flex-col gap-3">
                        {addressData?.map(item => (
                           <BasketAddressCard key={item?.id} detail={item} />
                        ))}
                        <Button
                           variant="contained"
                           type="submit"
                           size="large"
                           color="customPink2"
                           className="!mt-3 !rounded-10 !py-3 !text-[#B1302E]"
                           onClick={() => setShowBasketAddressModal(true)}
                           startIcon={<AddLocationAltOutlinedIcon />}
                        >
                           {t('Add new address')}
                        </Button>
                     </div>
                  ) : (
                     <div className="mx-auto my-10 flex max-w-[370px] flex-col gap-4 text-center">
                        <p className="text-xl font-bold">{t('You have not registered an address yet')}</p>
                        <p className="text-sm text-textColor">
                           {t(
                              'Add your address to the list of addresses so that you can always use it easily when ordering'
                           )}
                        </p>
                        <div>
                           <Image src={noAddressPic} alt="no address" className="h-full w-full object-cover" />
                        </div>
                        <Button
                           variant="contained"
                           type="submit"
                           size="large"
                           color="customPink2"
                           className="!rounded-10 !py-3 !text-[#B1302E]"
                           onClick={() => setShowBasketAddressModal(true)}
                           startIcon={<AddLocationAltOutlinedIcon />}
                           fullWidth
                        >
                           {t('Add new address')}
                        </Button>
                     </div>
                  )}
               </div>
            )}
         </div>

         <BasketAddressModal show={showBasketAddressModal} onClose={() => setShowBasketAddressModal(false)} />
      </ProfileLayout>
   );
}

export default Address;

export async function getStaticProps(context) {
   return {
      props: {
         messages: (await import(`../../../messages/${context.locale}.json`)).default,
      },
   };
}
