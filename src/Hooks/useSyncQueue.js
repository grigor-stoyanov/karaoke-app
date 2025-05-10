// src/hooks/useSyncQueue.js
import { useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setRequests } from '../_store/queueSlice';
import { db } from '../_store/firebase'; // Import the db instance

export function useSyncQueue() {
  const dispatch = useDispatch();

  useEffect(() => {
    const queueRef = collection(db, 'queue');
    
    const unsubscribe = onSnapshot(queueRef, 
      (snapshot) => {
        const requests = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        dispatch(setRequests(requests));
      },
      (error) => {
        console.error("Error listening to queue:", error);
      }
    );

    return () => unsubscribe();
  }, [dispatch]);
}