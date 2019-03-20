<template>
  <a-row :gutter="32">
    <a-col :span="8">
      <div v-bar class="content">
        <pass-list />
      </div>
    </a-col>
    <a-col :span="16">
      <div class="content white" />
    </a-col>
  </a-row>
</template>

<script>
import passList from '@/components/index/PassList';

export default {
  components: {
    passList,
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
