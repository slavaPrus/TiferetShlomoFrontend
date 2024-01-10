import api from '../api';

const getAllJoinings = async () => {
  try {
    const response = await api.get('Joining');
    return response.data;
  } catch (error) {
    console.error('Error in getJoinings:', error);
    return null;
  }
};

const getJoiningById = async (id) => {
  try {
    const response = await api.get(`Joining/JoiningById?id=${id}`);
    return response.data;
  } catch (error) {
    console.error('Error in getJoiningById:', error);
    return null;
  }
};

const addJoining = async (joining) => {
  try {
    const response = await api.post('Joining/InsertJoining', joining);
    return response.data;
  } catch (error) {
    console.error('Error in addJoining:', error);
    return null;
  }
};

const updateJoining = async (joining) => {
  try {
    const response = await api.put('Joining/UpdateJoining', joining);
    return response.data;
  } catch (error) {
    console.error('Error in updateJoining:', error);
    return null;
  }
};

const deleteJoining = async (id) => {
  try {
    const response = await api.delete(`Joining/DeleteJoining?id=${id}`);
    return response.data;
  } catch (error) {
    console.error('Error in deleteJoining:', error);
    return null;
  }
};

export { getAllJoinings, getJoiningById, addJoining, updateJoining, deleteJoining };
