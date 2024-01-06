import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

// Redux
import { useSelector } from 'react-redux';

// MUI
import { Button, CircularProgress, IconButton } from '@mui/material';

// Icons
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

// Components
import Link from 'next/link';
import PaymentSummery from '@/components/pages/cart/payment-summery/payment-summery';
import BasketCard from '@/components/pages/cart/basket-card/basket-card';
import ConfirmModal from '@/components/templates/confirm-modal/confirm-modal';

// Apis
import useGetBasket from '@/apis/basket/useGetBasket';
import useDeleteBasket from '@/apis/basket/useDeleteBasket';

function Cart() {
   const [showDeleteBasketModal, setShowDeleteBasketModal] = useState(false);
   const [loading, setLoading] = useState(true);
   const isLogin = useSelector(state => state?.loginStatusReducer);

   const { data: basketData } = useGetBasket(isLogin);
   const { trigger: deleteBasketTrigger, isMutating: deleteBasketIsMutating } = useDeleteBasket();

   const t = useTranslations('basket');

   useEffect(() => {
      if (basketData) {
         setLoading(false);
      }
   }, [basketData]);

   const deleteBasketHandler = () => {
      deleteBasketTrigger(null, {
         onSuccess: () => {
            setShowDeleteBasketModal(false);
         },
      });
   };

   return (
      <div className="bg-[#fcf7f7] p-8 customMd:px-16 customLg:py-16">
         {loading ? (
            <div className="my-12 flex w-full items-center justify-center">
               <CircularProgress color="customPink" />
            </div>
         ) : basketData?.all_orders_count ? (
            <div className="flex flex-col gap-6 customMd:flex-row">
               <div className="grow">
                  <div className="flex items-center justify-between rounded-2xl bg-white p-5">
                     <p className="flex items-center gap-2 text-customBlue">
                        <ShoppingBasketOutlinedIcon /> {t('Basket')}
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-customPinkHigh text-sm text-white">
                           {basketData?.all_orders_count}
                        </span>
                     </p>
                     <IconButton sx={{ border: '1px solid #626e945e' }} onClick={() => setShowDeleteBasketModal(true)}>
                        <DeleteOutlineOutlinedIcon color="textColor" />
                     </IconButton>
                  </div>
                  <div className="flex items-center gap-4 space-y-5 overflow-auto pb-5 customMd:mt-5 customMd:block customMd:pb-0">
                     {basketData?.orders?.map(item => (
                        <BasketCard
                           key={`${item?.product_color_id}-${item?.product_color?.product_id}`}
                           detail={item}
                        />
                     ))}
                  </div>
               </div>
               <div className="h-fit shrink-0 rounded-2xl bg-white p-5 customMd:w-[300px] customLg:w-[420px]">
                  <PaymentSummery detail={basketData} />
               </div>
            </div>
         ) : (
            <div className="mt-5 flex flex-col items-center justify-center gap-4 rounded-10 bg-white px-5 py-10">
               <p className="text-center text-lg text-textColor">{t('Your basket is empty')}</p>
               <p className="text-center text-2xl font-bold">{t('Proceed to buy now')} 😀</p>
               <Link href="/categoryDetail" className="mt-4">
                  <Button color="customPink" variant="contained" className="!px-16 !text-white">
                     {t('Shop')}
                  </Button>
               </Link>
            </div>
         )}

         <ConfirmModal
            open={showDeleteBasketModal}
            closeModal={() => setShowDeleteBasketModal(false)}
            title={t('Are you sure to delete the entire shopping cart?')}
            confirmHandler={deleteBasketHandler}
            confirmLoading={deleteBasketIsMutating}
         />
      </div>
   );
}

export default Cart;

export async function getStaticProps(context) {
   return {
      props: {
         messages: (await import(`../../messages/${context.locale}.json`)).default,
      },
   };
}
