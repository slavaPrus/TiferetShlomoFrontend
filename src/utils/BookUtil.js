import api from '../api';

const getAllBooks = async () => {
  try {
    const response = await api.get('Book');
    return response.data;
  } catch (error) {
    console.error('Error in getBooks:', error);
    return null;
  }
};

const getBookById = async (id) => {
  try {
    const response = await api.get(`Book/BookById?id=${id}`);
    return response.data;
  } catch (error) {
    console.error('Error in getBookById:', error);
    return null;
  }
};

const addBook = async (book) => {
  try {
    const response = await api.post('Book/InsertBook', book);
    return response.data;
  } catch (error) {
    console.error('Error in addBook:', error);
    return null;
  }
};

const updateBook = async (book) => {
  try {
    const response = await api.put('Book/UpdateBook', book);
    return response.data;
  } catch (error) {
    console.error('Error in updateBook:', error);
    return null;
  }
};

const deleteBook = async (id) => {
  try {
    const response = await api.delete(`Book/DeleteBook?id=${id}`);
    return response.data;
  } catch (error) {
    console.error('Error in deleteBook:', error);
    return null;
  }
};

export { getAllBooks, getBookById, addBook, updateBook, deleteBook };
