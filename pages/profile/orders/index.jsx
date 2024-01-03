import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Image from 'next/image';

// MUI
import { CircularProgress, Tab, Tabs } from '@mui/material';

// Icon
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ReplayIcon from '@mui/icons-material/Replay';

// Assets
import ordersEmptyPic from '@/assets/images/empty-order.png';

// Components
import ProfileLayout from '@/components/layout/profile-layout/profile-layout';
import OrderCard from '@/components/templates/order-card/order-card';

// Apis
import useGetCards from '@/apis/profile/useGetCards';

function Orders() {
   const [tabsValue, setTabsValue] = useState('');

   const t = useTranslations('orders');

   const { data: cardsData, isLoading: cardsIsLoading } = useGetCards(tabsValue);

   return (
      <ProfileLayout>
         <div className="rounded-2xl bg-white p-7">
            <p className="text-lg font-bold text-[#050F2C]">{t('Track orders')}</p>

            <div className="mt-6 rounded-2xl bg-[#F5F8FC] px-5 customMd:hidden custom1100:block">
               <Tabs
                  value={tabsValue}
                  onChange={(e, newValue) => setTabsValue(newValue)}
                  TabIndicatorProps={{ sx: { backgroundColor: '#B1302E' } }}
                  variant="scrollable"
               >
                  <Tab label={t('All')} value="" custompinkhigh="true" />
                  <Tab
                     icon={<LocalShippingOutlinedIcon />}
                     iconPosition="start"
                     label={t('Sending')}
                     value="sending"
                     custompinkhigh="true"
                  />
                  <Tab
                     icon={<CheckCircleOutlinedIcon />}
                     iconPosition="start"
                     label={t('Delivered')}
                     value="delivered"
                     custompinkhigh="true"
                  />
                  <Tab
                     icon={<ReplayIcon />}
                     iconPosition="start"
                     label={t('Returned')}
                     value="returned"
                     custompinkhigh="true"
                  />
               </Tabs>
            </div>

            {cardsIsLoading ? (
               <div className="mt-6 flex items-center justify-center">
                  <CircularProgress color="customPink" />
               </div>
            ) : (
               <div className="">
                  {cardsData?.total_objects ? (
                     <div className="mt-10 flex flex-col gap-5">
                        {cardsData?.result?.map(item => (
                           <OrderCard key={item.order_code} detail={item} />
                        ))}
                     </div>
                  ) : (
                     <div className="mx-auto my-14 flex max-w-[370px] flex-col gap-4 text-center">
                        <p className="text-xl font-bold">{t('Your order list is empty')}</p>
                        <p className="text-sm text-textColor">{t('Place your first order now')}</p>
                        <div>
                           <Image src={ordersEmptyPic} alt="no address" className="h-full w-full object-cover" />
                        </div>
                     </div>
                  )}
               </div>
            )}
         </div>
      </ProfileLayout>
   );
}

export default Orders;

export async function getStaticProps(context) {
   return {
      props: {
         messages: (await import(`../../../messages/${context.locale}.json`)).default,
      },
   };
}
