import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import Head from 'next/head';

// MUI
import { IconButton } from '@mui/material';

// Icons
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';

// Components
import AdminLayout from '@/components/layout/admin-layout/admin-layout';
import Table from '@/components/templates/table/table';
import EditTicketModal from '@/components/pages/adminPanel/editTicketModal/editTicketModal';

// Apis
import useGetTickets from '@/apis/pAdmin/tickets/useGetTickets';

function Tickets() {
   const [pageStatus, setPageStatus] = useState(1);
   const [countValue, setCountValue] = useState(6);
   const [chosenTicketForEdit, setChosenTicketForEdit] = useState();
   const [showEditTicketModal, setShowEditTicketModal] = useState(false);
   const { locale } = useRouter();
   const t = useTranslations('adminPanelTickets');

   const closeEditStatusModal = () => {
      setShowEditTicketModal(false);
      setChosenTicketForEdit();
   };

   const {
      data: ticketsList,
      isLoading: ticketsIsLoading,
      mutate: ticketsMutate,
   } = useGetTickets(pageStatus, countValue);

   const columns = [
      { id: 1, title: t('Row'), key: 'index' },
      { id: 2, title: t('Name'), key: 'first_name' },
      { id: 3, title: t('FullName'), key: 'last_name' },
      { id: 4, title: t('Phone number'), key: 'phone_number' },
      {
         id: 5,
         title: t('Status'),
         key: 'Status',
         renderCell: data =>
            data?.has_seen ? (
               <p className="text-green-500">{t('Read')}</p>
            ) : (
               <p className="text-customPinkHigh">{t('Not read')}</p>
            ),
      },
      {
         id: 6,
         title: t('Actions'),
         key: 'actions',
         renderCell: data => (
            <IconButton
               size="small"
               onClick={() => {
                  setChosenTicketForEdit(data);
                  setShowEditTicketModal(true);
               }}
            >
               <BorderColorOutlinedIcon fontSize="inherit" />
            </IconButton>
         ),
      },
   ];

   return (
      <AdminLayout>
         <Head>
            <title>{locale === 'fa' ? `یلفان - پنل ادمین` : `Yalfan-admin panel`}</title>
         </Head>

         <div className="w-full bg-white p-5">
            <div className="flex items-center gap-1.5">
               <ConfirmationNumberOutlinedIcon color="textColor" fontSize="small" />
               <p className="font-bold">{t('Tickets list')}</p>
            </div>
            <div className="mx-auto mt-10 w-full">
               <Table
                  columns={columns}
                  rows={ticketsList?.result}
                  pageStatus={pageStatus}
                  setPageStatus={setPageStatus}
                  totalPages={ticketsList?.total_pages}
                  totalObjects={ticketsList?.total_objects}
                  loading={ticketsIsLoading}
                  countValue={countValue}
                  setCountValue={setCountValue}
               />
            </div>
         </div>

         <EditTicketModal
            show={showEditTicketModal}
            onClose={closeEditStatusModal}
            detail={chosenTicketForEdit}
            ticketsMutate={ticketsMutate}
         />
      </AdminLayout>
   );
}

export default Tickets;

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
