import { createAsyncThunk } from '@reduxjs/toolkit';
import { query,where, updateDoc, collection, getDocs } from 'firebase/firestore';
import { db,auth } from './firebase';

export const setAdminActive = createAsyncThunk(
  'admins/setAdminActive',
  async (adminEmail, { rejectWithValue }) => {
    try {
      // Query for admin document by email
      await auth.authStateReady();
      const user = auth.currentUser;
      if (!user) throw new Error('Not authenticated');
      
      const adminsRef = collection(db, 'admins');
      const q = query(adminsRef, where('email', '==', adminEmail));
      const querySnapshot = await getDocs(q);
        
      
      // Check if admin exists
      if (querySnapshot.empty) {
        throw new Error('Admin not found');
      }
      
      // Get the first matching document (emails should be unique)
      const adminDoc = querySnapshot.docs[0];
      
      // Update the active status
      await updateDoc(adminDoc.ref, {
        active: true,
      });
      
      return { 
        id: adminDoc.id,  // Return both id and email
        email: adminEmail,
        active: true 
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to end all admin sessions (set all admins to inactive)
export const endAllAdminSessions = createAsyncThunk(
  'admins/endAllSessions',
  async (_, { rejectWithValue }) => {
    try {
      // Query only active admins (more efficient than fetching all)
      const adminsRef = collection(db, 'admins');
      const activeAdminsQuery = query(adminsRef, where('active', '==', true));
      const snapshot = await getDocs(activeAdminsQuery);

      // Update only active admins to inactive
      const updatePromises = snapshot.docs.map(doc => 
        updateDoc(doc.ref, { active: false })
      );

      await Promise.all(updatePromises);
      return { count: snapshot.size }; // Return how many admins were deactivated
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);