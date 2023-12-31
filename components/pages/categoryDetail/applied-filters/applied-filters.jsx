import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';

// Icons
import CloseIcon from '@mui/icons-material/Close';

// MUI
import { Button } from '@mui/material';

function AppliedFilters() {
   const { query, push } = useRouter();
   const t = useTranslations('categoryDetail');

   const removeFilter = propName => {
      delete query[propName];
      const newQuery = { ...query };
      push({
         query: {
            ...newQuery,
         },
      });
   };

   return (
      <div className="flex flex-wrap gap-3">
         {query?.ordering && (
            <Button
               color="customPinkLow"
               size="small"
               variant="contained"
               className="!text-xs !text-[#B1302E]"
               endIcon={<CloseIcon />}
               onClick={() => removeFilter('ordering')}
            >
               {t('Sorting')}
            </Button>
         )}
         {query?.category && (
            <Button
               color="customPinkLow"
               size="small"
               variant="contained"
               className="!text-xs !text-[#B1302E]"
               endIcon={<CloseIcon />}
               onClick={() => removeFilter('category')}
            >
               {t('Categories')}
            </Button>
         )}
         {query?.price && (
            <Button
               color="customPinkLow"
               size="small"
               variant="contained"
               className="!text-xs !text-[#B1302E]"
               endIcon={<CloseIcon />}
               onClick={() => removeFilter('price')}
            >
               {t('Price range')}
            </Button>
         )}
         {query?.available && (
            <Button
               color="customPinkLow"
               size="small"
               variant="contained"
               className="!text-xs !text-[#B1302E]"
               endIcon={<CloseIcon />}
               onClick={() => removeFilter('available')}
            >
               {t('available')}
            </Button>
         )}
         {query?.has_discount && (
            <Button
               color="customPinkLow"
               size="small"
               variant="contained"
               className="!text-xs !text-[#B1302E]"
               endIcon={<CloseIcon />}
               onClick={() => removeFilter('has_discount')}
            >
               {t('Has discount')}
            </Button>
         )}
         {query?.color && (
            <Button
               color="customPinkLow"
               size="small"
               variant="contained"
               className="!text-xs !text-[#B1302E]"
               endIcon={<CloseIcon />}
               onClick={() => removeFilter('color')}
            >
               {t('Color')}
            </Button>
         )}
      </div>
   );
}

export default AppliedFilters;
