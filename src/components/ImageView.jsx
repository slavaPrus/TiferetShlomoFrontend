import React from "react" ;
import 'firebase/compat/storage';
import firebase from 'firebase/compat/app';
import { useDownloadURL } from 'react-firebase-hooks/storage';
import { firebaseConfig, storage } from "../firebaseConfig";

// const app = initializeApp(firebaseConfig);
// const storage = getStorage(app)
 
// Check if Firebase app is already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const ImageView = ({imageUrl}) => {
    const storage = firebase.storage();
    const storageRef = storage.ref();
    const imageRef = storageRef.child(imageUrl == null ? "" : imageUrl);

    const [url, loading, error] = useDownloadURL(imageRef);

    if(error){
        return <span>ארעה שגיאה</span>;
    }

    if(loading){
        return <span>טוען...</span>;
    }
    return(<>
    <img src={url} />
    </>);
}

export default ImageView;