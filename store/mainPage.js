/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import listPassword from '@/graphql/listPasswords.gql';
import passwordDetail from '@/graphql/passwordDetail.gql';
import passwordSave from '@/graphql/passwordSave.gql';
import passwordCreate from '@/graphql/passwordCreate.gql';
import passwordDelete from '@/graphql/passwordDelete.gql';

export const state = () => ({
  selectedPassID: null,
  selectedPass: null,
  search: '',
});

export const mutations = {
  SET_SELECTED_PASS_ID(state, id) {
    state.selectedPassID = id;
  },
  SET_SELECTED_PASS(state, password) {
    state.selectedPass = password;
  },
  SET_SEARCH(state, search) {
    state.search = search;
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

    if (password.id) {
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

      return store.dispatch('getPassDetail', data.editPassword._id);
    }

    const { data } = await client.mutate({
      mutation: passwordCreate,
      variables: { ...password },
      update: (store, { data: { addPassword } }) => {
        const data = store.readQuery({
          query: listPassword,
        });

        data.passwords.push(addPassword);

        store.writeQuery({
          query: listPassword,
          data,
        });
      },
    });

    store.commit('SET_SELECTED_PASS_ID', data.addPassword._id);
    return store.commit('SET_SELECTED_PASS', data.addPassword);
  },

  async deletePassword(store, id) {
    store.commit('SET_SELECTED_PASS_ID', null);
    store.commit('SET_SELECTED_PASS', null);
    const client = this.app.apolloProvider.defaultClient;

    await client.mutate({
      mutation: passwordDelete,
      variables: { id },
      update: (store, { data: { deletePassword } }) => {
        const data = store.readQuery({
          query: listPassword,
        });

        const newList = data.passwords.filter(p => p._id !== deletePassword._id);

        store.writeQuery({
          query: listPassword,
          data: { passwords: newList },
        });
      },
    });
  },
};
