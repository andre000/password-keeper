import axios from 'axios';
import cookie from 'js-cookie';

const inFiveMinutes = new Date(new Date().getTime() + 5 * 60 * 1000);

export default async ({
  email, password, store, apollo,
}) => {
  const { data: response } = await axios.post(process.env.API_URL + process.env.LOGIN_URL, {
    email,
    password,
  });

  if (!response.auth) return response;

  store.commit('SET_TOKEN', response.token);
  if (process.client) {
    cookie.set('auth', response.token, {
      expires: process.env.NODE_ENV === 'production' ? inFiveMinutes : 99,
    });
  }

  await apollo.onLogin(store.state.token);
  return response.auth;
};
