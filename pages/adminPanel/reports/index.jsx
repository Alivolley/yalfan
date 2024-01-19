import { useRouter } from 'next/router';
import { useState } from 'react';

// MUI

// Icons

// Components
import AdminLayout from '@/components/layout/admin-layout/admin-layout';

// Apis
import useGetReports from '@/apis/pAdmin/reports/useGetReports';

function Reports() {
   const todayTimestamp = Math.floor(new Date().getTime() / 1000);
   const [chosenFilter, setChosenFilter] = useState(todayTimestamp);

   const { locale } = useRouter();

   const { data: reportsData, isLoading: reportsIsLoading } = useGetReports(
      chosenFilter === 1 || chosenFilter === 13 ? chosenFilter : '',
      chosenFilter !== 1 && chosenFilter !== 13 ? chosenFilter : ''
   );

   console.log(reportsData);

   return (
      <AdminLayout>
         <div className="flex flex-col gap-2 customSm:flex-row customSm:items-center customSm:gap-4">
            <button
               type="button"
               onClick={() => setChosenFilter(todayTimestamp)}
               className={`h-full flex-1 cursor-pointer rounded-sm border border-solid border-[#DFEBF1] bg-white 
               py-4 text-center text-base customSm:py-6 customMd:text-xl ${
                  locale === 'en'
                     ? 'font-poppins'
                     : locale === 'fa'
                       ? 'font-dana'
                       : locale === 'ar'
                         ? 'font-rubik'
                         : null
               }`}
            >
               <p
                  className={
                     new Date(chosenFilter)?.getDate() === new Date(todayTimestamp)?.getDate()
                        ? 'font-bold text-black'
                        : 'text-[#98A2B2]'
                  }
               >
                  {/* {t('All orders')} */}
                  فروش روزانه
               </p>
            </button>

            <button
               type="button"
               onClick={() => setChosenFilter(1)}
               className={`h-full flex-1 cursor-pointer rounded-sm border border-solid border-[#DFEBF1] bg-white 
               py-4 text-center text-base customSm:py-6 customMd:text-xl ${
                  locale === 'en'
                     ? 'font-poppins'
                     : locale === 'fa'
                       ? 'font-dana'
                       : locale === 'ar'
                         ? 'font-rubik'
                         : null
               }`}
            >
               <p className={chosenFilter === 1 ? 'font-bold text-black' : 'text-[#98A2B2]'}>
                  {/* {t('Sending')} */}
                  فروش ماهانه
               </p>
            </button>

            <button
               type="button"
               onClick={() => setChosenFilter(13)}
               className={`h-full flex-1 cursor-pointer rounded-sm border border-solid border-[#DFEBF1] bg-white 
               py-4 text-center text-base customSm:py-6 customMd:text-xl ${
                  locale === 'en'
                     ? 'font-poppins'
                     : locale === 'fa'
                       ? 'font-dana'
                       : locale === 'ar'
                         ? 'font-rubik'
                         : null
               }`}
            >
               <p className={chosenFilter === 13 ? 'font-bold text-black' : 'text-[#98A2B2]'}>
                  {/* {t('Delivered')} */}
                  فروش سالانه
               </p>
            </button>
         </div>
      </AdminLayout>
   );
}

export default Reports;

export async function getServerSideProps(context) {
   return {
      props: {
         messages: (await import(`../../../messages/${context.locale}.json`)).default,
      },
   };
}
