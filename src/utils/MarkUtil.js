import api from '../api';

const getAllMarks = async () => {
  try {
    const response = await api.get('Mark');
    return response.data;
  } catch (error) {
    console.error('Error in getMarks:', error);
    return null;
  }
};

const getMarkById = async (id) => {
  try {
    const response = await api.get(`Mark/MarkById?id=${id}`);
    return response.data;
  } catch (error) {
    console.error('Error in getMarkById:', error);
    return null;
  }
};

const addMark = async (mark) => {
  try {
    const response = await api.post('Mark/InsertMark', mark);
    return response.data;
  } catch (error) {
    console.error('Error in addMark:', error);
    return null;
  }
};

const updateMark = async (mark) => {
  try {
    const response = await api.put('Mark/UpdateMark', mark);
    return response.data;
  } catch (error) {
    console.error('Error in updateMark:', error);
    return null;
  }
};

const deleteMark = async (id) => {
  try {
    const response = await api.delete(`Mark/DeleteMark?id=${id}`);
    return response.data;
  } catch (error) {
    console.error('Error in deleteMark:', error);
    return null;
  }
};

export { getAllMarks, getMarkById, addMark, updateMark, deleteMark };
