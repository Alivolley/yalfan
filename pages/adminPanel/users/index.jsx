import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

// Redux
import { useSelector } from 'react-redux';

// MUI
import { Button, IconButton } from '@mui/material';

// Icons
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import QrCodeOutlinedIcon from '@mui/icons-material/QrCodeOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

// Components
import AdminLayout from '@/components/layout/admin-layout/admin-layout';
import Table from '@/components/templates/table/table';
import AddEditUserModal from '@/components/pages/adminPanel/addEditUserModal/addEditUserModal';
import ConfirmModal from '@/components/templates/confirm-modal/confirm-modal';
import UserDetailModal from '@/components/pages/adminPanel/userDetailModal/userDetailModal';

// Apis
import useGetAllUsers from '@/apis/pAdmin/users/useGetAllUsers';
import useBlockUser from '@/apis/pAdmin/users/useBlockUser';

function Users() {
   const [chosenCategory, setChosenCategory] = useState('');
   const [pageStatus, setPageStatus] = useState(1);
   const [countValue, setCountValue] = useState(6);
   const [showAddEditUserModal, setShowAddEditUserModal] = useState(false);
   const [chosenUserForEdit, setChosenUserForEdit] = useState();
   const [showBlockUserModal, setShowBlockUserModal] = useState(false);
   const [chosenUserForBlock, setChosenUserForBlock] = useState();
   const [showUserDetailModal, setShowUserDetailModal] = useState(false);
   const [chosenUserForDetail, setChosenUserForDetail] = useState();

   const t = useTranslations('adminPanelUsers');
   const { locale, back, pathname } = useRouter();
   const userInfo = useSelector(state => state?.userInfoReducer);

   const {
      data: usersData,
      isLoading: usersIsLoading,
      mutate: usersMutate,
   } = useGetAllUsers(pageStatus, countValue, chosenCategory);
   const { trigger: blockTrigger, isMutating: blockIsMutating } = useBlockUser();

   const closeAddEditProductModalHandler = () => {
      setShowAddEditUserModal(false);
      setChosenUserForEdit();
   };

   const closeBlockUserModal = () => {
      setShowBlockUserModal(false);
      setChosenUserForBlock();
   };

   const closeUserDetailModal = () => {
      setShowUserDetailModal(false);
      setChosenUserForDetail();
   };

   const blockUnBlockHandler = () => {
      blockTrigger(
         { phone_number: chosenUserForBlock?.phone_number, active: chosenUserForBlock?.role === 'blocked' },
         {
            onSuccess: () => {
               usersMutate();
               closeBlockUserModal();
            },
         }
      );
   };

   useEffect(() => {
      if (chosenUserForDetail) {
         const founded = usersData?.result?.find(item => item?.phone_number === chosenUserForDetail?.phone_number);
         setChosenUserForDetail(founded);
      }
   }, [usersData]);

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
            <div className="flex items-center justify-center gap-1">
               <img src={data.image} alt="product" className="h-9 w-9 rounded-full bg-[#f5f8fc] object-cover" />
               <p>{data.name}</p>
            </div>
         ),
      },
      {
         id: 3,
         title: t('Phone number'),
         key: 'phone_number',
         renderCell: data => (
            <p className={`text-xs tracking-[1px] ${data?.role === 'blocked' ? 'text-customPinkHigh' : ''}`}>
               {data.phone_number}
            </p>
         ),
      },

      {
         id: 4,
         title: t('Role'),
         key: 'role',
         renderCell: data =>
            data?.role === 'super_admin' ? (
               t('Main admin')
            ) : data?.role === 'admin' ? (
               t('Chosen admin')
            ) : data?.role === 'normal_user' ? (
               t('Customer')
            ) : data?.role === 'blocked' ? (
               <p className="font-bold text-customPinkHigh">{t('Blocked')}</p>
            ) : null,
      },

      {
         id: 5,
         title: t('Actions'),
         key: 'actions',
         renderCell: data => (
            <div className="flex items-center justify-center gap-2">
               <IconButton
                  size="small"
                  onClick={() => {
                     setChosenUserForEdit(data);
                     setShowAddEditUserModal(true);
                  }}
               >
                  <PersonAddAltOutlinedIcon fontSize="inherit" />
               </IconButton>

               <IconButton
                  size="small"
                  onClick={() => {
                     setChosenUserForDetail(data);
                     setShowUserDetailModal(true);
                  }}
               >
                  <BorderColorOutlinedIcon fontSize="inherit" />
               </IconButton>

               <IconButton
                  size="small"
                  onClick={() => {
                     setChosenUserForBlock(data);
                     setShowBlockUserModal(true);
                  }}
               >
                  {data?.role === 'blocked' ? (
                     <RemoveCircleIcon fontSize="small" color="error" />
                  ) : (
                     <BlockOutlinedIcon fontSize="small" />
                  )}
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
               <p className="font-bold">{t('Users')}</p>
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
                  <p>{t('All users')}</p>
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
                  <p>{t('Main admin')}</p>
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
                  <p>{t('Chosen admin')}</p>
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
                  <p>{t('Customer')}</p>
               </Button>

               <Button
                  className="!flex !min-w-0 !items-center !gap-1 !p-0 !text-xs customMd:!text-sm"
                  color="black"
                  onClick={() => {
                     setChosenCategory('blocked');
                     setPageStatus(1);
                  }}
               >
                  <div
                     className={`h-4 w-4 shrink-0 rounded-full ${
                        chosenCategory === 'blocked'
                           ? 'border-[3px] border-solid border-[#E4EAF0] bg-customPinkHigh'
                           : 'bg-[#E4EAF0]'
                     }`}
                  />
                  <p>{t('Blocked')}</p>
               </Button>
            </div>
         </div>

         <div className="mt-6 w-full bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
               <div className="flex items-center gap-1.5">
                  <QrCodeOutlinedIcon color="textColor" fontSize="small" />
                  <p className="font-bold">{t('Users list')}</p>
               </div>

               <Button
                  startIcon={<AddCircleOutlinedIcon />}
                  color="customPinkHigh"
                  onClick={() => setShowAddEditUserModal(true)}
               >
                  {t('Add user')}
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
            isEdit={!!chosenUserForEdit}
            detail={chosenUserForEdit}
            usersMutate={usersMutate}
         />

         <UserDetailModal
            show={showUserDetailModal}
            onClose={closeUserDetailModal}
            detail={chosenUserForDetail}
            usersMutate={usersMutate}
         />

         <ConfirmModal
            open={showBlockUserModal}
            closeModal={closeBlockUserModal}
            title={
               chosenUserForBlock?.role !== 'blocked'
                  ? t('Are you sure about blocking this user?')
                  : t('Are you sure about Unblocking this user?')
            }
            confirmHandler={blockUnBlockHandler}
            confirmLoading={blockIsMutating}
         />
      </AdminLayout>
   );
}

export default Users;

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
