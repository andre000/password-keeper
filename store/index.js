/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
const cookieparser = process.server ? require('cookieparser') : undefined;

export const state = () => ({
  token: null,
  user: null,
});

export const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
    if (token) {
      const { id } = JSON.parse(Buffer.from(token.match(/\.(.+?)\./)[1], 'base64').toString());
      state.user = id;
    } else {
      state.user = null;
    }
  },
};

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie);
      commit('SET_TOKEN', parsed.auth);
    }
  },
};
