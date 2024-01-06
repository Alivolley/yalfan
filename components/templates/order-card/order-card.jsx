import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

// MUI
import { Button } from '@mui/material';

// Icon
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ReplayIcon from '@mui/icons-material/Replay';
import EastIcon from '@mui/icons-material/East';

// Components
import OrderDetailModal from '../order-detail-modal/order-detail-modal';

function OrderCard({ detail }) {
   const [showDetailModal, setShowDetailModal] = useState(false);
   const { locale } = useRouter();
   const t = useTranslations('orders');

   return (
      <div className="rounded-2xl border border-solid border-[#E4EAF0] p-3 customMd:p-6">
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-0.5 text-sm customMd:text-base">
               <p className="text-textColor">{t('Products count')} : </p>
               <p className="text-[#050F2C]">{detail?.orders?.length}</p>
            </div>
            {detail?.status === 'sending' ? (
               <div className="flex items-center gap-2 rounded-lg bg-[#FF9F1C] p-2 text-sm text-white">
                  <LocalShippingOutlinedIcon fontSize="small" />
                  <p>{t('Sending')}</p>
               </div>
            ) : detail?.status === 'delivered' ? (
               <div className="flex items-center gap-2 rounded-lg bg-[#2EC4B6] p-2 text-sm text-white">
                  <CheckCircleOutlinedIcon fontSize="small" />
                  <p>{t('Delivered')}</p>
               </div>
            ) : detail?.status === 'returned' ? (
               <div className="flex items-center gap-2 rounded-lg bg-[#CBB464] p-2 text-sm text-white">
                  <ReplayIcon fontSize="small" />
                  <p>{t('Returned')}</p>
               </div>
            ) : null}
         </div>

         <div className="my-7 flex flex-wrap items-start justify-between gap-5 border-b border-dashed border-[#336CA4] pb-7">
            <div className="space-y-3 text-[15px] customSm:shrink-0">
               <div className="flex items-center gap-0.5 text-sm customMd:text-base">
                  <p className="text-textColor">{t('Order registration date')} :</p>
                  <p className="text-[#050F2C]">{detail?.pay_time?.slice(0, 10)}</p>
               </div>
               <div className="flex items-center gap-0.5 text-sm customMd:text-base">
                  <p className="text-textColor">{t('The total amount')} :</p>
                  <p className="font-bold text-[#024A90]">
                     {Number(detail?.final_price).toLocaleString()} {t('unit')}
                  </p>
               </div>
            </div>
            <div className="flex flex-wrap items-center justify-end gap-3">
               {detail?.orders?.map(item => (
                  <Link
                     href={`/productDetail/${item?.product_color?.product_title}`}
                     className="aspect-square w-16 rounded-md bg-[#F5F8FC] p-1 customMd:w-24"
                     key={crypto.randomUUID()}
                  >
                     <img src={item?.product_color?.cover} alt="order" className="h-full w-full object-cover" />
                  </Link>
               ))}
            </div>
         </div>

         <Button
            fullWidth
            endIcon={<EastIcon className={locale === 'en' ? '' : '!rotate-180'} fontSize="small" />}
            className="!text-[#626E94]"
            onClick={() => setShowDetailModal(true)}
         >
            {t('Show order detail')}
         </Button>

         <OrderDetailModal
            locale={locale}
            show={showDetailModal}
            onClose={() => setShowDetailModal(false)}
            detail={detail}
         />
      </div>
   );
}

export default OrderCard;
