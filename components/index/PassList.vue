<template>
  <div class="password-list">
    <a-card
      v-for="(pass, k) in passwords"
      :key="k"
      :class="{'selected': pass._id === selectedPassID}"
      class="password-card"
      @click="selectPassword(pass)"
    >
      <a-avatar class="password-icon">
        <i :class="pass.icon ? pass.icon : 'mdi-help'" class="mdi" />
      </a-avatar>
      <div class="password-text">
        <span class="password-title">{{ pass.title }}</span> <br>
        <span class="password-subtitle">{{ pass.username }}</span>
      </div>
      <div class="password-actions">
        <a-tooltip placement="top">
          <template slot="title">
            <span>Delete Password</span>
          </template>
          <a-icon type="delete" />
        </a-tooltip>
      </div>
    </a-card>
    <a-button type="primary" shape="circle" icon="plus" />
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import passList from '@/graphql/listPasswords.gql';

export default {
  apollo: {
    passwords: {
      query: passList,
    },
  },

  computed: {
    ...mapState('mainPage', ['selectedPassID']),
  },

  methods: {
    selectPassword(pass) {
      const id = pass._id === this.selectedPassID ? null : pass._id;
      this.SET_SELECTED_PASS_ID(id);
    },
    ...mapMutations('mainPage', ['SET_SELECTED_PASS_ID']),
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
</style>
