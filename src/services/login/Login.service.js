import axios from 'axios';

const expressApi = axios.create({
  baseURL: `http://localhost:3000`,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
  },
});

export const LoginCode = () => {
  const redirectUri = process.env.VUE_APP_REDIRECT_URI;
  const clientId = process.env.VUE_APP_HUGGY_CLIENT_ID;
  const authUrl = `https://auth.huggy.app/oauth/authorize?scope=install_app%20read_agent_profile&response_type=code&redirect_uri=${redirectUri}&client_id=${clientId}`;

  return authUrl;
};

export const loginAuth = async (code) => {
  return await expressApi
    .get(`/access-token/${code}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};
