<!-- eslint-disable vue/no-v-html -->
<template>
  <div>
    <div v-if="$apolloData.loading === 0" class="password-list">
      <a-card
        v-for="(pass, k) in filteredPassword"
        :key="k"
        :class="{'selected': pass._id === selectedPassID}"
        class="password-card"
        @click="selectPassword(pass)"
      >
        <div class="div-icon hidden-xs">
          <a-avatar class="password-icon">
            <i :class="pass.icon ? pass.icon : 'mdi-help'" class="mdi" />
          </a-avatar>
        </div>

        <div class="div-password">
          <div class="password-text">
            <span class="password-title" v-html="stylizeTitle(pass.title)" />
            <span class="password-subtitle">{{ pass.username }}</span>
          </div>
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
    <div v-else>
      <a-skeleton :title="false" :avatar="true" active />
      <a-skeleton :title="false" :avatar="true" active />
      <a-skeleton :title="false" :avatar="true" active />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex';
import {
  Card,
  Icon,
  Avatar,
  Popconfirm,
  Skeleton,
} from 'ant-design-vue';

import passList from '@/graphql/listPasswords.gql';

export default {
  apollo: {
    passwords: {
      query: passList,
    },
  },

  components: {
    ACard: Card,
    AIcon: Icon,
    AAvatar: Avatar,
    APopconfirm: Popconfirm,
    ASkeleton: Skeleton,
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
  @media (max-width: 375px) {
    .password-subtitle {
      display: none;
    }
  }

  @media (max-width: 575px) {
    .password-text {
      padding-left: 0px !important;
    }
    .password-title {
      font-size: 1em !important;
    }
    .password-subtitle {
      font-size: 0.8em !important;
    }
  }

  .ant-skeleton {
    background: #fff;
    padding: 15px;
    margin-bottom: 12px;
  }

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

  .div-password {
    flex-grow: 2;
    display: inline-block;
    max-width: 75%;
  }
  .div-icon {
    display: inline-block;
    max-width: 10%;
  }
  .password-actions  {
    display: inline-block;
    max-width: 15%;
  }

  .password-text {
    padding-left: 25px;
    display: flex;
    flex-direction: column;
  }
  .password-icon {
    transition: all .2s;
    min-width: 32px;
  }

  .password-title {
    transition: all .2s;
    font-weight: bold;
    font-size: 1.2em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre;
    display: inline-block;
    width: 100%;
  }
  .password-subtitle {
    color: #aaa;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre;
    display: inline-block;
    width: 100%;
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
