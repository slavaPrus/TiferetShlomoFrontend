import React, { useEffect, useState } from "react" ;
import 'firebase/compat/storage';
import firebase from 'firebase/compat/app';
import { useDownloadURL } from 'react-firebase-hooks/storage';
import { firebaseConfig } from "../firebaseConfig";

// const app = initializeApp(firebaseConfig);
// const storage = getStorage(app)
 
// Check if Firebase app is already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const storageRef = firebase.storage().ref();


const ImageView = ({imageUrl, name, handleClick}) => {
    // const storage = firebase.storage();
    // const storageRef = storage.ref();

    // const url = storageRef.child(imageUrl == null ? "" : imageUrl).getDownloadURL();

    const [image, setImage] = useState('');
    //  const { url } = useStorage(firebase.storage().ref().child(imageUrl));


    useEffect(() => {
      getImageUrl(imageUrl)
        .then((url) => setImage(url))
        .catch((error) => console.error(error));
    }, []);

    const getImageUrl = async (imagePath) => {
        const imageUrl = await storageRef.child(imagePath).getDownloadURL();
        return imageUrl;
    };
  
    // const [url, loading, error] = useDownloadURL(imageRef);

    // if(error){
    //     return <span>ארעה שגיאה</span>;
    // }

    // if(loading){
    //     return <span>טוען...</span>;
    // }
    return(<>
    {imageUrl ? (
        <img src={image}
        alt={name} 
        onClick={handleClick}
        style={{
          height: "100%",
          width: "100%",
          objectFit: "cover",
        }}/>
      ) : (
        <p>Loading image...</p>
      )}
    </>);
}

export default ImageView;