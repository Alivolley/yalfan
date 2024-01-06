/* eslint-disable no-restricted-globals */
import { useTranslations } from 'next-intl';

// MUI
import { LoadingButton } from '@mui/lab';

// Icons
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

function PaymentSummery({ detail }) {
   const t = useTranslations('basket');

   console.log(detail);

   return (
      <div>
         <p className="flex items-center gap-1">
            <ErrorOutlineOutlinedIcon color="textColor" /> {t('Payment info')}
         </p>
         <div className="mb-5 mt-8 space-y-6 border-b border-solid border-[#E4EAF0] pb-5">
            <div className="flex items-center justify-between text-textColor">
               <p className="text-sm">{t('Products count')}</p>
               <p>
                  {detail?.all_orders_count} {t('Product')}
               </p>
            </div>
            <div className="flex items-center justify-between">
               <p className="text-sm text-textColor">{t('Products Price')}</p>
               <div className="flex items-center gap-1">
                  <p className="font-bold">{Number(detail?.before_discount_price).toLocaleString()}</p>
                  <p className="text-textColor">{t('unit')}</p>
               </div>
            </div>
            <div className="flex items-center justify-between text-[#F2485D]">
               <p className="text-sm">{t('Discount price')}</p>
               <p>
                  {(Number(detail?.before_discount_price) - Number(detail?.final_price)).toLocaleString()} {t('unit')}
               </p>
            </div>

            <div className="flex items-center justify-between">
               <p className="text-sm text-textColor">{t('Price after discount')}</p>
               <div className="flex items-center gap-1">
                  <p className="font-bold">{Number(detail?.final_price).toLocaleString()}</p>
                  <p className="text-textColor">{t('unit')}</p>
               </div>
            </div>
            <div className="flex items-center justify-between text-textColor">
               <p className="text-sm">{t('Shipping cost')}</p>
               <p>
                  {isNaN(detail?.shipping_cost) ? detail.shipping_cost : Number(detail?.shipping_cost).toLocaleString()}{' '}
                  {t('unit')}
               </p>
            </div>
         </div>
         <div className="mb-10 flex items-center justify-between">
            <p className="text-sm text-textColor">{t('Final price')}</p>
            <div className="flex items-center gap-1">
               <p className="font-bold">
                  {(Number(detail?.final_price) + Number(detail?.shipping_cost)).toLocaleString()}
               </p>
               <p className="text-textColor">{t('unit')}</p>
            </div>
         </div>

         <LoadingButton
            variant="contained"
            color="customPink"
            fullWidth
            size="large"
            className="!rounded-10 !py-3 !text-white"
         >
            {t('Continue the payment process')}
         </LoadingButton>
      </div>
   );
}

export default PaymentSummery;
