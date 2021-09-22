// @ts-check

import { configureStore } from '@reduxjs/toolkit';
import reducer from './storeSlices/index.js';

export default configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
});
