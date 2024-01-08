import { useState } from 'react';

// MUI
import { Button } from '@mui/material';

// Icons
import QrCodeOutlinedIcon from '@mui/icons-material/QrCodeOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

// Components
import AdminLayout from '@/components/layout/admin-layout/admin-layout';
import Table from '@/components/templates/table/table';

// Apis
import useGetProducts from '@/apis/pAdmin/products/useGetProducts';

function Products() {
   const [pageStatus, setPageStatus] = useState(1);
   const [countValue, setCountValue] = useState(6);

   const { data: productsData, isLoading: productIsLoading } = useGetProducts(pageStatus, countValue);

   const columns = [
      { id: 1, title: 'ردیف', key: 'index' },
      { id: 2, title: 'نام', key: 'title' },
      // { id: 3, title: 'رنگ', key: 'reason' },
      // { id: 4, title: 'موجودی', key: 'reason' },
      { id: 5, title: 'دسته بندی', key: 'category' },
      { id: 6, title: 'ابعاد', key: 'dimensions' },
      { id: 7, title: 'قیمت', key: 'before_discount_price' },
      {
         id: 8,
         title: 'عملیات',
         key: 'actions',
         // renderCell: data => (
         //    <div>
         //       <Button
         //       // icon={pen}
         //       // onClick={() => editModalHandler(data)}
         //       // disabled={!userPermissions.includes(PERMISSION.DEVIATION_REASON.EDIT)}
         //       />
         //       <Button
         //       // icon={trashBin}
         //       // onClick={() => deleteModalHandler(data.id)}
         //       // disabled={!userPermissions.includes(PERMISSION.DEVIATION_REASON.DELETE)}
         //       />
         //    </div>
         // ),
      },
   ];

   console.log(productsData);

   return (
      <AdminLayout>
         <div className="bg-white p-5">Products</div>
         <div className="mt-6 w-full bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
               <div className="flex items-center gap-1.5">
                  <QrCodeOutlinedIcon color="textColor" fontSize="small" />
                  <p className="font-bold">لیست محصولات</p>
               </div>

               <Button startIcon={<AddCircleOutlinedIcon />} color="customPinkHigh">
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
