import { createSlice } from '@reduxjs/toolkit';
import { setAdminActive, endAllAdminSessions } from './adminThunks';

export const adminSlice = createSlice({
  name: 'admins',
  initialState: [],
  reducers: {
    setAdmins: (state, action) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setAdminActive.fulfilled, (state, action) => {
      return state.map(admin => ({
        ...admin,
        active: admin.email === action.payload.email ? true : admin.active
      }));
    })
      
      .addCase(endAllAdminSessions.fulfilled, (state) => {
        state = state.map(admin => ({
          ...admin,
          active: false
        }));
      })
  }
});

export const { setAdmins } = adminSlice.actions;
export default adminSlice.reducer;