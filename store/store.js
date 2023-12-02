import { configureStore } from '@reduxjs/toolkit';
import loginStatusReducer from './reducers/loginStatusReducer';

const store = configureStore({
   reducer: {
      loginStatusReducer,
   },
});

export default store;
