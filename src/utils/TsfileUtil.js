import api from '../api';

const getTsfiles = async () => {
  try {
    const response = await api.get('Tsfile');
    return response.data;
  } catch (error) {
    console.error('Error in getTsfiles:', error);
    return null;
  }
};

const getTsfileById = async (id) => {
  try {
    const response = await api.get(`Tsfile/TsfileById?id=${id}`);
    return response.data;
  } catch (error) {
    console.error('Error in getTsfileById:', error);
    return null;
  }
};

const addTsfile = async (tsfile) => {
  try {
    const response = await api.post('Tsfile/InsertTsfile', tsfile);
    return response.data;
  } catch (error) {
    console.error('Error in addTsfile:', error);
    return null;
  }
};

const updateTsfile = async (tsfile) => {
  try {
    const response = await api.put('Tsfile/UpdateTsfile', tsfile);
    return response.data;
  } catch (error) {
    console.error('Error in updateTsfile:', error);
    return null;
  }
};

const deleteTsfile = async (id) => {
  try {
    const response = await api.delete(`Tsfile/DeleteTsfile?id=${id}`);
    return response.data;
  } catch (error) {
    console.error('Error in deleteTsfile:', error);
    return null;
  }
};

export { getTsfiles, getTsfileById, addTsfile, updateTsfile, deleteTsfile };
