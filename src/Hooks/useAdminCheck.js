import { useEffect, useState } from 'react';
import { auth, db } from '../_store/firebase';
import { getDocs, collection, query, where } from 'firebase/firestore';;

export const useAdminCheck = () => {
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const checkAdminStatus = async () => {
      const user = auth.currentUser;
      if (!user) {
        setIsAdmin(false);
        return;
      }

      try {
        const adminsRef = collection(db, 'admins');
        const q = query(adminsRef, where('email', '==', user.email));
        const snapshot = await getDocs(q);
        
        setIsAdmin(!snapshot.empty);
      } catch (error) {
        console.error("Admin check failed:", error);
        setIsAdmin(false);
      }
    };

    const unsubscribe = auth.onAuthStateChanged(() => {
      checkAdminStatus();
    });

    return () => unsubscribe();
  }, []);

  return { isAdmin};
}