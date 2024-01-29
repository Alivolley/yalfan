import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import Head from 'next/head';

// MUI
import { Button, IconButton } from '@mui/material';

// Icons
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import PercentIcon from '@mui/icons-material/Percent';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';

// Components
import AdminLayout from '@/components/layout/admin-layout/admin-layout';
import Table from '@/components/templates/table/table';

// Apis
import useGetDiscounts from '@/apis/pAdmin/discounts/useGetDiscounts';
import AddEditDiscountModal from '@/components/pages/adminPanel/addEditDiscountModal/addEditDiscountModal';

function Discounts() {
   const [showAddEditDiscountModal, setShowAddEditDiscountModal] = useState(false);

   const { locale } = useRouter();
   const t = useTranslations('adminPanelProducts');

   const { data: discountsList, isLoading: discountsIsLoading, mutate: discountsMutate } = useGetDiscounts();

   const closeAddEditDiscountModalHandler = () => {
      setShowAddEditDiscountModal(false);
      // setChosenUserForEdit();
   };

   console.log(discountsList);

   const columns = [
      { id: 1, title: t('Row'), key: 'index' },
      { id: 2, title: t('Name'), key: 'code' },
      { id: 3, title: 'درصد تخفیف', key: 'percent' },
      { id: 4, title: 'تعداد برای تخفیف', key: 'count', renderCell: data => <p>{data?.count} عدد</p> },
      { id: 5, title: 'ساعت ایجاد', key: 'created' },
      {
         id: 6,
         title: 'زمان انقضا',
         key: 'expiration_time',
         renderCell: data => (
            <div className="flex items-start justify-center gap-3" dir="ltr">
               <div className="flex flex-col items-center justify-center">
                  <p>{data?.expiration_time?.year}</p>
                  <p className="text-[11px]">سال</p>
               </div>
               <p>:</p>
               <div className="flex flex-col items-center justify-center">
                  <p>{data?.expiration_time?.month}</p>
                  <p className="text-[11px]">ماه</p>
               </div>
               <p>:</p>
               <div className="flex flex-col items-center justify-center">
                  <p>{data?.expiration_time?.day}</p>
                  <p className="text-[11px]">روز</p>
               </div>
               <p>:</p>
               <div className="flex flex-col items-center justify-center">
                  <p>{data?.expiration_time?.hour}</p>
                  <p className="text-[11px]">ساعت</p>
               </div>
               <p>:</p>
               <div className="flex flex-col items-center justify-center">
                  <p>{data?.expiration_time?.minute}</p>
                  <p className="text-[11px]">دقیقه</p>
               </div>
               <p>:</p>
               <div className="flex flex-col items-center justify-center">
                  <p>{data?.expiration_time?.second}</p>
                  <p className="text-[11px]">ثانیه</p>
               </div>
            </div>
         ),
      },
      {
         id: 7,
         title: t('Actions'),
         key: 'actions',
         renderCell: data => (
            <div className="flex items-center justify-center gap-2">
               <IconButton
                  size="small"
                  //   onClick={() => {
                  //      setChosenProductForEdit(data);
                  //      setShowAddEditProductModal(true);
                  //   }}
                  //   disabled={!userInfo?.is_super_admin && !userInfo?.permissions?.includes(permissions?.PRODUCT?.PATCH)}
               >
                  <BorderColorOutlinedIcon fontSize="inherit" />
               </IconButton>
               <IconButton
                  size="small"
                  //   onClick={() => {
                  //      setChosenProductForDelete(data?.title);
                  //      setShowDeleteProductModal(true);
                  //   }}
                  //   disabled={!userInfo?.is_super_admin && !userInfo?.permissions?.includes(permissions?.PRODUCT?.DELETE)}
               >
                  <DeleteOutlineOutlinedIcon fontSize="small" />
               </IconButton>
            </div>
         ),
      },
   ];

   return (
      <AdminLayout>
         <Head>
            <title>{locale === 'fa' ? `یلفان - پنل ادمین` : `Yalfan-admin panel`}</title>
         </Head>
         <div className="w-full bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
               <div className="flex items-center gap-1.5">
                  <PercentIcon color="textColor" fontSize="small" />
                  <p className="font-bold">لیست تخفیفات</p>
               </div>

               <Button
                  startIcon={<AddCircleOutlinedIcon />}
                  color="customPinkHigh"
                  onClick={() => setShowAddEditDiscountModal(true)}
                  //   disabled={!userInfo?.is_super_admin && !userInfo?.permissions?.includes(permissions?.PRODUCT?.POST)}
               >
                  افزودن تخفیف
               </Button>
            </div>

            <div className="mx-auto mt-6 w-full">
               <Table
                  columns={columns}
                  rows={discountsList}
                  loading={discountsIsLoading}
                  countValue={discountsList?.length}
               />
            </div>
         </div>

         <AddEditDiscountModal
            show={showAddEditDiscountModal}
            onClose={closeAddEditDiscountModalHandler}
            // isEdit={!!chosenUserForEdit}
            // detail={chosenUserForEdit}
            discountsMutate={discountsMutate}
         />
      </AdminLayout>
   );
}

export default Discounts;

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
