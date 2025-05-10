import { createAsyncThunk } from '@reduxjs/toolkit';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';

export const addRequestToFirestore = createAsyncThunk(
  'queue/addRequest',
  async (requestData, { rejectWithValue }) => {
    try {
      const newDocRef = doc(collection(db, 'queue'));
      await setDoc(newDocRef, requestData);
      return { id: newDocRef.id, ...requestData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeRequestFromFirestore = createAsyncThunk(
  'queue/removeRequest',
  async (requestId, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, 'queue', requestId));
      return requestId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);