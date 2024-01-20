import { useState } from 'react';

// MUI
import { Button, IconButton } from '@mui/material';

// Icons
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import QrCodeOutlinedIcon from '@mui/icons-material/QrCodeOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';

// Components
import AdminLayout from '@/components/layout/admin-layout/admin-layout';
import Table from '@/components/templates/table/table';
import AddEditUserModal from '@/components/pages/adminPanel/addEditUserModal/addEditUserModal';

// Apis
import useGetAllUsers from '@/apis/pAdmin/users/useGetAllUsers';

function Users() {
   const [chosenCategory, setChosenCategory] = useState('');
   const [pageStatus, setPageStatus] = useState(1);
   const [countValue, setCountValue] = useState(6);
   const [showAddEditUserModal, setShowAddEditUserModal] = useState(false);

   const { data: usersData, isLoading: usersIsLoading } = useGetAllUsers(pageStatus, countValue, chosenCategory);

   const closeAddEditProductModalHandler = () => {
      setShowAddEditUserModal(false);
      // setChosenProductForEdit();
   };

   // console.log(usersData);

   const columns = [
      { id: 1, title: 'ردیف', key: 'index' },
      {
         id: 2,
         title: 'نام',
         key: 'title',
         renderCell: data => (
            <div className="flex items-center justify-center gap-1">
               <img src={data.image} alt="product" className="h-9 w-9 rounded-full bg-[#f5f8fc] object-cover" />
               <p>{data.name}</p>
            </div>
         ),
      },
      {
         id: 3,
         title: 'شماره تماس',
         key: 'phone_number',
         renderCell: data => <p className="text-xs tracking-[1px]">{data.phone_number}</p>,
      },

      {
         id: 4,
         title: 'ماهیت',
         key: 'role',
         renderCell: data =>
            data?.role === 'super_admin'
               ? 'ادمین اصلی'
               : data?.role === 'admin'
                 ? 'ادمین انتخاب شده'
                 : data?.role === 'normal_user'
                   ? 'مشتری'
                   : null,
      },

      {
         id: 5,
         title: 'عملیات',
         key: 'actions',
         renderCell: data => (
            <div className="flex items-center justify-center gap-2">
               {data?.role === 'admin' && (
                  <IconButton
                     size="small"
                     onClick={() => {
                        // setChosenProductForEdit(data);
                        // setShowAddEditProductModal(true);
                     }}
                  >
                     <BorderColorOutlinedIcon fontSize="inherit" />
                  </IconButton>
               )}
               <IconButton
                  size="small"
                  onClick={() => {
                     // setChosenProductForEdit(data);
                     // setShowAddEditProductModal(true);
                  }}
               >
                  <BorderColorOutlinedIcon fontSize="inherit" />
               </IconButton>
               <IconButton
                  size="small"
                  onClick={() => {
                     // setChosenProductForDelete(data?.title);
                     // setShowDeleteProductModal(true);
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
                  onClick={() => {
                     setChosenCategory('');
                     setPageStatus(1);
                  }}
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
                  onClick={() => {
                     setChosenCategory('super_admin');
                     setPageStatus(1);
                  }}
               >
                  <div
                     className={`h-4 w-4 shrink-0 rounded-full ${
                        chosenCategory === 'super_admin'
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
                  onClick={() => {
                     setChosenCategory('admin');
                     setPageStatus(1);
                  }}
               >
                  <div
                     className={`h-4 w-4 shrink-0 rounded-full ${
                        chosenCategory === 'admin'
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
                  onClick={() => {
                     setChosenCategory('normal_user');
                     setPageStatus(1);
                  }}
               >
                  <div
                     className={`h-4 w-4 shrink-0 rounded-full ${
                        chosenCategory === 'normal_user'
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
         </div>

         <div className="mt-6 w-full bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
               <div className="flex items-center gap-1.5">
                  <QrCodeOutlinedIcon color="textColor" fontSize="small" />
                  <p className="font-bold">
                     {/* {t('Products list')} */}
                     لیست اشخاص
                  </p>
               </div>

               <Button
                  startIcon={<AddCircleOutlinedIcon />}
                  color="customPinkHigh"
                  onClick={() => setShowAddEditUserModal(true)}
               >
                  {/* {t('Add product')} */}
                  افزودن شخص
               </Button>
            </div>

            <div className="mx-auto mt-6 w-full">
               <Table
                  columns={columns}
                  rows={usersData?.result}
                  pageStatus={pageStatus}
                  setPageStatus={setPageStatus}
                  totalPages={usersData?.total_pages}
                  totalObjects={usersData?.total_objects}
                  loading={usersIsLoading}
                  countValue={countValue}
                  setCountValue={setCountValue}
               />
            </div>
         </div>

         <AddEditUserModal
            show={showAddEditUserModal}
            onClose={closeAddEditProductModalHandler}
            pageStatus={pageStatus}
            countValue={countValue}
            // isEdit={!!chosenProductForEdit}
            // detail={chosenProductForEdit}
            categoryTitle={chosenCategory}
         />
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
