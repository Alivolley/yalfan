import { useState } from 'react';

// MUI
import { Button, CircularProgress } from '@mui/material';

// Icons
import AddIcon from '@mui/icons-material/Add';
import MyLocationIcon from '@mui/icons-material/MyLocation';

// Components
import ProfileLayout from '@/components/layout/profile-layout/profile-layout';
import BasketAddressCard from '@/components/pages/basket/basket-address-card/basket-address-card';
import BasketAddressModal from '@/components/pages/basket/basket-address-modal/basket-address-modal';

// Apis
import useGetAddress from '@/apis/profile/useGetAddress';

function Address() {
   const [showBasketAddressModal, setShowBasketAddressModal] = useState(false);
   const { data: addressData, isLoading: addressIsLoading } = useGetAddress();

   return (
      <ProfileLayout>
         <div>
            {addressIsLoading ? (
               <div className="flex items-center justify-center">
                  <CircularProgress color="customPink" />
               </div>
            ) : (
               <>
                  <div className="flex items-center justify-between rounded-2xl bg-[#F5F8FC] px-3 py-2">
                     <div className="flex items-center gap-2 font-bold">
                        <MyLocationIcon fontSize="small" />
                        <p>لیست آدرس های شما</p>
                     </div>
                     <div className="hidden customMd:block">
                        <Button
                           className="!text-customPink"
                           startIcon={<AddIcon />}
                           onClick={() => setShowBasketAddressModal(true)}
                        >
                           افزودن آدرس جدید
                        </Button>
                     </div>
                  </div>

                  <div className="flex flex-col gap-2">
                     {addressData?.length ? (
                        addressData?.map(item => <BasketAddressCard key={item?.id} detail={item} />)
                     ) : (
                        <div className="my-10 space-y-3 text-center">
                           <p className="text-xl font-bold">شما در حال حاضر آدرسی ثبت نکرده اید </p>
                           <p className="text-sm">
                              آدرس خود را به لیست آدرس ها اضافه کنید تا در زمان سفارش به راحتی، همیشه از آن استفاده کنید
                           </p>
                        </div>
                     )}

                     <div className="mt-4 customMd:hidden">
                        <Button
                           variant="contained"
                           type="submit"
                           size="large"
                           color="customPink"
                           fullWidth
                           className="!rounded-10 !p-2"
                           onClick={() => setShowBasketAddressModal(true)}
                        >
                           <div className="flex w-full items-center justify-between text-[#626E94]">
                              <p>افزودن آدرس جدید</p>

                              <AddIcon className="rounded-xl bg-[#BDCEDE] p-2 text-[#626E94]" />
                           </div>
                        </Button>
                     </div>
                  </div>
               </>
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
