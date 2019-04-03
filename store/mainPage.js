/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import listPassword from '@/graphql/listPasswords.gql';
import passwordDetail from '@/graphql/passwordDetail.gql';
import passwordSave from '@/graphql/passwordSave.gql';

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

  async savePassword(store, password) {
    const client = this.app.apolloProvider.defaultClient;

    const { data } = await client.mutate({
      mutation: passwordSave,
      variables: { ...password },
      update: (store, { data: { editPassword } }) => {
        const data = store.readQuery({
          query: listPassword,
        });

        // eslint-disable-next-line no-unused-vars
        let editedPassword = data.passwords.find(p => p._id === editPassword._id);
        editedPassword = { ...editPassword };

        store.writeQuery({
          query: listPassword,
          data,
        });
      },
    });

    store.dispatch('getPassDetail', data.editPassword._id);
  },
};
