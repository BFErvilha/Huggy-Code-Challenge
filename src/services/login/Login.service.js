import axios from 'axios';

const expressApi = axios.create({
  baseURL: `http://localhost:3000`,
});

expressApi.defaults.baseURL = 'http://localhost:3000'; // definindo a base URL do servidor

expressApi.defaults.headers.common['Content-Type'] = 'application/json'; // definindo o cabeçalho Content-Type para JSON

expressApi.defaults.mode = 'cors'; // definindo o modo para cors

export const LoginCode = () => {
  const redirectUri = process.env.VUE_APP_REDIRECT_URI;
  const clientId = process.env.VUE_APP_HUGGY_CLIENT_ID;
  const authUrl = `https://auth.huggy.app/oauth/authorize?scope=install_app%20read_agent_profile&response_type=code&redirect_uri=${redirectUri}&client_id=${clientId}`;

  return authUrl;
};

export const loginAuth = async (code) => {
  return expressApi
    .get(`/access-token/${code}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};
