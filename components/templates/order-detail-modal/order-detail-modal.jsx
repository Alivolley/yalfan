import { useTranslations } from 'next-intl';

// MUI
import { Dialog, IconButton } from '@mui/material';

// Icons
import CloseIcon from '@mui/icons-material/Close';
import TopicOutlinedIcon from '@mui/icons-material/TopicOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ReplayIcon from '@mui/icons-material/Replay';
import Link from 'next/link';

function OrderDetailModal({ show, onClose, detail, locale }) {
   const t = useTranslations('orders');

   return (
      <Dialog open={show} onClose={onClose} fullWidth dir={locale === 'en' ? 'ltr' : 'rtl'}>
         <div className="p-3 customMd:p-5">
            <div className="mb-2 flex items-center justify-between border-b border-solid border-[#E4EAF0] pb-2">
               <div className="flex items-center gap-1 font-bold">
                  <TopicOutlinedIcon fontSize="small" />
                  <p>{t('Order detail')}</p>
               </div>
               <IconButton onClick={onClose}>
                  <CloseIcon />
               </IconButton>
            </div>
            <div className="space-y-4">
               <div className="space-y-4 rounded-sm bg-[#F5F8FC] p-4 text-sm">
                  <div className="flex items-center justify-between gap-1">
                     <p className="text-textColor">{t('Order status')} :</p>
                     {detail?.status === 'sending' ? (
                        <div className="flex items-center gap-2 rounded-lg bg-[#FF9F1C] p-2 text-xs text-white">
                           <LocalShippingOutlinedIcon fontSize="small" />
                           <p>{t('Sending')}</p>
                        </div>
                     ) : detail?.status === 'delivered' ? (
                        <div className="flex items-center gap-2 rounded-lg bg-[#2EC4B6] p-2 text-xs text-white">
                           <CheckCircleOutlinedIcon fontSize="small" />
                           <p>{t('Delivered')}</p>
                        </div>
                     ) : detail?.status === 'returned' ? (
                        <div className="flex items-center gap-2 rounded-lg bg-[#CBB464] p-2 text-xs text-white">
                           <ReplayIcon fontSize="small" />
                           <p>{t('Returned')}</p>
                        </div>
                     ) : null}
                  </div>
                  <div className="flex items-center justify-between gap-1">
                     <p className="text-textColor">{t('Order code')} :</p>
                     <p>{detail?.order_code}</p>
                  </div>
                  <div className="flex items-center justify-between gap-1">
                     <p className="text-textColor">{t('Order registration date')} :</p>
                     <p>{detail?.pay_time?.slice(0, 10)}</p>
                  </div>
                  <div className="flex items-center justify-between gap-1">
                     <p className="text-textColor">{t('Products count')} :</p>
                     <p>{detail?.orders?.length}</p>
                  </div>
               </div>
               <div className="space-y-4 rounded-sm bg-[#F5F8FC] p-4 text-sm">
                  <div className="flex items-center justify-between gap-1">
                     <p className="text-textColor">{t('Receiver')} :</p>
                     <p>علی ازقندی</p>
                  </div>
                  <div className="flex items-center justify-between gap-1">
                     <p className="text-textColor">{t('Phone number')} :</p>
                     <p>098386565165</p>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-1">
                     <p className="text-textColor">{t('Receiver address')} :</p>
                     <p>مشهد بلوار سرافرازان سرفرازان ۱۰ پلاک ۴</p>
                  </div>
                  <div className="!mt-6 flex items-center justify-between gap-1">
                     <p className="text-textColor">{t('The total amount')} :</p>
                     <p className="text-base font-bold text-[#B1302E]">
                        {Number(detail?.final_price).toLocaleString()} {t('unit')}
                     </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-1">
                     <p className="text-textColor">{t('Order description')} :</p>
                     <p>{detail?.order_description}</p>
                  </div>
               </div>

               <div className="rounded-sm px-4 py-2 text-sm">
                  <div className="space-y-2">
                     <p className="text-textColor">{t('Products')} :</p>
                     <div className="flex flex-wrap items-center justify-end gap-3">
                        {detail?.orders?.map(item => (
                           <Link
                              href={`/productDetail/${item?.product_color?.product_title}`}
                              className="aspect-square w-16 rounded-md bg-[#F5F8FC] p-1 customMd:w-24"
                              key={item?.product_color?.product_id}
                           >
                              <img
                                 src={item?.product_color?.cover}
                                 alt="order"
                                 className="h-full w-full object-cover"
                              />
                           </Link>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Dialog>
   );
}

export default OrderDetailModal;
