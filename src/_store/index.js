// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import queueReducer from './queueSlice';

const store = configureStore({
  reducer: {
    queue: queueReducer,
  },
});

export default store;
