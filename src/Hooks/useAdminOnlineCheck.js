import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../_store/firebase';

export const useAdminOnlineCheck = () => {
  const [isAdminOnline, setIsAdminOnline] = useState(false);

  useEffect(() => {
    const adminsRef = collection(db, 'admins');
    const q = query(adminsRef, where('active', '==', true));
    
    // Real-time listener
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const hasActiveAdmins = !snapshot.empty;
      setIsAdminOnline(hasActiveAdmins);
    }, (error) => {
      console.error("Admin online check error:", error);
    });

    return () => unsubscribe();
  }, []);

  return { isAdminOnline };
};