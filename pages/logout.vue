<template>
  <div class="message">
    <a-icon type="logout" />
    <h1>
      Logging Out...
    </h1>
  </div>
</template>

<script>
import { logout } from '../utils';

export default {
  layout: 'message',
  async mounted() {
    await logout(this.$store, this.$apolloHelpers);
    setTimeout(() => {
      this.$router.push('/login');
    }, 1000);
  },
};
</script>

<style scoped>
  h1 {
    font-weight: bold;
    color: #fff;
    font-size: 2.5em;
  }

  i {
    font-weight: bold;
    font-size: 5em;
    color: #fff;
    display: block;
    margin-bottom: 36px;
  }

  .message {
    text-align: center
  }
</style>
