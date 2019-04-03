<template>
  <a-layout id="main-menu">
    <main-sidebar />
    <a-layout>
      <main-header :user="loggedUser" />
      <a-layout-content>
        <nuxt />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import mainSidebar from '@/components/main/MainSidebar';
import mainHeader from '@/components/main/MainHeader';
import { loggedUser } from '../graphql';

export default {
  middleware: 'auth',
  components: {
    mainSidebar,
    mainHeader,
  },

  data: () => ({
    loggedUser: '',
  }),

  apollo: {
    loggedUser: {
      query: loggedUser,
      update: ({ user }) => (user ? user.name : null),
      error({ networkError }) {
        const status = networkError ? networkError.statusCode : 500;
        const message = (networkError && networkError.result)
          ? networkError.result.error
          : 'An error ocurred. Try again later.';

        this.$root.error({ statusCode: status, message });
      },
      variables() {
        return {
          user: this.userID,
        };
      },
    },
  },

  computed: {
    userID() {
      return this.$store.state.user;
    },
  },
};
</script>
<style lang="scss">
@import url('~/assets/scss/main.scss');

.ant-layout-content {
  margin: 24px 16px;
  padding: 24px;
  min-height: 280px;
}

#main-menu {
  height: 100vh;
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color .3s;
    &:hover {
      color: #1890ff;
    }
  }

  .logo {
    height: 32px;
    margin: 16px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: bold;
    font-family: 'PT Sans', sans-serif;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
  }
}

.ant-menu-item-divider {
  background-color: #ffffff33 !important;
}

.menu-subtitle {
  font-variant: all-small-caps;
  cursor: auto;
}
</style>
