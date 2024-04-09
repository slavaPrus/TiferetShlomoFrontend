import { addBook } from "../utils/BookUtil";
import { addFlyer } from "../utils/FlyerUtil";
import { addLesson } from "../utils/LessonUtil";
import { addTest } from "../utils/TestUtil";

export  const handleAddBook = async () => {
    try {
      const res = await addBook();
      alert("הספר נוסף בהצלחה");
    } catch (error) {
      alert("ארעה שגיאה בהוספת הספר");
    }
  };

  export const handleAddFlyer = async () => {
    try {
      const res = await addFlyer();
      alert("העלון נוסף בהצלחה");
    } catch (error) {
      alert("ארעה שגיאה בהוספת העלון");
    }
  };

  export const handleAddLesson = async () => {
    try {
      const res = await addLesson();
      alert("השיעור נוסף בהצלחה");
    } catch (error) {
      alert("ארעה שגיאה בהוספת השיעור");
    }
  };

  export const handleAddTest = async () => {
    try {
      const res = await addTest();
      alert("המבחן נוסף בהצלחה");
    } catch (error) {
      alert("ארעה שגיאה בהוספת המבחן");
    }
  };
