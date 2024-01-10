import api from '../api';

const getAllPictures = async () => {
  try {
    const response = await api.get('Picture');
    return response.data;
  } catch (error) {
    console.error('Error in getPictures:', error);
    return null;
  }
};

const getPictureById = async (id) => {
  try {
    const response = await api.get(`Picture/PictureById?id=${id}`);
    return response.data;
  } catch (error) {
    console.error('Error in getPictureById:', error);
    return null;
  }
};

const addPicture = async (picture) => {
  try {
    const response = await api.post('Picture/InsertPicture', picture);
    return response.data;
  } catch (error) {
    console.error('Error in addPicture:', error);
    return null;
  }
};

const updatePicture = async (picture) => {
  try {
    const response = await api.put('Picture/UpdatePicture', picture);
    return response.data;
  } catch (error) {
    console.error('Error in updatePicture:', error);
    return null;
  }
};

const deletePicture = async (id) => {
  try {
    const response = await api.delete(`Picture/DeletePicture?id=${id}`);
    return response.data;
  } catch (error) {
    console.error('Error in deletePicture:', error);
    return null;
  }
};

export { getAllPictures, getPictureById, addPicture, updatePicture, deletePicture };
