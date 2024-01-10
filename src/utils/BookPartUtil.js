import api from '../api';

const getAllBookParts = async () => {
  try {
    const response = await api.get('BookPart');
    return response.data;
  } catch (error) {
    console.error('Error in getBookParts:', error);
    return null;
  }
};

const getBookPartById = async (id) => {
  try {
    const response = await api.get(`BookPart/BookPartById?id=${id}`);
    return response.data;
  } catch (error) {
    console.error('Error in getBookPartById:', error);
    return null;
  }
};

const addBookPart = async (BookPart) => {
  try {
    const response = await api.post('BookPart/InsertBookPart', BookPart);
    return response.data;
  } catch (error) {
    console.error('Error in addBookPart:', error);
    return null;
  }
};

const updateBookPart = async (BookPart) => {
  try {
    const response = await api.put('BookPart/UpdateBook', BookPart);
    return response.data;
  } catch (error) {
    console.error('Error in updateBookPart:', error);
    return null;
  }
};

const deleteBookPart = async (id) => {
  try {
    const response = await api.delete(`BookPart/DeleteBookPart?id=${id}`);
    return response.data;
  } catch (error) {
    console.error('Error in deleteBookPart:', error);
    return null;
  }
};

export { getAllBookParts, getBookPartById, addBookPart, updateBookPart, deleteBookPart };
