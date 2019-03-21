<template>
  <div v-if="selectedPass">
    <div class="password-detail">
      <a-form>
        <h3>Details</h3>
        <a-form-item label="Title">
          <a-input v-model="selectedPass.title" />
        </a-form-item>
        <a-form-item label="Username">
          <a-input v-model="selectedPass.username" />
        </a-form-item>
      </a-form>
    </div>

    <div class="password-detail">
      <a-form>
        <h3>Fields</h3>
        <pass-field
          v-for="(field, key) in selectedPass.fields"
          :key="key"
          :value="field.value"
          :title="field.title"
        />
      </a-form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import PassField from '@/components/index/PassField';

export default {
  components: {
    PassField,
  },

  computed: {
    ...mapState('mainPage', ['selectedPassID', 'selectedPass']),
  },

  watch: {
    async selectedPassID() {
      await this.getPassDetail(this.selectedPassID);
    },
  },

  methods: {
    ...mapActions('mainPage', ['getPassDetail']),
  },
};
</script>

<style scoped>
  .password-detail {
    padding: 36px 56px 18px;
    background: #fff;
  }
  .password-detail:last-child {
    margin-top: 18px
  }
</style>
