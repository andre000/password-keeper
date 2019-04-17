<template>
  <a-row :gutter="32">
    <a-col :lg="8" :sm="24">
      <pass-filter />
      <div class="content list">
        <pass-list />
      </div>
    </a-col>
    <a-col :lg="16" :sm="24">
      <div v-show="selectedPassID" class="content detail">
        <pass-detail />
      </div>
    </a-col>
  </a-row>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import {
  Row,
  Col,
} from 'ant-design-vue';

import passList from '@/components/index/PassList';
import passDetail from '@/components/index/PassDetail';
import passFilter from '@/components/index/PassFilter';

export default {
  components: {
    ARow: Row,
    ACol: Col,
    passList,
    passDetail,
    passFilter,
  },

  computed: {
    ...mapState('mainPage', ['selectedPassID']),
  },

  created() {
    this.SET_SELECTED_PASS(null);
    this.SET_SELECTED_PASS_ID(null);
  },

  methods: {
    ...mapMutations('mainPage', ['SET_SELECTED_PASS_ID', 'SET_SELECTED_PASS']),
  },


};
</script>

<style scoped>
@media (max-width: 992px) {
  .content.detail {
    margin-top: 12px !important;
  }
}

.content {
  overflow-y: auto;
  overflow-x: hidden;
}

.content.list {
  height: calc(100vh - 212px);
}
.content.detail {
  height: calc(100vh - 144px);
}
.content.white {
  padding: 5px;
  background: #fff;
}
</style>
