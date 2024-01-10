import api from '../api';

const getAllFlyers = async () => {
  try {
    const response = await api.get('Flyer');
    return response.data;
  } catch (error) {
    console.error('Error in getFlyers:', error);
    return null;
  }
};

const getFlyerById = async (id) => {
  try {
    const response = await api.get(`Flyer/FlyerById?id=${id}`);
    return response.data;
  } catch (error) {
    console.error('Error in getFlyerById:', error);
    return null;
  }
};

const addFlyer = async (flyer) => {
  try {
    const response = await api.post('Flyer/InsertFlyer', flyer);
    return response.data;
  } catch (error) {
    console.error('Error in addFlyer:', error);
    return null;
  }
};

const updateFlyer = async (flyer) => {
  try {
    const response = await api.put('Flyer/UpdateFlyer', flyer);
    return response.data;
  } catch (error) {
    console.error('Error in updateFlyer:', error);
    return null;
  }
};

const deleteFlyer = async (id) => {
  try {
    const response = await api.delete(`Flyer/DeleteFlyer?id=${id}`);
    return response.data;
  } catch (error) {
    console.error('Error in deleteFlyer:', error);
    return null;
  }
};

export { getAllFlyers, getFlyerById, addFlyer, updateFlyer, deleteFlyer };
