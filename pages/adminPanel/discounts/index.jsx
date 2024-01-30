import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import Head from 'next/head';

// Redux
import { useSelector } from 'react-redux';

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
import ConfirmModal from '@/components/templates/confirm-modal/confirm-modal';
import AddEditDiscountModal from '@/components/pages/adminPanel/addEditDiscountModal/addEditDiscountModal';

// Apis
import useGetDiscounts from '@/apis/pAdmin/discounts/useGetDiscounts';
import useDeleteCode from '@/apis/pAdmin/discounts/useDeleteCode';

// Utils
import permissions from '@/utils/permission';

function Discounts() {
   const [pageStatus, setPageStatus] = useState(1);
   const [countValue, setCountValue] = useState(6);
   const [showAddEditDiscountModal, setShowAddEditDiscountModal] = useState(false);
   const [chosenCodeForDelete, setChosenCodeForDelete] = useState();
   const [showDeleteModal, setShowDeleteModal] = useState(false);
   const [chosenCodeForEdit, setChosenCodeForEdit] = useState();

   const { locale } = useRouter();
   const t = useTranslations('adminPanelDiscounts');
   const userInfo = useSelector(state => state?.userInfoReducer);

   const {
      data: discountsList,
      isLoading: discountsIsLoading,
      mutate: discountsMutate,
   } = useGetDiscounts(pageStatus, countValue);
   const { trigger: deleteCodeTrigger, isMutating: deleteCodeIsMutating } = useDeleteCode();

   const closeAddEditDiscountModalHandler = () => {
      setShowAddEditDiscountModal(false);
      setChosenCodeForEdit();
   };

   const closeDeleteCodeModal = () => {
      setShowDeleteModal(false);
      setChosenCodeForDelete();
   };

   const deleteCodeHandler = () => {
      deleteCodeTrigger(chosenCodeForDelete.id, {
         onSuccess: () => {
            discountsMutate();
            closeDeleteCodeModal();
         },
      });
   };

   const columns = [
      { id: 1, title: t('Row'), key: 'index' },
      { id: 2, title: t('Name'), key: 'code' },
      { id: 3, title: t('Discount percent'), key: 'percent' },
      {
         id: 4,
         title: t('Count for discount'),
         key: 'count',
         renderCell: data => (
            <p>
               {data?.count} {t('Count')}
            </p>
         ),
      },
      { id: 5, title: t('Created time'), key: 'created' },
      {
         id: 6,
         title: t('Expiration time'),
         key: 'expiration_time',
         renderCell: data => (
            <div className="flex items-start justify-center gap-3" dir="ltr">
               <div className="flex flex-col items-center justify-center">
                  <p>{data?.expiration_time?.year}</p>
                  <p className="text-[11px]">{t('Year')}</p>
               </div>
               <p>:</p>
               <div className="flex flex-col items-center justify-center">
                  <p>{data?.expiration_time?.month}</p>
                  <p className="text-[11px]">{t('Month')}</p>
               </div>
               <p>:</p>
               <div className="flex flex-col items-center justify-center">
                  <p>{data?.expiration_time?.day}</p>
                  <p className="text-[11px]">{t('Day')}</p>
               </div>
               <p>:</p>
               <div className="flex flex-col items-center justify-center">
                  <p>{data?.expiration_time?.hour}</p>
                  <p className="text-[11px]">{t('Hour')}</p>
               </div>
               <p>:</p>
               <div className="flex flex-col items-center justify-center">
                  <p>{data?.expiration_time?.minute}</p>
                  <p className="text-[11px]">{t('Minute')}</p>
               </div>
               <p>:</p>
               <div className="flex flex-col items-center justify-center">
                  <p>{data?.expiration_time?.second}</p>
                  <p className="text-[11px]">{t('Second')}</p>
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
                  onClick={() => {
                     setChosenCodeForEdit(data);
                     setShowAddEditDiscountModal(true);
                  }}
                  disabled={
                     !userInfo?.is_super_admin && !userInfo?.permissions?.includes(permissions?.DISCOUNT_CODE?.PATCH)
                  }
               >
                  <BorderColorOutlinedIcon fontSize="inherit" />
               </IconButton>
               <IconButton
                  size="small"
                  onClick={() => {
                     setShowDeleteModal(true);
                     setChosenCodeForDelete(data);
                  }}
                  disabled={
                     !userInfo?.is_super_admin && !userInfo?.permissions?.includes(permissions?.DISCOUNT_CODE?.DELETE)
                  }
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
                  <p className="font-bold">{t('Discounts list')}</p>
               </div>

               <Button
                  startIcon={<AddCircleOutlinedIcon />}
                  color="customPinkHigh"
                  onClick={() => setShowAddEditDiscountModal(true)}
                  disabled={
                     !userInfo?.is_super_admin && !userInfo?.permissions?.includes(permissions?.DISCOUNT_CODE?.POST)
                  }
               >
                  {t('Add discount')}
               </Button>
            </div>

            <div className="mx-auto mt-6 w-full">
               <Table
                  columns={columns}
                  rows={discountsList?.result}
                  loading={discountsIsLoading}
                  totalPages={discountsList?.total_pages}
                  totalObjects={discountsList?.total_objects}
                  pageStatus={pageStatus}
                  setPageStatus={setPageStatus}
                  countValue={countValue}
                  setCountValue={setCountValue}
               />
            </div>
         </div>

         <AddEditDiscountModal
            show={showAddEditDiscountModal}
            onClose={closeAddEditDiscountModalHandler}
            isEdit={!!chosenCodeForEdit}
            detail={chosenCodeForEdit}
            discountsMutate={discountsMutate}
         />

         <ConfirmModal
            open={showDeleteModal}
            closeModal={closeDeleteCodeModal}
            title={t('Are you sure about deleting this code?')}
            confirmHandler={deleteCodeHandler}
            confirmLoading={deleteCodeIsMutating}
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
