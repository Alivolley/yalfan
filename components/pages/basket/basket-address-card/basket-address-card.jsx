/* eslint-disable no-self-compare */
/* eslint-disable no-constant-condition */
import { useState } from 'react';

// MUI
import { IconButton } from '@mui/material';

// Icons
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import BorderColorIcon from '@mui/icons-material/BorderColor';

// Components
import BasketAddressModal from '../basket-address-modal/basket-address-modal';
import BasketDeleteAddressModal from '../basket-delete-address-modal/basket-delete-address-modal';

function BasketAddressCard({ isClickable = false, detail, onClick = () => {}, isActive = false }) {
   const [showBasketAddressModal, setShowBasketAddressModal] = useState(false);
   const [showDeleteAddressModal, setShowDeleteAddressModal] = useState(false);

   return (
      <div className="flex items-center justify-between rounded bg-white py-4 customMd:px-8">
         <button
            type="button"
            className="cursor-pointer border-none bg-transparent font-rokhRegular outline-none"
            onClick={onClick}
         >
            <div
               className={`flex items-center gap-2 text-base customMd:text-lg ${
                  isActive ? 'font-bold' : 'text-[#626E94]'
               }`}
            >
               {isClickable && (
                  <div
                     className={`h-4 w-4 rounded-full border-[4px] border-solid ${
                        isActive ? 'border-[#D14D72]' : 'border-[#BDCEDE]'
                     }`}
                  />
               )}
               {detail?.recipient_name}
            </div>
            <p className={`font-rokhFaNum text-xs customMd:text-sm ${isActive ? '' : 'text-[#626E94]'}`}>
               {detail?.address} - {detail?.phone_number}
            </p>
         </button>

         <div className="flex items-center">
            <IconButton onClick={() => setShowBasketAddressModal(true)}>
               <BorderColorIcon className="text-sm" />
            </IconButton>
            <IconButton onClick={() => setShowDeleteAddressModal(true)}>
               <DeleteForeverOutlinedIcon className="text-base" />
            </IconButton>
         </div>

         <BasketAddressModal
            show={showBasketAddressModal}
            onClose={() => setShowBasketAddressModal(false)}
            isEdit
            detail={detail}
         />
         <BasketDeleteAddressModal
            show={showDeleteAddressModal}
            onClose={() => setShowDeleteAddressModal(false)}
            detail={detail}
         />
      </div>
   );
}

export default BasketAddressCard;
