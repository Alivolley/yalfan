import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

// MUI
import { Grid } from '@mui/material';

// Icons
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

// Assets
import samplePic from '@/assets/images/samplePic.jpg';

function BoldProducts() {
   const router = useRouter();

   return (
      <div className="px-8 py-[70px] customMd:px-16">
         <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
               <Link href="/" className="flex flex-col rounded-2xl border border-solid border-[#E4EAF0]">
                  <div className="">
                     <Image
                        src={samplePic}
                        alt="bold product"
                        className="aspect-[10/7] h-full w-full rounded-t-2xl customMd:aspect-[10/8]"
                     />
                  </div>

                  <p className="flex items-center gap-2 px-7 py-4">
                     ست پاییزه یلفان {router?.locale === 'en' ? <KeyboardArrowRightIcon /> : <KeyboardArrowLeftIcon />}
                  </p>
               </Link>
            </Grid>
            <Grid item xs={12} md={4}>
               <Link href="/" className="flex flex-col rounded-2xl border border-solid border-[#E4EAF0]">
                  <div className="">
                     <Image
                        src={samplePic}
                        alt="bold product"
                        className="aspect-[10/7] h-full w-full rounded-t-2xl customMd:aspect-[10/8]"
                     />
                  </div>

                  <p className="flex items-center gap-2 px-7 py-4">
                     ست پاییزه یلفان {router?.locale === 'en' ? <KeyboardArrowRightIcon /> : <KeyboardArrowLeftIcon />}
                  </p>
               </Link>
            </Grid>
            <Grid item xs={12} md={4}>
               <Link href="/" className="flex flex-col rounded-2xl border border-solid border-[#E4EAF0]">
                  <div className="">
                     <Image
                        src={samplePic}
                        alt="bold product"
                        className="aspect-[10/7] h-full w-full rounded-t-2xl customMd:aspect-[10/8]"
                     />
                  </div>

                  <p className="flex items-center gap-2 px-7 py-4">
                     ست پاییزه یلفان {router?.locale === 'en' ? <KeyboardArrowRightIcon /> : <KeyboardArrowLeftIcon />}
                  </p>
               </Link>
            </Grid>
         </Grid>
      </div>
   );
}

export default BoldProducts;
