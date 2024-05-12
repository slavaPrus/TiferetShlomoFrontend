import api from '../api';

const getBooksByPage = async (page) => {
    try {
    const response = await api.get(`/books/getBooksByPage/${page}`);
    return response.data;
  } catch (error) {
    console.error('Error in getBooksByPage:', error);
    return null;
  }
};
const getSearchBooksByPage = async (str,page) => {
  try {
    const response = await api.get(`/books/getSearchBooksByPage?str=${str}&page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Error in getSearchBooksByPage:', error);
    return null;
  }
};
const getFilterBooksByPage = async (str,page) => {
  try {
    const response = await api.get(`/books/getFilterBooksByPage?str=${str}&page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Error in getFilterBooksByPage:', error);
    return null;
  }
};
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
    console.log("!!!book",book)
    const response = await api.post('books', book);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error('Error in addBook:', error);
    return null;
  }
};

const updateBook = async (book) => {
  try {
    const response = await api.put(`books/${book.bookId}`, book);
    console.log("!",response);
    return response.data;
  } catch (error) {
    console.error('Error in updateBook:', error);
    return null;
  }
};

const deleteBook = async (id) => {
  try {
    const response = await api.delete(`books/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error in deleteBook:', error);
    throw error; // Rethrow the error
  }
};

export { getAllBooks,getBooksByPage,getSearchBooksByPage,getFilterBooksByPage, getBookById, addBook, updateBook, deleteBook };
