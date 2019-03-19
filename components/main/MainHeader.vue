<template>
  <a-layout-header style="background: #fff; padding: 0">
    <div class="right-header">
      <user-avatar>
        {{ user }}
      </user-avatar>
    </div>
  </a-layout-header>
</template>

<script>
import UserAvatar from './UserAvatar';

export default {
  components: {
    UserAvatar,
  },
  props: {
    user: {
      type: String,
      required: true,
      default: '',
    },
  },
};
</script>

<style scoped>
  .right-header {
    text-align: right;
    margin-right: 36px;
  }
</style>
