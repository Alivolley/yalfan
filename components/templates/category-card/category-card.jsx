import { useRouter } from 'next/router';
import Image from 'next/image';

// MUI
import { Button } from '@mui/material';

// Icons
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import EastIcon from '@mui/icons-material/East';

// Assets
import productSample from '@/assets/images/product-sample.png';
import CategoryCardStyle from './category-card.style';

function CategoryCard() {
   const router = useRouter();

   return (
      <CategoryCardStyle href="/" className="w-[162px] shrink-0 rounded-2xl bg-white p-5 customMd:flex-1">
         <div
            className="mb-5 flex h-[100px] items-center justify-center rounded-xl bg-[#F5F8FC] customMd:h-[180px]"
            id="categoryImage"
         >
            <Image src={productSample} alt="product" className="h-full w-full object-contain" />
         </div>

         <Button
            className="!whitespace-nowrap"
            fullWidth
            color="customBlue"
            startIcon={<LocalMallOutlinedIcon />}
            endIcon={router.locale === 'en' ? <EastIcon /> : <KeyboardBackspaceIcon />}
         >
            کیف دستی
         </Button>
      </CategoryCardStyle>
   );
}

export default CategoryCard;
