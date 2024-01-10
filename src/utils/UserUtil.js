import api from '../api';

const getUsers = async () => {
  try {
    const response = await api.get('User');
    return response.data;
  } catch (error) {
    console.error('Error in getUsers:', error);
    return null;
  }
};

const getUserById = async (id) => {
  try {
    const response = await api.get(`User/UserById?id=${id}`);
    return response.data;
  } catch (error) {
    console.error('Error in getUserById:', error);
    return null;
  }
};

const addUser = async (user) => {
  try {
    const response = await api.post('User/InsertUser', user);
    return response.data;
  } catch (error) {
    console.error('Error in addUser:', error);
    return null;
  }
};

const updateUser = async (user) => {
  try {
    const response = await api.put('User/UpdateUser', user);
    return response.data;
  } catch (error) {
    console.error('Error in updateUser:', error);
    return null;
  }
};

const deleteUser = async (id) => {
  try {
    const response = await api.delete(`User/DeleteUser?id=${id}`);
    return response.data;
  } catch (error) {
    console.error('Error in deleteUser:', error);
    return null;
  }
};

export { getUsers, getUserById, addUser, updateUser, deleteUser };
