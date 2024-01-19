import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useState } from 'react';

// MUI
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalali';

// Icons
import DownloadIcon from '@mui/icons-material/Download';

// Components
import { LoadingButton } from '@mui/lab';
import AdminLayout from '@/components/layout/admin-layout/admin-layout';

// Apis
import useGetReports from '@/apis/pAdmin/reports/useGetReports';
import axiosInstance from '@/configs/axiosInstance';

function Reports() {
   const todayTimestamp = Math.floor(new Date().getTime() / 1000);
   const [chosenFilter, setChosenFilter] = useState(todayTimestamp);
   const [startDate, setStartDate] = useState();
   const [endDate, setEndDate] = useState();
   const [isDownloading, setIsDownloading] = useState(false);

   const { locale } = useRouter();

   const { data: reportsData, isLoading: reportsIsLoading } = useGetReports(
      chosenFilter === 1 || chosenFilter === 13 ? chosenFilter : '',
      chosenFilter !== 1 && chosenFilter !== 13 ? chosenFilter : ''
   );

   const downloadFileHandler = () => {
      if (startDate && endDate) {
         setIsDownloading(true);
         axiosInstance(
            `accounts/report/?excel=True&start=${Math.floor(startDate / 1000)}&end=${Math.floor(endDate / 1000)}`
         )
            .then(res => {
               window.location.href = `http://yalfan.com/${res?.data?.link}`;
               setTimeout(() => {
                  setIsDownloading(false);
               }, 1500);
            })
            .catch(() => setIsDownloading(false));
      } else {
         toast.info('Please select a cover for your category', {
            style: {
               direction: locale === 'en' ? 'ltr' : 'rtl',
               fontFamily:
                  locale === 'en' ? 'poppins' : locale === 'fa' ? 'dana' : locale === 'ar' ? 'rubik' : 'poppins',
               lineHeight: '25px',
            },
            theme: 'colored',
            autoClose: 5000,
         });
      }
   };

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

         <div className="mt-10 flex flex-col flex-wrap items-center justify-between gap-6 customSm:flex-row">
            <div className="flex flex-col items-center gap-3 customSm:flex-row customSm:gap-5">
               <p>از</p>
               <div>
                  <LocalizationProvider dateAdapter={locale === 'fa' ? AdapterDateFnsJalali : AdapterDayjs}>
                     <DatePicker value={startDate} onChange={e => setStartDate(e.valueOf())} />
                  </LocalizationProvider>
               </div>
               <p>تا</p>
               <div>
                  <LocalizationProvider dateAdapter={locale === 'fa' ? AdapterDateFnsJalali : AdapterDayjs}>
                     <DatePicker value={endDate} onChange={e => setEndDate(e.valueOf())} />
                  </LocalizationProvider>
               </div>
            </div>
            <LoadingButton
               startIcon={<DownloadIcon />}
               variant="contained"
               color="customPinkHigh"
               className="!w-[220px] !text-white customSm:!w-auto"
               onClick={downloadFileHandler}
               size="large"
               loading={isDownloading}
            >
               دانلود فایل
            </LoadingButton>
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
