/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import passwordDetail from '@/graphql/passwordDetail.gql';

export const state = () => ({
  selectedPassID: null,
  selectedPass: null,
});

export const mutations = {
  SET_SELECTED_PASS_ID(state, id) {
    state.selectedPassID = id;
  },
  SET_SELECTED_PASS(state, password) {
    state.selectedPass = password;
  },
};

export const actions = {
  async getPassDetail(store, id) {
    if (!id) {
      return store.commit('SET_SELECTED_PASS', null);
    }
    const client = this.app.apolloProvider.defaultClient;
    const { data } = await client.query({
      query: passwordDetail,
      variables: { id },
    });
    return store.commit('SET_SELECTED_PASS', data.password);
  },
};
