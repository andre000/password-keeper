/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
export const state = () => ({
  token: null,
  authDate: null,
});

export const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
    state.authDate = new Date();
  },
};

export const actions = {
  async login() {
    // TODO
  },

  async logout() {
    // TODO
  },
};
