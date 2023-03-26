import axios from '@/libs/axios';

const contacts = '/contacts';

export const getContacts = () => {
  return axios.get(`${contacts}`);
};

export const deleteContact = (id) => {
  return axios.delete(`${contacts}/${id}`);
};

export const updateContact = (contact) => {
  return axios.put(`${contacts}/${contact.id}`, contact);
};

export const createContact = (newContact) => {
  return axios.post(`${contacts}`, newContact);
};
