import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

// MUI
import { Dialog, Grid, IconButton } from '@mui/material';

// Icons
import CloseIcon from '@mui/icons-material/Close';
import TopicOutlinedIcon from '@mui/icons-material/TopicOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ReplayIcon from '@mui/icons-material/Replay';
import MoneyOffCsredOutlinedIcon from '@mui/icons-material/MoneyOffCsredOutlined';

// Assets
import noImage from '@/assets/images/noImage.png';

function OrderDetailModal({ show, onClose, detail, locale }) {
   const t = useTranslations('orders');

   return (
      <Dialog open={show} onClose={onClose} fullWidth dir={locale === 'en' ? 'ltr' : 'rtl'}>
         <div className="relative p-3 pt-0 customMd:p-5">
            <div className="sticky top-0 mb-2 flex items-center justify-between border-b border-solid border-[#E4EAF0] bg-white py-2">
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
                     ) : detail?.status === 'unpaid' ? (
                        <div className="flex items-center gap-1 rounded-lg bg-[#F03A50] p-2 text-xs text-white">
                           <MoneyOffCsredOutlinedIcon fontSize="small" />
                           <p>{t('Unpaid')}</p>
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
                     <p>{detail?.all_orders_count}</p>
                  </div>
               </div>

               <div className="space-y-4 rounded-sm bg-[#F5F8FC] p-4 text-sm">
                  <div className="flex items-center justify-between gap-1">
                     <p className="text-textColor">{t("Orderer's name")} :</p>
                     <p>{detail?.user?.name}</p>
                  </div>
                  <div className="flex items-center justify-between gap-1">
                     <p className="text-textColor">{t("Orderer's phone number")} :</p>
                     <p>{detail?.user?.phone_number}</p>
                  </div>
               </div>

               <div className="space-y-4 rounded-sm bg-[#F5F8FC] p-4 text-sm">
                  <div className="flex items-center justify-between gap-1">
                     <p className="text-textColor">{t('Receiver name')} :</p>
                     <p>{detail?.address?.recipient_name}</p>
                  </div>
                  <div className="flex items-center justify-between gap-1">
                     <p className="text-textColor">{t('Post code')} :</p>
                     <p>{detail?.address?.postal_code}</p>
                  </div>
                  <div className="flex items-center justify-between gap-1">
                     <p className="text-textColor">{t('Receiver phone number')} :</p>
                     <p>{detail?.address?.phone_number}</p>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-1">
                     <p className="text-textColor">{t('Receiver address')} :</p>
                     <p>{detail?.address?.address}</p>
                  </div>
               </div>

               <div className="space-y-4 rounded-sm bg-[#F5F8FC] p-4 text-sm">
                  <div className="flex items-center justify-between gap-1">
                     <p className="text-textColor">{t('Discount code')} :</p>
                     <p>{detail?.percentage_discount_code || t('None')}</p>
                  </div>

                  <div className="flex items-center justify-between gap-1">
                     <p className="text-textColor">{t('Price without discount')} :</p>
                     <p>
                        {Number(detail?.before_discount_price).toLocaleString()} {t('unit')}
                     </p>
                  </div>
                  <div className="flex items-center justify-between gap-1">
                     <p className="text-textColor">{t('Shipping cost')} :</p>
                     <p>
                        {
                           // eslint-disable-next-line no-restricted-globals
                           isNaN(detail?.shipping_cost) ? t('Handled') : Number(detail?.shipping_cost).toLocaleString()
                        }{' '}
                        {t('unit')}
                     </p>
                  </div>
                  <div className="!mt-6 flex items-center justify-between gap-1">
                     <p className="text-textColor">{t('Final price')} :</p>
                     <p className="text-base font-bold text-[#B1302E]">
                        {Number(detail?.final_price).toLocaleString()} {t('unit')}
                     </p>
                  </div>
               </div>

               <div className="space-y-4 rounded-sm bg-[#F5F8FC] p-4 text-sm">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                     <p className="text-textColor">{t('Order description')} :</p>
                     <p>{detail?.order_description}</p>
                  </div>
               </div>

               <div className="rounded-sm px-4 py-2 text-sm">
                  <div className="space-y-5">
                     <p className="text-textColor">{t('Products')} :</p>
                     <div className="flex flex-wrap items-center justify-end gap-3">
                        <Grid container spacing={2}>
                           {detail?.orders?.map(item => (
                              <Grid item xs={12} sm={6} key={item?.product_color?.product_id}>
                                 <Link
                                    href={`/productDetail/${item?.product_color?.product_title}`}
                                    className="flex gap-1.5 rounded-md bg-[#F5F8FC] p-1.5"
                                 >
                                    <div className="relative my-auto h-[60px] w-[60px] rounded-md bg-[#F5F8FC]">
                                       <Image
                                          src={item?.product_color?.cover || noImage}
                                          alt="order"
                                          className="rounded-md object-cover"
                                          fill
                                       />
                                    </div>

                                    <div className="grow">
                                       <p className="text-xs font-bold">{item?.product_color?.product_title}</p>
                                       <div className="mt-0.5 flex flex-wrap items-center justify-between">
                                          <p className="text-[11px] text-textColor">{t('Count')} :</p>
                                          <p className="text-[11px]">{item?.count}</p>
                                       </div>
                                       <div className="mt-0.5 flex flex-wrap items-center justify-between">
                                          <p className="text-[11px] text-textColor">{t('Color')} :</p>
                                          <div
                                             className="h-4 w-4 rounded-full"
                                             style={{ backgroundColor: item?.product_color?.product_color }}
                                          />
                                       </div>
                                       <div className="mt-0.5 flex flex-wrap items-center justify-between">
                                          <p className="text-[11px] text-textColor">{t('Total price')} :</p>
                                          <p className="text-[11px]">
                                             {Number(item?.total_price).toLocaleString()} {t('unit')}
                                          </p>
                                       </div>
                                    </div>
                                 </Link>
                              </Grid>
                           ))}
                        </Grid>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Dialog>
   );
}

export default OrderDetailModal;
