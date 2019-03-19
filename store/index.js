/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
const cookieparser = process.server ? require('cookieparser') : undefined;

export const state = () => ({
  token: null,
});

export const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
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
