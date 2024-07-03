import api from '../api';
const getFlyersByPage = async (page) => {
  try {
  const response = await api.get(`flyers/getFlyersByPage/${page}`);
  return response.data;
} catch (error) {
  console.error('Error in getFlyersByPage:', error);
  return null;
}
};

const getSearchFlyersByPage = async (str,page) => {
  try {
  
  const response = await api.get(`flyers/getSearchFlyersByPage?str=${str}&page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Error in getSearchFlyersByPage:', error);
    return null;
  }
};
const getFilterFlyersByPage = async (str,page) => {
  try {
    const response = await api.get(`flyers/getFilterFlyersByPage?str=${str}&page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Error in getFilterFlyersByPage:', error);
    return null;
  }
};

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
    console.log("flyer",flyer)
    const response = await api.post('flyers', flyer);
    return response.data;
  } catch (error) {
    console.error('Error in addFlyer:', error);
    return null;
  }
};

const updateFlyer = async (flyer) => {
  try {
    const response = await api.put(`flyers/${flyer.flyerId}`, flyer);
    return response.data;
  } catch (error) {
    console.error('Error in updateFlyer:', error);
    return null;
  }
};

const deleteFlyer = async (id) => {
  try {
    const response = await api.delete(`flyers/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error in deleteFlyer:', error);
    return null;
  }
};


export { getAllFlyers, getFlyerById, addFlyer, updateFlyer, deleteFlyer,
  getFilterFlyersByPage, getSearchFlyersByPage, getFlyersByPage
 };
