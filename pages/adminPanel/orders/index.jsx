import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { useState } from 'react';

// MUI
import { Grid, IconButton } from '@mui/material';

// Icons
import QrCodeOutlinedIcon from '@mui/icons-material/QrCodeOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ReplayIcon from '@mui/icons-material/Replay';
import MoneyOffCsredOutlinedIcon from '@mui/icons-material/MoneyOffCsredOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';

// Components
import AdminLayout from '@/components/layout/admin-layout/admin-layout';
import Table from '@/components/templates/table/table';
import OrderDetailModal from '@/components/templates/order-detail-modal/order-detail-modal';
import EditOrderStatusModal from '@/components/pages/adminPanel/editOrderStatusModal/editOrderStatusModal';

// Apis
import useGetAllCards from '@/apis/pAdmin/orders/useGetAllCards';

function Orders() {
   const [chosenFilter, setChosenFilter] = useState('');
   const [pageStatus, setPageStatus] = useState(1);
   const [countValue, setCountValue] = useState(6);
   const [chosenOrderForDetail, setChosenOrderForDetail] = useState();
   const [showDetailModal, setShowDetailModal] = useState(false);
   const [showEditStatusModal, setShowEditStatusModal] = useState(false);
   const [chosenOrderForEdit, setChosenOrderForEdit] = useState();

   const t = useTranslations('orders');

   const { data: cardsData, isLoading: cardsIsLoading } = useGetAllCards(chosenFilter, pageStatus, countValue);

   const { locale } = useRouter();

   const closeDetailModal = () => {
      setShowDetailModal(false);
      setChosenOrderForDetail();
   };

   const closeEditStatusModal = () => {
      setShowEditStatusModal(false);
      setChosenOrderForEdit();
   };

   const columns = [
      { id: 1, title: 'ردیف', key: 'index' },
      { id: 2, title: 'نام سفارش دهنده', key: 'title', renderCell: data => data?.user?.name },
      { id: 3, title: 'شماره سفارش', key: 'order_code' },
      {
         id: 4,
         title: 'قیمت کل خرید',
         key: 'final_price',
         renderCell: data => `${Number(data?.final_price).toLocaleString()} تومان`,
      },
      {
         id: 5,
         title: 'وضعیت',
         key: 'status',
         renderCell: data =>
            data?.status === 'sending' ? (
               <div className="mx-auto flex w-fit items-center gap-1 rounded-lg bg-[#FF9F1C] p-1 text-xs text-white">
                  <LocalShippingOutlinedIcon className="!text-base" />
                  <p>{t('Sending')}</p>
               </div>
            ) : data?.status === 'delivered' ? (
               <div className="mx-auto flex w-fit items-center gap-1 rounded-lg bg-[#2EC4B6] p-1 text-xs text-white">
                  <CheckCircleOutlinedIcon className="!text-base" />
                  <p>{t('Delivered')}</p>
               </div>
            ) : data?.status === 'returned' ? (
               <div className="mx-auto flex w-fit items-center gap-1 rounded-lg bg-[#CBB464] p-1 text-xs text-white">
                  <ReplayIcon className="!text-base" />
                  <p>{t('Returned')}</p>
               </div>
            ) : data?.status === 'unpaid' ? (
               <div className="mx-auto flex w-fit items-center gap-1 rounded-lg bg-[#F03A50] p-1 text-xs text-white">
                  <MoneyOffCsredOutlinedIcon className="!text-base" />
                  <p>
                     {/* {t('Returned')} */}
                     پرداخت نشده
                  </p>
               </div>
            ) : null,
      },
      {
         id: 6,
         title: 'عملیات',
         key: 'actions',
         renderCell: data => (
            <div className="flex items-center justify-center gap-3">
               <IconButton
                  size="small"
                  onClick={() => {
                     setChosenOrderForEdit(data);
                     setShowEditStatusModal(true);
                  }}
               >
                  <BorderColorOutlinedIcon fontSize="inherit" />
               </IconButton>
               <IconButton
                  size="small"
                  onClick={() => {
                     setChosenOrderForDetail(data);
                     setShowDetailModal(true);
                  }}
               >
                  <FolderOutlinedIcon fontSize="small" />
               </IconButton>
            </div>
         ),
      },
   ];

   return (
      <AdminLayout>
         <div className="">
            <Grid container spacing={2}>
               <Grid item xs={6} lg={2.4}>
                  <button
                     type="button"
                     onClick={() => {
                        setChosenFilter('');
                        setPageStatus(1);
                     }}
                     className={`w-full cursor-pointer h-full border border-solid border-[#DFEBF1] bg-white
                      customMd:px-5 customMd:py-6 p-3 text-center text-base customMd:text-xl ${
                         locale === 'en'
                            ? 'font-poppins'
                            : locale === 'fa'
                              ? 'font-dana'
                              : locale === 'ar'
                                ? 'font-rubik'
                                : null
                      }`}
                  >
                     <p className={chosenFilter === '' ? 'text-black' : 'text-[#98A2B2]'}>همه سفارشات</p>
                     <p
                        className={`font-bold ${
                           chosenFilter === '' ? 'mt-3 text-[#D14F4D] customMd:mt-5' : 'text-[#98A2B2]'
                        }`}
                     >
                        {chosenFilter === '' && cardsData?.total_objects}
                     </p>
                  </button>
               </Grid>
               <Grid item xs={6} lg={2.4}>
                  <button
                     type="button"
                     onClick={() => {
                        setChosenFilter('sending');
                        setPageStatus(1);
                     }}
                     className={`w-full cursor-pointer h-full border border-solid border-[#DFEBF1] bg-white
                      customMd:px-5 customMd:py-6 p-3 text-center text-base customMd:text-xl ${
                         locale === 'en'
                            ? 'font-poppins'
                            : locale === 'fa'
                              ? 'font-dana'
                              : locale === 'ar'
                                ? 'font-rubik'
                                : null
                      }`}
                  >
                     <p className={chosenFilter === 'sending' ? 'text-black' : 'text-[#98A2B2]'}>درحال ارسال</p>
                     <p
                        className={`font-bold ${
                           chosenFilter === 'sending' ? 'mt-3 text-[#D14F4D] customMd:mt-5' : 'text-[#98A2B2]'
                        }`}
                     >
                        {chosenFilter === 'sending' && cardsData?.total_objects}
                     </p>
                  </button>
               </Grid>

               <Grid item xs={6} lg={2.4}>
                  <button
                     type="button"
                     onClick={() => {
                        setChosenFilter('delivered');
                        setPageStatus(1);
                     }}
                     className={`w-full cursor-pointer h-full border border-solid border-[#DFEBF1] bg-white
                      customMd:px-5 customMd:py-6 p-3 text-center text-base customMd:text-xl ${
                         locale === 'en'
                            ? 'font-poppins'
                            : locale === 'fa'
                              ? 'font-dana'
                              : locale === 'ar'
                                ? 'font-rubik'
                                : null
                      }`}
                  >
                     <p className={chosenFilter === 'delivered' ? 'text-black' : 'text-[#98A2B2]'}>تحویل داده شده</p>
                     <p
                        className={`font-bold ${
                           chosenFilter === 'delivered' ? 'mt-3 text-[#D14F4D] customMd:mt-5' : 'text-[#98A2B2]'
                        }`}
                     >
                        {chosenFilter === 'delivered' && cardsData?.total_objects}
                     </p>
                  </button>
               </Grid>

               <Grid item xs={6} lg={2.4}>
                  <button
                     type="button"
                     onClick={() => {
                        setChosenFilter('returned');
                        setPageStatus(1);
                     }}
                     className={`w-full cursor-pointer h-full border border-solid border-[#DFEBF1] bg-white
                      customMd:px-5 customMd:py-6 p-3 text-center text-base customMd:text-xl ${
                         locale === 'en'
                            ? 'font-poppins'
                            : locale === 'fa'
                              ? 'font-dana'
                              : locale === 'ar'
                                ? 'font-rubik'
                                : null
                      }`}
                  >
                     <p className={chosenFilter === 'returned' ? 'text-black' : 'text-[#98A2B2]'}>مرجوعی</p>
                     <p
                        className={`font-bold ${
                           chosenFilter === 'returned' ? 'mt-3 text-[#D14F4D] customMd:mt-5' : 'text-[#98A2B2]'
                        }`}
                     >
                        {chosenFilter === 'returned' && cardsData?.total_objects}
                     </p>
                  </button>
               </Grid>

               <Grid item xs={6} lg={2.4}>
                  <button
                     type="button"
                     onClick={() => {
                        setChosenFilter('unpaid');
                        setPageStatus(1);
                     }}
                     className={`w-full cursor-pointer h-full border border-solid border-[#DFEBF1] bg-white
                      customMd:px-5 customMd:py-6 p-3 text-center text-base customMd:text-xl ${
                         locale === 'en'
                            ? 'font-poppins'
                            : locale === 'fa'
                              ? 'font-dana'
                              : locale === 'ar'
                                ? 'font-rubik'
                                : null
                      }`}
                  >
                     <p className={chosenFilter === 'unpaid' ? 'text-black' : 'text-[#98A2B2]'}>پرداخت نشده</p>
                     <p
                        className={`font-bold ${
                           chosenFilter === 'unpaid' ? 'mt-3 text-[#D14F4D] customMd:mt-5' : 'text-[#98A2B2]'
                        }`}
                     >
                        {chosenFilter === 'unpaid' && cardsData?.total_objects}
                     </p>
                  </button>
               </Grid>
            </Grid>
         </div>

         <div className="mt-6 w-full bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
               <div className="flex items-center gap-1.5">
                  <QrCodeOutlinedIcon color="textColor" fontSize="small" />
                  <p className="font-bold">لیست سفارشات</p>
               </div>
            </div>

            <div className="mx-auto mt-6 w-full">
               <Table
                  columns={columns}
                  rows={cardsData?.result}
                  pageStatus={pageStatus}
                  setPageStatus={setPageStatus}
                  totalPages={cardsData?.total_pages}
                  totalObjects={cardsData?.total_objects}
                  loading={cardsIsLoading}
                  countValue={countValue}
                  setCountValue={setCountValue}
               />
            </div>
         </div>

         <OrderDetailModal
            locale={locale}
            show={showDetailModal}
            onClose={closeDetailModal}
            detail={chosenOrderForDetail}
         />

         <EditOrderStatusModal
            show={showEditStatusModal}
            onClose={closeEditStatusModal}
            detail={chosenOrderForEdit}
            pageStatus={pageStatus}
            countValue={countValue}
            status={chosenFilter}
         />
      </AdminLayout>
   );
}

export default Orders;

export async function getServerSideProps(context) {
   return {
      props: {
         messages: (await import(`../../../messages/${context.locale}.json`)).default,
      },
   };
}
