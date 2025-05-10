import { createAsyncThunk } from '@reduxjs/toolkit';
import { doc, deleteDoc, collection, addDoc, query, getDocs, serverTimestamp, orderBy, limit } from 'firebase/firestore';
import { db } from './firebase';

export const addRequestToFirestore = createAsyncThunk(
  'queue/addRequest',
  async (requestData, { rejectWithValue }) => {
        try {
      const q = query(collection(db, 'queue'), orderBy('order', 'desc'), limit(1));
      const snapshot = await getDocs(q);
      const lastOrder = snapshot.empty ? 0 : snapshot.docs[0].data().order;
      const docRef = await addDoc(collection(db, 'queue'), {
        ...requestData,
        order: lastOrder + 1
      });
      return { id: docRef.id, ...requestData, order: lastOrder + 1 };
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