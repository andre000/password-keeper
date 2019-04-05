<template>
  <a-card class="card-filter">
    <a-row>
      <a-col :span="21">
        <a-input v-model="searchFilter" placeholder="Search">
          <a-icon slot="prefix" type="search" />
        </a-input>
      </a-col>
      <a-col :span="3" style="text-align: center">
        <a-tooltip placement="top">
          <template slot="title">
            <span>Add new Password</span>
          </template>
          <a-button shape="circle" type="primary" icon="plus" @click="newPassword()" />
        </a-tooltip>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  computed: {
    searchFilter: {
      get() { return this.search; },
      set(value) { this.SET_SEARCH(value); },
    },
    ...mapState('mainPage', ['search']),
  },
  methods: {
    newPassword() {
      this.SET_SELECTED_PASS_ID('NEW');
      this.SET_SELECTED_PASS({});
    },
    ...mapMutations('mainPage', ['SET_SELECTED_PASS_ID', 'SET_SELECTED_PASS', 'SET_SEARCH']),
  },
};
</script>

<style scoped>
  .ant-card {
    border: none;
    margin-bottom: 12px;
  }
</style>

<style>
  .card-filter .ant-card-body {
    padding: 12px !important;
  }
  .card-filter .ant-input {
    border: none;
  }
</style>
