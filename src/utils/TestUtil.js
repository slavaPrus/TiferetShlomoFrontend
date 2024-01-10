import api from '../api';

const getAllTests = async () => {
  try {
    const response = await api.get('Test');
    return response.data;
  } catch (error) {
    console.error('Error in getAllTests:', error);
    return null;
  }
};

const getTestById = async (id) => {
  try {
    const response = await api.get(`Test/TestById?id=${id}`);
    return response.data;
  } catch (error) {
    console.error('Error in getTestById:', error);
    return null;
  }
};

const addTest = async (test) => {
  try {
    const response = await api.post('Test/InsertTest', test);
    return response.data;
  } catch (error) {
    console.error('Error in addTest:', error);
    return null;
  }
};

const updateTest = async (test) => {
  try {
    const response = await api.put('Test/UpdateTest', test);
    return response.data;
  } catch (error) {
    console.error('Error in updateTest:', error);
    return null;
  }
};

const deleteTest = async (id) => {
  try {
    const response = await api.delete(`Test/DeleteTest?id=${id}`);
    return response.data;
  } catch (error) {
    console.error('Error in deleteTest:', error);
    return null;
  }
};

export { getAllTests, getTestById, addTest, updateTest, deleteTest };
