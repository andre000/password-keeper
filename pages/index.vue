<template>
  <a-row :gutter="32">
    <a-col :span="8">
      <div class="content">
        <pass-list />
      </div>
    </a-col>
    <a-col :span="16">
      <div class="content">
        <pass-detail />
      </div>
    </a-col>
  </a-row>
</template>

<script>
import passList from '@/components/index/PassList';
import passDetail from '@/components/index/PassDetail';

export default {
  components: {
    passList,
    passDetail,
  },
};
</script>

<style scoped>
.content {
  height: calc(100vh - 144px);
  overflow-y: auto;
}
.content.white {
  padding: 5px;
  background: #fff;
}
</style>
