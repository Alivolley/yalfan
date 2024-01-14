import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { useState } from 'react';

// MUI
import { Button, IconButton, Tooltip } from '@mui/material';

// Icons
import QrCodeOutlinedIcon from '@mui/icons-material/QrCodeOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import PercentIcon from '@mui/icons-material/Percent';

// Components
import AdminLayout from '@/components/layout/admin-layout/admin-layout';
import Table from '@/components/templates/table/table';
import ConfirmModal from '@/components/templates/confirm-modal/confirm-modal';
import AddEditProductModal from '@/components/pages/adminPanel/addEditProductModal/addEditProductModal';

// Apis
import useGetProducts from '@/apis/pAdmin/products/useGetProducts';
import useDeleteProduct from '@/apis/pAdmin/products/useDeleteProduct';

function Products() {
   const { locale } = useRouter();
   const [showDeleteProductModal, setShowDeleteProductModal] = useState(false);
   const [showAddEditProductModal, setShowAddEditProductModal] = useState(false);
   const [chosenProductForDelete, setChosenProductForDelete] = useState();
   const [chosenProductForEdit, setChosenProductForEdit] = useState();
   const [pageStatus, setPageStatus] = useState(1);
   const [countValue, setCountValue] = useState(6);
   const t = useTranslations('productDetail');

   const { data: productsData, isLoading: productIsLoading } = useGetProducts(pageStatus, countValue);
   const { trigger: deleteProductTrigger, isMutating: deleteProductIsMutating } = useDeleteProduct(
      pageStatus,
      countValue
   );

   // console.log(productsData);

   const closeAddEditProductModalHandler = () => {
      setShowAddEditProductModal(false);
      setChosenProductForEdit();
   };

   const closeDeleteProductModalHandler = () => {
      setShowDeleteProductModal(false);
      setChosenProductForDelete();
   };

   const deleteProductHandler = () => {
      deleteProductTrigger(chosenProductForDelete, {
         onSuccess: () => closeDeleteProductModalHandler(),
      });
   };

   const columns = [
      { id: 1, title: 'ردیف', key: 'index' },
      {
         id: 2,
         title: 'نام',
         key: 'title',
         renderCell: data => (
            <div className="flex items-center gap-1">
               <img src={data.cover} alt="product" className="h-9 w-9 rounded-full bg-[#f5f8fc] object-cover" />
               <p>{data.title}</p>
            </div>
         ),
      },
      {
         id: 3,
         title: 'رنگ',
         key: 'colors',
         renderCell: data =>
            data?.colors?.length ? (
               <div className="flex items-center justify-center gap-1">
                  {data?.colors?.map(
                     (item, index) =>
                        index < 3 && (
                           <div
                              className="h-4 w-4 rounded-full"
                              style={{ backgroundColor: item.color }}
                              key={item.id}
                           />
                        )
                  )}
                  {data?.colors?.length > 3 && (
                     <Tooltip
                        dir={locale === 'en' ? 'ltr' : 'rtl'}
                        title={
                           <div className="flex max-w-[90px] flex-wrap items-center gap-2">
                              {data?.colors?.map(
                                 (item, index) =>
                                    index >= 3 && (
                                       <div
                                          className="h-4 w-4 rounded-full"
                                          style={{ backgroundColor: item.color }}
                                          key={item.id}
                                       />
                                    )
                              )}
                           </div>
                        }
                     >
                        <IconButton size="small">
                           <MoreHorizIcon />
                        </IconButton>
                     </Tooltip>
                  )}
               </div>
            ) : (
               <p>ناموجود</p>
            ),
      },
      {
         id: 4,
         title: 'موجودی (کل رنگ ها)',
         key: 'stock',
         renderCell: data => <p>{data?.colors?.reduce((sum, item) => sum + item.stock, 0) || 0} عدد</p>,
      },
      { id: 5, title: 'دسته بندی', key: 'category' },
      { id: 6, title: 'ابعاد', key: 'dimensions' },
      {
         id: 7,
         title: 'قیمت',
         key: 'before_discount_price',
         renderCell: data => <p>{Number(data.before_discount_price).toLocaleString()} تومان</p>,
      },
      {
         id: 8,
         title: 'عملیات',
         key: 'actions',
         renderCell: data => (
            <div className="flex items-center gap-2">
               <Tooltip
                  title={
                     <p
                        className={`flex items-center justify-center ${
                           data?.discount_percent ? 'rounded-full bg-green-500 p-0.5 text-sm' : 'text-base text-black'
                        }`}
                        dir={locale === 'en' ? 'ltr' : 'rtl'}
                     >
                        <PercentIcon fontSize="inherit" />
                     </p>
                  }
               >
                  <IconButton size="small">
                     <MoreVertOutlinedIcon fontSize="small" />
                  </IconButton>
               </Tooltip>

               <IconButton
                  size="small"
                  onClick={() => {
                     setChosenProductForEdit(data);
                     setShowAddEditProductModal(true);
                  }}
               >
                  <BorderColorOutlinedIcon fontSize="inherit" />
               </IconButton>
               <IconButton
                  size="small"
                  onClick={() => {
                     setChosenProductForDelete(data?.title);
                     setShowDeleteProductModal(true);
                  }}
               >
                  <DeleteOutlineOutlinedIcon fontSize="small" />
               </IconButton>
            </div>
         ),
      },
   ];

   return (
      <AdminLayout>
         <div className="bg-white p-5">Products</div>
         <div className="mt-6 w-full bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
               <div className="flex items-center gap-1.5">
                  <QrCodeOutlinedIcon color="textColor" fontSize="small" />
                  <p className="font-bold">لیست محصولات</p>
               </div>

               <Button
                  startIcon={<AddCircleOutlinedIcon />}
                  color="customPinkHigh"
                  onClick={() => setShowAddEditProductModal(true)}
               >
                  افزودن محصول
               </Button>
            </div>

            <div
               className="mx-auto mt-6 w-full customMd:w-[460px] lg:w-[580px]
             customLg:w-[755px] xl:w-[830px] customXl:w-[950px] 2xl:w-[1090px] custom1700:w-[1250px]"
            >
               <Table
                  columns={columns}
                  rows={productsData?.result}
                  pageStatus={pageStatus}
                  setPageStatus={setPageStatus}
                  totalPages={productsData?.total_pages}
                  totalObjects={productsData?.total_objects}
                  loading={productIsLoading}
                  countValue={countValue}
                  setCountValue={setCountValue}
               />
            </div>
         </div>

         <ConfirmModal
            open={showDeleteProductModal}
            closeModal={closeDeleteProductModalHandler}
            title={t('Are you sure to delete this comment?')}
            confirmHandler={deleteProductHandler}
            confirmLoading={deleteProductIsMutating}
         />

         <AddEditProductModal
            show={showAddEditProductModal}
            onClose={closeAddEditProductModalHandler}
            pageStatus={pageStatus}
            countValue={countValue}
            isEdit={!!chosenProductForEdit}
            detail={chosenProductForEdit}
         />
      </AdminLayout>
   );
}

export default Products;

export async function getServerSideProps(context) {
   return {
      props: {
         messages: (await import(`../../../messages/${context.locale}.json`)).default,
      },
   };
}
