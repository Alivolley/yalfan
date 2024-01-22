import Image from 'next/image';
import { useRouter } from 'next/router';

// MUI
import { Button } from '@mui/material';

// Icons
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import EastIcon from '@mui/icons-material/East';

// Assets
import CategoryCardStyle from './category-card.style';
import noImage from '@/assets/images/noImage.png';

function CategoryCard({ detail }) {
   const router = useRouter();

   return (
      <CategoryCardStyle
         href={`/categoryDetail?category=${detail?.title}`}
         className="w-[162px] shrink-0 rounded-2xl bg-white p-5 customMd:flex-1"
      >
         <div
            className="relative mb-5 flex h-[100px] items-center justify-center rounded-xl bg-[#F5F8FC] customMd:h-[180px]"
            id="categoryImage"
         >
            <Image src={detail?.cover || noImage} alt={detail?.title} className="object-contain" fill />
         </div>

         <Button
            fullWidth
            color="customBlue"
            startIcon={<LocalMallOutlinedIcon />}
            endIcon={router.locale === 'en' ? <EastIcon /> : <KeyboardBackspaceIcon />}
         >
            {detail?.title}
         </Button>
      </CategoryCardStyle>
   );
}

export default CategoryCard;
