import { configureStore } from '@reduxjs/toolkit';
import loginStatusReducer from './reducers/loginStatusReducer';
import userInfoReducer from './reducers/userInfoReducer';

const store = configureStore({
   reducer: {
      loginStatusReducer,
      userInfoReducer,
   },
});

export default store;
