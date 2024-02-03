import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

// Redux
import { useSelector } from 'react-redux';

// Assets
import emptyFavoritesPic from '@/assets/images/empty-favorites.png';

// Components
import ProfileLayout from '@/components/layout/profile-layout/profile-layout';
import ProductCard from '@/components/templates/product-card/product-card';

// Apis
import useGetFavorites from '@/apis/favorites/useGetFavorites';

function Favorites() {
   const t = useTranslations('profile');
   const isLogin = useSelector(state => state?.loginStatusReducer);
   const { locale } = useRouter();

   const { data: favoritesData, isLoading: favoritesIsLoading } = useGetFavorites(isLogin);

   return (
      <ProfileLayout>
         <Head>
            <title>{locale === 'fa' ? `یلفان - علاقه مندی ها` : `Yalfan-favorites`}</title>
         </Head>
         <div>
            <div className="flex items-center gap-2 rounded-2xl bg-white p-7">
               <p className="text-lg font-bold text-[#050F2C]">{t('Your favorites list')}</p>
               {!favoritesIsLoading && favoritesData?.length ? (
                  <p className="flex size-6 items-center justify-center rounded-full bg-[#D14F4D] text-white">
                     {favoritesData?.length}
                  </p>
               ) : null}
            </div>
            <div className="mt-6">
               {favoritesData?.length ? (
                  <div className="flex flex-wrap items-center justify-center gap-2 customMd:justify-start customMd:gap-5">
                     {favoritesData?.map(item => (
                        <ProductCard key={item.id} detail={item} />
                     ))}
                  </div>
               ) : (
                  <div className="mt-14 space-y-5">
                     <p className="text-center text-sm font-bold customMd:text-lg">
                        {t('Your favorites list is empty')}
                     </p>
                     <div className="mx-auto w-[300px]">
                        <Image src={emptyFavoritesPic} alt="empty" className="size-full" />
                     </div>
                  </div>
               )}
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
