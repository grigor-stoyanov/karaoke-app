import { createSlice } from '@reduxjs/toolkit';
import { addRequestToFirestore, removeRequestFromFirestore } from './queueThunks';
import { add } from 'lodash';

const queueSlice = createSlice({
  name: 'queue',
  initialState: {
    requests: null,
  },
  reducers: {
    setRequests(state, action) {
      state.requests = action.payload;
    },
    addRequest(state, action) {
      if (!state.requests.some(
        request => request.song === action.payload.song
      )) {
        state.requests.push(action.payload);
      }
    },
    removeRequest(state, action) {
      state.requests = state.requests.filter(req => req.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addRequestToFirestore.fulfilled, (state, action) => {
        if (!state.requests.some(
          request => request.song === action.payload.song
        )) {
          state.requests.push(action.payload);
        }
      })
      .addCase(removeRequestFromFirestore.fulfilled, (state, action) => {
        state.requests = state.requests.filter(req => req.id !== action.payload);
      })
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
