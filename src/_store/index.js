import { configureStore } from '@reduxjs/toolkit';
import queueReducer from './queueSlice';
import searchReducer from './searchSlice';

const store = configureStore({
  reducer: {
    queue: queueReducer,
    search: searchReducer,
  },
});

export default store;
