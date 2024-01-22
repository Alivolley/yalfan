import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// Redux
import { useSelector } from 'react-redux';

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

   const t = useTranslations('adminPanelOrders');
   const userInfo = useSelector(state => state?.userInfoReducer);

   const {
      data: cardsData,
      isLoading: cardsIsLoading,
      mutate: cardMutate,
   } = useGetAllCards(chosenFilter, pageStatus, countValue);

   const { locale, back, pathname } = useRouter();

   const closeDetailModal = () => {
      setShowDetailModal(false);
      setChosenOrderForDetail();
   };

   const closeEditStatusModal = () => {
      setShowEditStatusModal(false);
      setChosenOrderForEdit();
   };

   useEffect(() => {
      if (!userInfo?.is_admin) {
         back();
         toast.warn(t("You don't have permission to visit this page"), {
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
   }, [userInfo, pathname]);

   const columns = [
      { id: 1, title: t('Row'), key: 'index' },
      { id: 2, title: t("Orderer's name"), key: 'title', renderCell: data => data?.user?.name },
      { id: 3, title: t('Order code'), key: 'order_code' },
      {
         id: 4,
         title: t('Row'),
         key: 'Total price',
         renderCell: data => `${Number(data?.final_price).toLocaleString()} ${t('unit')}`,
      },
      {
         id: 5,
         title: t('Status'),
         key: 'status',
         renderCell: data =>
            data?.status === 'sending' ? (
               <div className="mx-auto flex w-fit items-center gap-1 rounded-lg bg-[#FF9F1C] px-2 py-1 text-xs text-white">
                  <LocalShippingOutlinedIcon className="!text-base" />
                  <p>{t('Sending')}</p>
               </div>
            ) : data?.status === 'delivered' ? (
               <div className="mx-auto flex w-fit items-center gap-1 rounded-lg bg-[#2EC4B6] px-2 py-1 text-xs text-white">
                  <CheckCircleOutlinedIcon className="!text-base" />
                  <p>{t('Delivered')}</p>
               </div>
            ) : data?.status === 'returned' ? (
               <div className="mx-auto flex w-fit items-center gap-1 rounded-lg bg-[#CBB464] px-2 py-1 text-xs text-white">
                  <ReplayIcon className="!text-base" />
                  <p>{t('Returned')}</p>
               </div>
            ) : data?.status === 'unpaid' ? (
               <div className="mx-auto flex w-fit items-center gap-1 rounded-lg bg-[#F03A50] px-2 py-1 text-xs text-white">
                  <MoneyOffCsredOutlinedIcon className="!text-base" />
                  <p>{t('Unpaid')}</p>
               </div>
            ) : null,
      },
      {
         id: 6,
         title: t('Actions'),
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
         <div>
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
                     <p className={chosenFilter === '' ? 'text-black' : 'text-[#98A2B2]'}>{t('All orders')}</p>
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
                     <p className={chosenFilter === 'sending' ? 'text-black' : 'text-[#98A2B2]'}>{t('Sending')}</p>
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
                     <p className={chosenFilter === 'delivered' ? 'text-black' : 'text-[#98A2B2]'}>{t('Delivered')}</p>
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
                     <p className={chosenFilter === 'returned' ? 'text-black' : 'text-[#98A2B2]'}>{t('Returned')}</p>
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
                     <p className={chosenFilter === 'unpaid' ? 'text-black' : 'text-[#98A2B2]'}>{t('Unpaid')}</p>
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
                  <p className="font-bold">{t('Orders list')}</p>
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
            cardMutate={cardMutate}
         />
      </AdminLayout>
   );
}

export default Orders;

export async function getServerSideProps(context) {
   const { req } = context;
   const accessToken = req?.cookies?.yalfan_accessToken;
   const refreshToken = req?.cookies?.yalfan_refreshToken;

   if (accessToken && refreshToken) {
      return {
         props: {
            messages: (await import(`../../../messages/${context.locale}.json`)).default,
         },
      };
   }

   return {
      redirect: {
         destination: '/login',
      },
   };
}
