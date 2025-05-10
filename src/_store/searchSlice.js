import { createSlice } from '@reduxjs/toolkit';
import { searchYouTube } from './searchThunks';

const initialState = {
  results: [],
  loading: false,
  error: null,
  query: ''
};

const youtubeSlice = createSlice({
  name: 'youtube',
  initialState,
  reducers: {
    clearResults: (state) => {
      state.results = [];
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchYouTube.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchYouTube.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
        state.error = null;
      })
      .addCase(searchYouTube.rejected, (state, action) => {
        state.loading = false;
        state.results = [];
        state.error = action.payload;
      });
  }
});

export const { clearResults,setQuery } = youtubeSlice.actions;
export default youtubeSlice.reducer;