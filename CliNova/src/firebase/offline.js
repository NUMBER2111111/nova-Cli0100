// Enable Firebase offline persistence
import { enableIndexedDbPersistence } from 'firebase/firestore';
import { db } from './your-db-init-file'; // Replace with your actual db import

enableIndexedDbPersistence(db).catch((err) => {
  console.error('Offline mode not available', err);
});
