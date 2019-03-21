<template>
  <a-input-group>
    <a-form-item :label="title">
      <a-input
        v-model="fieldValue"
        :type="fieldType()"
      >
        <div slot="addonAfter" class="field-actions">
          <a-tooltip placement="top">
            <template slot="title">
              <span>{{ decryped ? "Hide Value" : "Decrypt Value" }}</span>
            </template>
            <a-icon :type="lockType()" @click="decrypt" />
          </a-tooltip>
          <a-tooltip placement="top">
            <template slot="title">
              <span>Copy to Clipboard</span>
            </template>
            <a-icon type="copy" @click="copy" />
          </a-tooltip>
        </div>
      </a-input>
    </a-form-item>
  </a-input-group>
</template>

<script>
import { copyToClipboard } from '@/utils';
import decryptOne from '@/graphql/decrypt.gql';

export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },

  data: () => ({
    decryped: false,
    decryptedValue: '',
  }),

  computed: {
    fieldValue() {
      return this.decryped ? this.decryptedValue : this.value;
    },
  },

  methods: {
    async decrypt() {
      if (this.decryped) {
        this.decryped = false;
        return true;
      }

      if (this.decryptedValue) {
        this.decryped = true;
        return true;
      }

      const client = this.$apollo.getClient();
      const { data } = await client.query({
        query: decryptOne,
        variables: { value: this.value },
      });

      this.decryptedValue = data.decrypt;
      this.decryped = true;
      return true;
    },

    lockType() {
      return this.decryped ? 'lock' : 'unlock';
    },
    fieldType() {
      return this.decryped ? 'text' : 'password';
    },

    async copy() {
      if (!this.decryped) {
        await this.decrypt();
        this.decryped = false;
      }
      copyToClipboard(this.decryptedValue);
      this.$message.info('Copied to the Clipboard!');
    },
  },
};
</script>

<style scoped>
  .field-actions i {
    cursor: pointer
  }
</style>
