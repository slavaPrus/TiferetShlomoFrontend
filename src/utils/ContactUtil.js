import api from '../api';

const getAllContacts = async () => {
  try {
    const response = await api.get('Contact');
    return response.data;
  } catch (error) {
    console.error('Error in getContacts:', error);
    return null;
  }
};

const getContactById = async (id) => {
  try {
    const response = await api.get(`Contact/ContactById?id=${id}`);
    return response.data;
  } catch (error) {
    console.error('Error in getContactById:', error);
    return null;
  }
};

const addContact = async (contact) => {
  try {
    const response = await api.post('Contact/InsertContact', contact);
    return response.data;
  } catch (error) {
    console.error('Error in addContact:', error);
    return null;
  }
};

const updateContact = async (contact) => {
  try {
    const response = await api.put('Contact/UpdateContact', contact);
    return response.data;
  } catch (error) {
    console.error('Error in updateContact:', error);
    return null;
  }
};

const deleteContact = async (id) => {
  try {
    const response = await api.delete(`Contact/DeleteContact?id=${id}`);
    return response.data;
  } catch (error) {
    console.error('Error in deleteContact:', error);
    return null;
  }
};

export { getAllContacts, getContactById, addContact, updateContact, deleteContact };
