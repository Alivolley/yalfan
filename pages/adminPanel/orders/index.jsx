// Components
import AdminLayout from '@/components/layout/admin-layout/admin-layout';

function Orders() {
   return (
      <AdminLayout>
         <div>Products</div>
      </AdminLayout>
   );
}

export default Orders;

export async function getServerSideProps(context) {
   return {
      props: {
         messages: (await import(`../../../messages/${context.locale}.json`)).default,
      },
   };
}
