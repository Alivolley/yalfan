import { createSlice } from '@reduxjs/toolkit';

const pAdminSideBarStatus = createSlice({
   name: 'pAdminSideBarStatus',

   initialState: true,

   reducers: {
      changeToStatusTrue: () => true,

      changeToStatusFalse: () => false,

      toggleStatusStatus: state => {
         if (state) {
            return false;
         }
         return true;
      },
   },
});

export const { changeToStatusTrue, changeToStatusFalse, toggleStatusStatus } = pAdminSideBarStatus.actions;
export default pAdminSideBarStatus.reducer;
