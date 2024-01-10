import api from '../api';

const getAllLessons = async () => {
  try {
    const response = await api.get('Lesson');
    return response.data;
  } catch (error) {
    console.error('Error in getLessons:', error);
    return null;
  }
};

const getLessonById = async (id) => {
  try {
    const response = await api.get(`Lesson/LessonById?id=${id}`);
    return response.data;
  } catch (error) {
    console.error('Error in getLessonById:', error);
    return null;
  }
};

const addLesson = async (lesson) => {
  try {
    const response = await api.post('Lesson/InsertLesson', lesson);
    return response.data;
  } catch (error) {
    console.error('Error in addLesson:', error);
    return null;
  }
};

const updateLesson = async (lesson) => {
  try {
    const response = await api.put('Lesson/UpdateLesson', lesson);
    return response.data;
  } catch (error) {
    console.error('Error in updateLesson:', error);
    return null;
  }
};

const deleteLesson = async (id) => {
  try {
    const response = await api.delete(`Lesson/DeleteLesson?id=${id}`);
    return response.data;
  } catch (error) {
    console.error('Error in deleteLesson:', error);
    return null;
  }
};

export { getAllLessons, getLessonById, addLesson, updateLesson, deleteLesson };
