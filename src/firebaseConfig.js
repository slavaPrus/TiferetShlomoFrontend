import React from 'react';
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { useDownloadURL } from 'react-firebase-hooks/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD5F3-DHjCtMlbLXr58y7sMzEJrxDafu5Q",
  authDomain: "tifertshlomofirebase.firebaseapp.com",
  projectId: "tifertshlomofirebase",
  storageBucket: "tifertshlomofirebase.appspot.com",
  messagingSenderId: "948047533750",
  appId: "1:948047533750:web:dbff72850d89d801983817",
  measurementId: "G-44DF65WTQE"

};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
 
  // Check if Firebase app is already initialized
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
 
function PDFViewer() {
    const storage = firebase.storage();
    const storageRef = storage.ref();
    const pdfRef = storageRef.child('pdf/דקדוק שיעור 2.pdf');
    const [url, loading, error] = useDownloadURL(pdfRef);
 
    if (loading) {
      return <p>Loading PDF...</p>;
    }
 
    if (error) {
        return <p>Error loading PDF: {error.message}</p>;
      }
   
      return (
        <div>
          <a href={url} target="_blank" rel="noopener noreferrer">
            Click here to open PDF in a new window
          </a>
        </div>
      );
    }

export default PDFViewer;
export { storage };

