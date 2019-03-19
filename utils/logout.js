import cookie from 'js-cookie';

export default async (store) => {
  store.commit('SET_TOKEN', null);
  if (process.client) {
    cookie.remove('auth');
  }
};
