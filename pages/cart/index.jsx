import { useTranslations } from 'next-intl';

// MUI

// Icons
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';

// Components
import PaymentSummery from '@/components/pages/cart/payment-summery/payment-summery';
import BasketCard from '@/components/pages/cart/basket-card/basket-card';

function Cart() {
   const t = useTranslations('home');

   return (
      <div className="bg-[#fcf7f7] p-8 customMd:px-16 customLg:py-16">
         <div className="flex flex-col gap-6 customMd:flex-row">
            <div className="grow">
               <div className="rounded-2xl bg-white p-5">
                  <p className="flex items-center gap-2 text-customBlue">
                     <ShoppingBasketOutlinedIcon /> سبد خرید
                     <span className="flex h-6 w-6 items-center justify-center rounded-full bg-customPinkHigh text-sm text-white">
                        2
                     </span>
                  </p>
               </div>
               <div className="flex items-center gap-4 space-y-5 overflow-auto pb-5 customMd:mt-5 customMd:block customMd:pb-0">
                  <BasketCard hasDiscount />
                  <BasketCard />
                  <BasketCard />
               </div>
            </div>
            <div className="h-fit shrink-0 rounded-2xl bg-white p-5 customMd:w-[300px] customLg:w-[420px]">
               <PaymentSummery />
            </div>
         </div>
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
