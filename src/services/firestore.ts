import { db } from './firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';

// Add a new application
export const addApplication = async (applicationData: any) => {
  try {
    await addDoc(collection(db, 'applications'), applicationData);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Fetch applications
export const fetchApplications = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'applications'));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.error('Error fetching applications: ', e);
    return [];
  }
};