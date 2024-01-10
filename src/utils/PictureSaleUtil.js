import api from '../api';

const getPicturesales = async () => {
  try {
    const response = await api.get('Picturesale');
    return response.data;
  } catch (error) {
    console.error('Error in getPicturesales:', error);
    return null;
  }
};

const getPicturesaleById = async (id) => {
  try {
    const response = await api.get(`Picturesale/PicturesaleById?id=${id}`);
    return response.data;
  } catch (error) {
    console.error('Error in getPicturesaleById:', error);
    return null;
  }
};

const addPicturesale = async (Picturesale) => {
  try {
    const response = await api.post('Picturesale/InsertPicturesale', Picturesale);
    return response.data;
  } catch (error) {
    console.error('Error in addPicturesale:', error);
    return null;
  }
};

const updatePicturesale = async (Picturesale) => {
  try {
    const response = await api.put('Picturesale/UpdatePicturesale', Picturesale);
    return response.data;
  } catch (error) {
    console.error('Error in updatePicturesale:', error);
    return null;
  }
};

const deletePicturesale = async (id) => {
  try {
    const response = await api.delete(`Picturesale/DeletePicturesale?id=${id}`);
    return response.data;
  } catch (error) {
    console.error('Error in deletePicturesale:', error);
    return null;
  }
};

export { getPicturesales, getPicturesaleById, addPicturesale, updatePicturesale, deletePicturesale };
