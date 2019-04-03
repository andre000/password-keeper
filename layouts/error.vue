<template>
  <div class="error-content">
    <a-icon type="exclamation-circle" />
    <h1>{{ error.statusCode }}</h1>
    <br>
    <p>{{ error.message }}</p>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => ({}),
    },
  },

  layout: 'message',

  created() {
    if (this.error.statusCode === 403) {
      this.$router.push('/login');
    }
  },
};
</script>

<style>
  .error-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .main .error-content h1 {
    color: #fff;
    font-size: 5.5em;
    font-weight: bold;
    margin-top: .25em
  }
  .main .error-content .anticon {
    color: #fff;
    font-size: 5em;
    font-weight: bold
  }
</style>
