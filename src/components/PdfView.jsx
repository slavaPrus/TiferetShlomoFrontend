import React from "react" ;
import { useDownloadURL } from "react-firebase-hooks/storage";
import 'firebase/compat/storage';
import firebase from 'firebase/compat/app';
import { firebaseConfig } from "../firebaseConfig";

// Check if Firebase app is already initialized
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const PdfView = ({pdfUrl}) => {
    const storage = firebase.storage();
    const storageRef = storage.ref();
    const pdfRef = storageRef.child(pdfUrl == null ? "" : pdfUrl);
    const [url, loading, error] = useDownloadURL(pdfRef);

    if(error){
        return <span>ארעה שגיאה</span>;
    }

    if(loading){
        return <span>טוען...</span>;
    }
    return(<>
            <a href={url} target="_blank" rel="noopener noreferrer">
            {pdfUrl}
          </a>
    </>);
}

export default PdfView;