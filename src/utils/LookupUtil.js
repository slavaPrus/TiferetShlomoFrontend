import api from "../api";

const getAllLessontypes = async () => {
    try {
      const response = await api.get('Lookup/lessonTypes');
      return response.data;
    } catch (error) {
      console.error('Error in getAllLessontypes:', error);
      return null;
    }
  };

  const getAllLessonsubjects = async () => {
    try {
      const response = await api.get('Lookup/lessonSubjects');
      return response.data;
    } catch (error) {
      console.error('Error in getAllLessonsubjects:', error);
      return null;
    }
  };

  const getAllParashatShavuas = async () => {
    try {
      const response = await api.get('Lookup/parashatShavuas');
      return response.data;
    } catch (error) {
      console.error('Error in getAllParashatShavuas:', error);
      return null;
    }
  };
  export {getAllLessontypes,getAllLessonsubjects,getAllParashatShavuas}