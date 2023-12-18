import Image from 'next/image';

// MUI
import { Grid, Rating } from '@mui/material';

// Icons
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';

// Assets
import productSample from '@/assets/images/product-sample2.png';

function ProductDetail() {
   return (
      <div className="bg-[#fcf7f7] px-8 py-[60px] customMd:px-16">
         <div className="mb-10 flex items-center justify-between">
            <p className="text-2xl font-bold">کیف دستی مدل دیبا</p>
            <div className="flex items-center gap-5 text-xs">
               <p className="flex items-center gap-1 text-textColor">
                  <QuestionAnswerOutlinedIcon color="customPink" fontSize="small" /> 2دیدگاه
               </p>
               <p>
                  <Rating value={4} readOnly size="small" sx={{ color: '#D14D72' }} />
               </p>
               <div className="flex items-center gap-1 text-10">
                  <p>4.5</p>
                  <p className="text-textColor">( از ۳۰۰ نظر )</p>
               </div>
            </div>
         </div>
         <div>
            <Grid container columnSpacing={3}>
               <Grid item xs={12} md={7}>
                  <div className="h-[500px] w-full">
                     <Image src={productSample} alt="product" className="h-full w-full object-cover" />
                  </div>
               </Grid>
               <Grid item xs={12} md={5}>
                  <div className="flex flex-col gap-6">
                     <div className="h-[238px]">
                        <Image src={productSample} alt="product" className="h-full w-full object-cover" />
                     </div>
                     <div className="h-[238px]">
                        <Image src={productSample} alt="product" className="h-full w-full object-cover" />
                     </div>
                  </div>
               </Grid>
            </Grid>
         </div>
         <div className="mt-9 bg-white p-5">
            <div>
               <Grid container columnSpacing={3}>
                  <Grid item xs={12} md={7}>
                     <div>
                        <p className="flex items-center gap-2 text-xl font-bold text-customBlue">
                           <InfoOutlinedIcon /> درباره محصول
                        </p>
                        <p className="mt-4 text-sm text-customBlue">
                           ورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است،
                           چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی
                           تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در
                           شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها
                           شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی
                           ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط
                           سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچین
                        </p>
                        <div className="mt-14">
                           <p className="flex items-center gap-1 text-sm">
                              <ColorLensOutlinedIcon fontSize="small" color="customBlue" /> رنگ های موجود
                           </p>
                        </div>
                     </div>
                  </Grid>
                  <Grid item xs={12} md={5}>
                     <div className="">some</div>
                  </Grid>
               </Grid>
            </div>
         </div>
      </div>
   );
}

export default ProductDetail;

export async function getStaticPaths() {
   return {
      paths: [
         {
            params: {
               productTitle: 'کیف',
            },
         },
      ],
      fallback: 'blocking',
   };
}

export async function getStaticProps(context) {
   return {
      props: {
         messages: (await import(`../../messages/${context.locale}.json`)).default,
      },
   };
}
