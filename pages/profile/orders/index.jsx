import Image from 'next/image';
import { useState } from 'react';

// MUI
import { Tab, Tabs } from '@mui/material';

// Icon
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ReplayIcon from '@mui/icons-material/Replay';

// Assets
import ordersEmptyPic from '@/assets/images/empty-order.png';

// Components
import ProfileLayout from '@/components/layout/profile-layout/profile-layout';

function Orders() {
   const [tabsValue, setTabsValue] = useState('all');

   return (
      <ProfileLayout>
         <div className="rounded-2xl bg-white p-7">
            <p className="text-lg font-bold text-[#050F2C]">پیگیری سفارش ها</p>

            <div className="mt-6 rounded-2xl bg-[#F5F8FC] px-5">
               <Tabs
                  value={tabsValue}
                  onChange={(e, newValue) => setTabsValue(newValue)}
                  TabIndicatorProps={{ sx: { backgroundColor: '#B1302E' } }}
                  variant="scrollable"
               >
                  <Tab label="همه" value="all" custompinkhigh="true" />
                  <Tab
                     icon={<LocalShippingOutlinedIcon />}
                     iconPosition="start"
                     label="در حال ارسال"
                     value="shipping"
                     custompinkhigh="true"
                  />
                  <Tab
                     icon={<CheckCircleOutlinedIcon />}
                     iconPosition="start"
                     label="تحویل داده شده"
                     value="delivered"
                     custompinkhigh="true"
                  />
                  <Tab
                     icon={<ReplayIcon />}
                     iconPosition="start"
                     label="مرجوعی"
                     value="returned"
                     custompinkhigh="true"
                  />
               </Tabs>
            </div>

            <div className="">
               {/* <OrderCard className="w-[200px]" />
            <OrderCard className="w-[200px]" />
            <OrderCard className="w-[200px]" /> */}

               <div className="mx-auto my-14 flex max-w-[370px] flex-col gap-4 text-center">
                  <p className="text-xl font-bold">
                     {/* {t('You have not registered an address yet')} */}
                     لیست سفارش های شما خالی است
                  </p>
                  <p className="text-sm text-textColor">
                     {/* {t('Add your address to the list of addresses so that you can always use it easily when ordering')} */}
                     برای ثبت اولین سفارش خود همین الان اقدام کن
                  </p>
                  <div>
                     <Image src={ordersEmptyPic} alt="no address" className="h-full w-full object-cover" />
                  </div>
               </div>
            </div>
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
