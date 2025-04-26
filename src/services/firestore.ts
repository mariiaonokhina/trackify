import { db } from './firebaseConfig';
import { collection, addDoc, getDocs, query, where, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { auth } from './firebaseConfig';

export const addApplication = async (applicationData: any) => {
  if (!auth.currentUser) throw new Error('User not authenticated');
  const fullApplicationData = {
    ...applicationData,
    userId: auth.currentUser.uid,
    createdAt: new Date(),
  };
  await addDoc(collection(db, 'applications'), fullApplicationData);
};

export const fetchApplications = async () => {
  if (!auth.currentUser) throw new Error('User not authenticated');
  const q = query(collection(db, 'applications'), where('userId', '==', auth.currentUser.uid));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const updateApplication = async (id: string, updatedData: any) => {
  await updateDoc(doc(db, 'applications', id), updatedData);
};

export const deleteApplication = async (id: string) => {
  await deleteDoc(doc(db, 'applications', id));
};