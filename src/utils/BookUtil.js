import api from '../api';

const getAllBooks = async () => {
  try {
    const response = await api.get('books');
    return response.data;
  } catch (error) {
    console.error('Error in getBooks:', error);
    return null;
  }
};

const getBookById = async (id) => {
  try {
    const response = await api.get(`books/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error in getBookById:', error);
    console.error('Error details:', error.response);
    throw error; // Rethrow the error
  }
};

const addBook = async (book) => {
  try {
    const response = await api.post('books/InsertBook', book);
    return response.data;
  } catch (error) {
    console.error('Error in addBook:', error);
    return null;
  }
};

const updateBook = async (book) => {
  try {
    const response = await api.put('books/UpdateBook', book);
    return response.data;
  } catch (error) {
    console.error('Error in updateBook:', error);
    return null;
  }
};

const deleteBook = async (id) => {
  try {
    const response = await api.get(`books/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error in deleteBook:', error);
    throw error; // Rethrow the error
  }
};

export { getAllBooks, getBookById, addBook, updateBook, deleteBook };
