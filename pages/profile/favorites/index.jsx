import { useTranslations } from 'next-intl';

// Components
import ProfileLayout from '@/components/layout/profile-layout/profile-layout';

function Favorites() {
   const t = useTranslations('profile');

   return (
      <ProfileLayout>
         <div>
            <div className="flex items-center gap-2 rounded-2xl bg-white p-7">
               <p className="text-lg font-bold text-[#050F2C]">
                  لیست علاقه مندی های شما
                  {/* {t('List of your addresses')} */}
               </p>
               {/* {!addressIsLoading && addressData?.total_objects ? ( */}
               <p className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D14F4D] text-white">
                  {/* {addressData?.total_objects} */}5
               </p>
               {/* // ) : null} */}
            </div>
         </div>
      </ProfileLayout>
   );
}

export default Favorites;

export async function getStaticProps(context) {
   return {
      props: {
         messages: (await import(`../../../messages/${context.locale}.json`)).default,
      },
   };
}
