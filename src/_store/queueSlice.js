import { createSlice } from '@reduxjs/toolkit';
import { addRequestToFirestore,removeRequestFromFirestore } from './queueThunks';

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(addRequestToFirestore.fulfilled, (state, action) => {
        state.requests.push(action.payload);
      })
      .addCase(removeRequestFromFirestore.fulfilled, (state, action) => {
        state.requests = state.requests.filter(req => req.id !== action.payload);
      })
      // Handle errors if needed
      .addMatcher(
        action => action.type.endsWith('/rejected'),
        (state, action) => {
          state.error = action.payload;
        }
      )
  }
});

export const { setRequests, addRequest, removeRequest } = queueSlice.actions;
export default queueSlice.reducer;
