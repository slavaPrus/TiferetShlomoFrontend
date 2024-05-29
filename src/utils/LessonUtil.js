import api from '../api';


const getAllLessons = async () => {
  try {
    const response = await api.get('lessons');
    return response.data;
  } catch (error) {
    console.error('Error in getLessons:', error);
    return null;
  }
};

const getLessonById = async (id) => {
  try {
    const response = await api.get(`lessons/LessonById?id=${id}`);
    return response.data;
  } catch (error) {
    console.error('Error in getLessonById:', error);
    return null;
  }
};

const addLesson = async (lesson) => {
  try {
    const response = await api.post('lessons/InsertLesson', lesson);
    return response.data;
  } catch (error) {
    console.error('Error in addLesson:', error);
    return null;
  }
};

const updateLesson = async (lesson) => {
  try {
    const response = await api.put('lessons/UpdateLesson', lesson);
    return response.data;
  } catch (error) {
    console.error('Error in updateLesson:', error);
    return null;
  }
};

const deleteLesson = async (id) => {
  try {
    const response = await api.delete(`lessons/DeleteLesson?id=${id}`);
    return response.data;
  } catch (error) {
    console.error('Error in deleteLesson:', error);
    return null;
  }
};

const getLessonsByPage = async (page) => {
  try {
  const response = await api.get(`lessons/getLessonsByPage/${page}`);
  return response.data;
} catch (error) {
  console.error('Error in getLessonsByPage:', error);
  return null;
}
};

const getSearchLessonsByPage = async (str,page) => {
  try {
  
  const response = await api.get(`lessons/getSearchLessonsByPage?str=${str}&page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Error in getSearchLessonsByPage:', error);
    return null;
  }
};
const getFilterLessonsByPage = async (str,page) => {
  try {
    const response = await api.get(`lessons/getFilterLessonsByPage?str=${str}&page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Error in getFilterLessonsByPage:', error);
    return null;
  }
};


export { getLessonsByPage,getAllLessons, getLessonById, addLesson, updateLesson, deleteLesson ,getSearchLessonsByPage,getFilterLessonsByPage};
