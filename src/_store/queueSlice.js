import { createSlice } from '@reduxjs/toolkit';

const queueSlice = createSlice({
  name: 'queue',
  initialState: {
    requests: [],
  },
  reducers: {
    setRequests(state, action) {
      state.requests = action.payload;
    },
    addRequest(state, action) {
      state.requests.push(action.payload);
    },
    removeRequest(state, action) {
      state.requests = state.requests.filter(req => req.id !== action.payload);
    },
    updateRequest(state, action) {
      const index = state.requests.findIndex(req => req.id === action.payload.id);
      if (index !== -1) state.requests[index] = action.payload;
    },
  },
});

export const { setRequests, addRequest, removeRequest, updateRequest } = queueSlice.actions;
export default queueSlice.reducer;
