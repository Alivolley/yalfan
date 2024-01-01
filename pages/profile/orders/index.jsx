import { useState } from 'react';

// MUI
import { Tab, Tabs } from '@mui/material';

// Icon
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';

// Components
import ProfileLayout from '@/components/layout/profile-layout/profile-layout';
// import OrderCard from '@/components/pages/profile/order-card/order-card';

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
               </Tabs>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-5">
               {/* <OrderCard className="w-[200px]" />
            <OrderCard className="w-[200px]" />
            <OrderCard className="w-[200px]" /> */}
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
