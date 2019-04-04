<template>
  <div class="password-list">
    <a-card
      v-for="(pass, k) in filteredPassword"
      :key="k"
      :class="{'selected': pass._id === selectedPassID}"
      class="password-card"
      @click="selectPassword(pass)"
    >
      <a-avatar class="password-icon">
        <i :class="pass.icon ? pass.icon : 'mdi-help'" class="mdi" />
      </a-avatar>
      <div class="password-text">
        <span class="password-title" v-html="stylizeTitle(pass.title)" /> <br>
        <span class="password-subtitle">{{ pass.username }}</span>
      </div>
      <div class="password-actions">
        <a-popconfirm
          placement="right"
          ok-text="Yes"
          cancel-text="No"
          @confirm="deletePassword(pass._id)"
        >
          <template slot="title">
            <p>Are you sure you want to delete this password?</p>
          </template>
          <a-icon type="delete" @click.stop="" />
        </a-popconfirm>
      </div>
    </a-card>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex';
import passList from '@/graphql/listPasswords.gql';

export default {
  apollo: {
    passwords: {
      query: passList,
    },
  },

  computed: {
    filteredPassword() {
      return this.search
        ? this.passwords.filter(p => new RegExp(this.search, 'gi').test(p.title))
        : this.passwords;
    },
    ...mapState('mainPage', ['selectedPassID', 'search']),
  },

  methods: {
    selectPassword(pass) {
      const id = pass._id === this.selectedPassID ? null : pass._id;
      this.SET_SELECTED_PASS_ID(id);
    },
    deletePassword(id) {
      this.deletePassword(id);
    },
    stylizeTitle(title) {
      if (!this.search) return title;
      return title.replace(new RegExp(`(${this.search})`, 'gi'), '<span class="search-highlight">$1</span>');
    },
    ...mapMutations('mainPage', ['SET_SELECTED_PASS_ID', 'SET_SELECTED_PASS']),
    ...mapActions('mainPage', ['deletePassword']),
  },
};
</script>

<style scoped>
  .ant-card {
    border: none;
    cursor: pointer;
  }
  .ant-card:hover .password-title, .ant-card.selected .password-title {
    color: #1890ff;
  }
  .ant-card:hover .password-icon, .ant-card.selected .password-icon {
    background: #1890ff;
  }
  .ant-card:not(:last-child) {
    margin-bottom: 12px;
  }
  .password-text {
    flex-grow: 2;
    padding-left: 25px;
  }
  .password-icon {
    transition: all .2s;
  }

  .password-title {
    transition: all .2s;
    font-weight: bold;
    font-size: 1.2em;
  }
  .password-subtitle {
    color: #aaa
  }

  .password-list {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .password-card {
    width: 100%
  }
</style>

<style>
  .password-card .ant-card-body{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .search-highlight {
    color: #ff9800 !important;
  }
</style>
