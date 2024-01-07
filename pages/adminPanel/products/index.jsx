// Components
import AdminLayout from '@/components/layout/admin-layout/admin-layout';

function Products() {
   return (
      <AdminLayout>
         <div>Products</div>
      </AdminLayout>
   );
}

export default Products;

export async function getServerSideProps(context) {
   return {
      props: {
         messages: (await import(`../../../messages/${context.locale}.json`)).default,
      },
   };
}
