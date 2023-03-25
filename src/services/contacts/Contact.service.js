import axios from '@/libs/axios';

const contacts = '/contacts';

export const getContacts = () => {
  return axios.get(`${contacts}`);
};
