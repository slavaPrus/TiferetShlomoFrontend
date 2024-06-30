import React from "react" ;
import { useDownloadURL } from "react-firebase-hooks/storage";
 
const PdfView = ({pdfUrl}) => {
    const [url, loading, error] = useDownloadURL(pdfUrl);

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