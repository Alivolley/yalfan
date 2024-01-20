import { useState } from 'react';
import { useTranslations } from 'next-intl';

// MUI
import { Button } from '@mui/material';

// Icons
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';

// Components
import AdminLayout from '@/components/layout/admin-layout/admin-layout';

// Apis
import useGetAllUsers from '@/apis/pAdmin/users/useGetAllUsers';

function Users() {
   const [chosenCategory, setChosenCategory] = useState('');
   const t = useTranslations('adminPanelProducts');

   const { data: usersData, isLoading: usersIsLoading } = useGetAllUsers();

   console.log(usersData);
   console.log(usersIsLoading);

   return (
      <AdminLayout>
         <div className="bg-white p-5">
            <div className="flex items-center gap-1.5">
               <PeopleAltOutlinedIcon color="textColor" fontSize="small" />
               <p className="font-bold">
                  {/* {t('Products categories')} */}
                  اشخاص
               </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4 customMd:gap-10">
               <Button
                  className="!flex !min-w-0 !items-center !gap-1 !p-0 !text-xs customMd:!text-sm"
                  color="black"
                  onClick={() => setChosenCategory('')}
               >
                  <div
                     className={`h-4 w-4 shrink-0 rounded-full ${
                        !chosenCategory
                           ? 'border-[3px] border-solid border-[#E4EAF0] bg-customPinkHigh'
                           : 'bg-[#E4EAF0]'
                     }`}
                  />
                  <p>
                     {/* {t('All products')} */}
                     همه اشخاص
                  </p>
               </Button>

               <Button
                  className="!flex !min-w-0 !items-center !gap-1 !p-0 !text-xs customMd:!text-sm"
                  color="black"
                  onClick={() => setChosenCategory('main admins')}
               >
                  <div
                     className={`h-4 w-4 shrink-0 rounded-full ${
                        chosenCategory === 'main admins'
                           ? 'border-[3px] border-solid border-[#E4EAF0] bg-customPinkHigh'
                           : 'bg-[#E4EAF0]'
                     }`}
                  />
                  <p>
                     {/* {t('All products')} */}
                     ادمین اصلی
                  </p>
               </Button>

               <Button
                  className="!flex !min-w-0 !items-center !gap-1 !p-0 !text-xs customMd:!text-sm"
                  color="black"
                  onClick={() => setChosenCategory('chosen admins')}
               >
                  <div
                     className={`h-4 w-4 shrink-0 rounded-full ${
                        chosenCategory === 'chosen admins'
                           ? 'border-[3px] border-solid border-[#E4EAF0] bg-customPinkHigh'
                           : 'bg-[#E4EAF0]'
                     }`}
                  />
                  <p>
                     {/* {t('All products')} */}
                     ادمین انتخاب شده
                  </p>
               </Button>

               <Button
                  className="!flex !min-w-0 !items-center !gap-1 !p-0 !text-xs customMd:!text-sm"
                  color="black"
                  onClick={() => setChosenCategory('users')}
               >
                  <div
                     className={`h-4 w-4 shrink-0 rounded-full ${
                        chosenCategory === 'users'
                           ? 'border-[3px] border-solid border-[#E4EAF0] bg-customPinkHigh'
                           : 'bg-[#E4EAF0]'
                     }`}
                  />
                  <p>
                     {/* {t('All products')} */}
                     مشتری
                  </p>
               </Button>
            </div>
            {/* )} */}
         </div>
      </AdminLayout>
   );
}

export default Users;

export async function getServerSideProps(context) {
   return {
      props: {
         messages: (await import(`../../../messages/${context.locale}.json`)).default,
      },
   };
}
