import { useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setAdmins } from '../_store/adminsSlice'; 
import { db } from '../_store/firebase';

export function useSyncAdmins() {
  const dispatch = useDispatch();

  useEffect(() => {
    const adminsRef = collection(db, 'admins');

    const unsubscribe = onSnapshot(
      adminsRef,
      (snapshot) => {
        const admins = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        dispatch(setAdmins(admins));
      },
      (error) => {
        console.error('Error syncing admins:', error);
      }
    );

    return () => unsubscribe();
  }, [dispatch]);
}
