import { useTranslations } from 'next-intl';

// MUI
import { LoadingButton } from '@mui/lab';

// Icons
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

function PaymentSummery() {
   const t = useTranslations('home');

   return (
      <div>
         <p className="flex items-center gap-1">
            <ErrorOutlineOutlinedIcon color="textColor" /> اطلاعات پرداخت
         </p>
         <div className="mb-5 mt-8 space-y-6 border-b border-solid border-[#E4EAF0] pb-5">
            <div className="flex items-center justify-between">
               <p className="text-sm text-textColor">مبلغ کالاها</p>
               <div className="flex items-center gap-1">
                  <p className="font-bold">{Number(150000).toLocaleString()}</p>
                  <p className="text-textColor">{t('unit')}</p>
               </div>
            </div>
            <div className="flex items-center justify-between text-textColor">
               <p className="text-sm">تعداد محصولات</p>
               <p>23 محصول</p>
            </div>
            <div className="flex items-center justify-between text-[#F2485D]">
               <p>تخفیف ها</p>
               <p>
                  {Number(30000).toLocaleString()} {t('unit')}
               </p>
            </div>
            <div className="flex items-center justify-between text-textColor">
               <p className="text-sm">هزینه ارسال</p>
               <p>
                  {Number(150000).toLocaleString()} {t('unit')}
               </p>
            </div>
         </div>
         <div className="mb-10 flex items-center justify-between">
            <p className="text-sm text-textColor">هزینه ارسال</p>
            <div className="flex items-center gap-1">
               <p className="font-bold">{Number(480000).toLocaleString()}</p>
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
            ادامه فرایند پرداخت
         </LoadingButton>
      </div>
   );
}

export default PaymentSummery;
