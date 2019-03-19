<template>
  <a-row :gutter="16">
    <a-col :span="12">
      <div class="content" />
    </a-col>
    <a-col :span="12">
      <div class="content" />
    </a-col>
  </a-row>
</template>

<script>
export default {
};
</script>

<style scoped>
.content {
  background: #fff;
  padding: 5px;
  height: calc(100vh - 144px);
}
</style>
