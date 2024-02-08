import Head from 'next/head';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// Redux
import { useSelector } from 'react-redux';

// MUI
import { Button, CircularProgress, Grid, IconButton, Tooltip } from '@mui/material';

// Icons
import QrCodeOutlinedIcon from '@mui/icons-material/QrCodeOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import PercentIcon from '@mui/icons-material/Percent';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';

// Assets
import noImage from '@/assets/images/noImage.png';

// Components
import AdminLayout from '@/components/layout/admin-layout/admin-layout';
import Table from '@/components/templates/table/table';
import ConfirmModal from '@/components/templates/confirm-modal/confirm-modal';
import AddEditProductModal from '@/components/pages/adminPanel/addEditProductModal/addEditProductModal';
import AddEditCategoryModalList from '@/components/pages/adminPanel/addEditCategoryModalList/addEditCategoryModalList';

// Apis
import useGetProducts from '@/apis/pAdmin/products/useGetProducts';
import useDeleteProduct from '@/apis/pAdmin/products/useDeleteProduct';
import useCategories from '@/apis/categories/useCategories';

// Utils
import permissions from '@/utils/permission';

function Products() {
   const { locale, back, pathname } = useRouter();
   const [showDeleteProductModal, setShowDeleteProductModal] = useState(false);
   const [showAddEditProductModal, setShowAddEditProductModal] = useState(false);
   const [showAddEditCategoryModal, setShowAddEditCategoryModal] = useState(false);
   const [chosenProductForDelete, setChosenProductForDelete] = useState();
   const [chosenProductForEdit, setChosenProductForEdit] = useState();
   const [chosenCategory, setChosenCategory] = useState('');
   const [pageStatus, setPageStatus] = useState(1);
   const [countValue, setCountValue] = useState(6);
   const t = useTranslations('adminPanelProducts');

   const userInfo = useSelector(state => state?.userInfoReducer);
   const { data: categoryList, isLoading: categoryIsLoading } = useCategories();
   const {
      data: productsData,
      isLoading: productIsLoading,
      mutate: productsMutate,
   } = useGetProducts(pageStatus, countValue, chosenCategory);
   const { trigger: deleteProductTrigger, isMutating: deleteProductIsMutating } = useDeleteProduct(productsMutate);

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

   useEffect(() => {
      if (userInfo?.phone_number && !userInfo?.is_admin) {
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
      {
         id: 2,
         title: t('Name'),
         key: 'title',
         renderCell: data => (
            <div className="flex items-center gap-1">
               <div className="relative size-9 rounded-full bg-[#f5f8fc]">
                  <Image src={data.cover || noImage} alt="product" className="rounded-full object-cover" fill />
               </div>
               <p>{data.title}</p>
            </div>
         ),
      },
      {
         id: 3,
         title: t('Color'),
         key: 'colors',
         renderCell: data =>
            data?.colors?.length ? (
               <div className="flex items-center justify-center gap-1">
                  {data?.colors?.map(
                     (item, index) =>
                        index < 3 && (
                           <div className="size-4 rounded-full" style={{ backgroundColor: item.color }} key={item.id} />
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
                                          className="size-4 rounded-full"
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
               <p>{t('Unavailable')}</p>
            ),
      },
      {
         id: 4,
         title: t('Available (all colors)'),
         key: 'stock',
         renderCell: data => (
            <p>
               {data?.colors?.reduce((sum, item) => sum + item.stock, 0) || 0} {t('Count')}
            </p>
         ),
      },
      { id: 5, title: t('Category'), key: 'category' },
      {
         id: 6,
         title: t('Price'),
         key: 'before_discount_price',
         renderCell: data => (
            <p>
               {Number(data.before_discount_price).toLocaleString()} {t('unit')}
            </p>
         ),
      },
      {
         id: 7,
         title: t('Actions'),
         key: 'actions',
         renderCell: data => (
            <div className="flex items-center gap-2">
               <Tooltip
                  title={
                     <p
                        className={`flex items-center justify-center ${
                           data?.percentage ? 'rounded-full bg-green-500 p-0.5 text-sm' : 'text-base text-black'
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
                  disabled={!userInfo?.is_super_admin && !userInfo?.permissions?.includes(permissions?.PRODUCT?.PATCH)}
               >
                  <BorderColorOutlinedIcon fontSize="inherit" />
               </IconButton>
               <IconButton
                  size="small"
                  onClick={() => {
                     setChosenProductForDelete(data?.title);
                     setShowDeleteProductModal(true);
                  }}
                  disabled={!userInfo?.is_super_admin && !userInfo?.permissions?.includes(permissions?.PRODUCT?.DELETE)}
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
         <div className="bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
               <div className="flex items-center gap-1.5">
                  <ListAltOutlinedIcon color="textColor" fontSize="small" />
                  <p className="font-bold">{t('Products categories')}</p>
               </div>

               <Button
                  startIcon={<AddCircleOutlinedIcon />}
                  color="customPinkHigh"
                  onClick={() => setShowAddEditCategoryModal(true)}
               >
                  {t('Manage categories')}
               </Button>
            </div>

            {categoryIsLoading ? (
               <div className="mt-10 flex w-full items-center justify-center">
                  <CircularProgress color="customPink" />
               </div>
            ) : (
               <div className="mt-10">
                  <Grid container rowSpacing={{ xs: 2, md: 4 }} columnSpacing={1}>
                     <Grid item xs={6} sm={4} md={3} lg={2}>
                        <Button
                           className="!flex !items-start !gap-1 !p-0 !text-xs customMd:!text-sm"
                           color="black"
                           onClick={() => {
                              setChosenCategory('');
                              setPageStatus(1);
                           }}
                        >
                           <div
                              className={`size-4 shrink-0 rounded-full ${
                                 !chosenCategory
                                    ? 'border-[3px] border-solid border-[#E4EAF0] bg-customPinkHigh'
                                    : 'bg-[#E4EAF0]'
                              }`}
                           />
                           <p>{t('All products')}</p>
                        </Button>
                     </Grid>
                     {categoryList?.map(item => (
                        <Grid item xs={6} sm={4} md={3} lg={2} key={item?.id}>
                           <Button
                              className="!flex !items-start !gap-1 !p-0 !text-xs customMd:!text-sm"
                              color="black"
                              onClick={() => {
                                 setChosenCategory(item.title);
                                 setPageStatus(1);
                              }}
                           >
                              <div
                                 className={`size-4 shrink-0 rounded-full ${
                                    chosenCategory === item.title
                                       ? 'border-[3px] border-solid border-[#E4EAF0] bg-customPinkHigh'
                                       : 'bg-[#E4EAF0]'
                                 }`}
                              />
                              <p>{item?.title}</p>
                           </Button>
                        </Grid>
                     ))}
                  </Grid>
               </div>
            )}
         </div>
         <div className="mt-6 w-full bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
               <div className="flex items-center gap-1.5">
                  <QrCodeOutlinedIcon color="textColor" fontSize="small" />
                  <p className="font-bold">{t('Products list')}</p>
               </div>

               <Button
                  startIcon={<AddCircleOutlinedIcon />}
                  color="customPinkHigh"
                  onClick={() => setShowAddEditProductModal(true)}
                  disabled={!userInfo?.is_super_admin && !userInfo?.permissions?.includes(permissions?.PRODUCT?.POST)}
               >
                  {t('Add product')}
               </Button>
            </div>

            <div className="mx-auto mt-6 w-full">
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
            title={t('Are you sure to delete this product?')}
            confirmHandler={deleteProductHandler}
            confirmLoading={deleteProductIsMutating}
         />

         <AddEditProductModal
            show={showAddEditProductModal}
            onClose={closeAddEditProductModalHandler}
            isEdit={!!chosenProductForEdit}
            detail={chosenProductForEdit}
            productsMutate={productsMutate}
         />

         <AddEditCategoryModalList show={showAddEditCategoryModal} onClose={() => setShowAddEditCategoryModal(false)} />
      </AdminLayout>
   );
}

export default Products;

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
