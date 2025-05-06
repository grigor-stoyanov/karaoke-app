// src/hooks/useSyncQueue.js
import { useEffect } from 'react';
import { onSnapshot, collection } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setRequests } from '../store/queueSlice';
import { db } from '../firebase';

export function useSyncQueue() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'queue'), snapshot => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      dispatch(setRequests(data));
    });

    return () => unsub(); 
  }, [dispatch]);
}
