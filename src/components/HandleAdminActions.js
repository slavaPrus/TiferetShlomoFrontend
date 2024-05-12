import { addBook } from "../utils/BookUtil";
import { addFlyer } from "../utils/FlyerUtil";
import { addLesson } from "../utils/LessonUtil";
import { addTest } from "../utils/TestUtil";

export  const handleAddBook = async (book) => {
    try {
      console.log("!book",book)
      const res = await addBook(book);
      res.status==200 && alert("הספר נוסף בהצלחה");
    } catch (error) {
      alert("ארעה שגיאה בהוספת הספר");
    }
  };

  export const handleAddFlyer = async (flyer) => {
    try {
      const res = await addFlyer(flyer);
      res.status==200 &&alert("העלון נוסף בהצלחה");
    } catch (error) {
      alert("ארעה שגיאה בהוספת העלון");
    }
  };

  export const handleAddLesson = async (lesson) => {
    try {
      const res = await addLesson(lesson);
      res.status==200 &&alert("המאמר נוסף בהצלחה");
    } catch (error) {
      alert("ארעה שגיאה בהוספת השיעור");
    }
  };
  
  export const handleAddTest = async (test) => {
    try {
      const res = await addTest(test);
      res.status==200 &&alert("המבחן נוסף בהצלחה");
    } catch (error) {
      alert("ארעה שגיאה בהוספת המבחן");
    }
  };
