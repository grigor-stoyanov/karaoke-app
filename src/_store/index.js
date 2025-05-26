import { configureStore } from '@reduxjs/toolkit';
import queueReducer from './queueSlice';
import searchReducer from './searchSlice';
import adminsReducer from './adminsSlice';

const store = configureStore({
  reducer: {
    queue: queueReducer,
    search: searchReducer,
    admins: adminsReducer
  },
});

export default store;
