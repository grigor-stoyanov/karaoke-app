import { createAsyncThunk } from '@reduxjs/toolkit';
import { decode } from 'html-entities';

export const searchYouTube = createAsyncThunk(
  'youtube/search',
  async (query, { rejectWithValue }) => {
    try {
      if (!query) return []; 
      const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
          query + ' karaoke'
        )}&type=video&maxResults=3&key=${API_KEY}`
      );
      console.log('fetched');
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.items?.length) throw new Error('No results found');

      return data.items.map(item => ({
        ...item,
        snippet: {
          ...item.snippet,
          title: decode(item.snippet.title),
          description: decode(item.snippet.description)
        }
      }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


