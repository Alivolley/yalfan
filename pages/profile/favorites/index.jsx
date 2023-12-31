// Components
import ProfileLayout from '@/components/layout/profile-layout/profile-layout';

function Favorites() {
   return <ProfileLayout>Favorites</ProfileLayout>;
}

export default Favorites;

export async function getStaticProps(context) {
   return {
      props: {
         messages: (await import(`../../../messages/${context.locale}.json`)).default,
      },
   };
}
