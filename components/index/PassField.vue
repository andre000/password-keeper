<template>
  <a-input-group>
    <a-form-item :label="title">
      <a-input
        v-model="fieldValue"
        class="pass-field"
        :disabled="!isEditing"
        :type="fieldType"
        @input="$emit('input', { key: 'value', value: fieldValue})"
      >
        <div slot="addonAfter" class="field-actions">
          <a-tooltip placement="top">
            <template slot="title">
              <span>{{ decryped ? "Hide Value" : "Decrypt Value" }}</span>
            </template>
            <a-icon :type="lockType" @click="decrypt" />
          </a-tooltip>
          <a-tooltip placement="top">
            <template slot="title">
              <span>Copy to Clipboard</span>
            </template>
            <a-icon type="copy" @click="copy" />
          </a-tooltip>
          <a-tooltip v-if="isEditing" placement="top">
            <template slot="title">
              <span>Delete Field</span>
            </template>
            <a-icon type="delete" @click="deleteField" />
          </a-tooltip>
        </div>
      </a-input>
    </a-form-item>
  </a-input-group>
</template>

<script>
import {
  Input,
  Form,
  Tooltip,
  Icon,
  message,
} from 'ant-design-vue';

import { copyToClipboard } from '@/utils';
import decryptOne from '@/graphql/decrypt.gql';

export default {
  components: {
    AInput: Input,
    AInputGroup: Input.Group,
    AFormItem: Form.Item,
    ATooltip: Tooltip,
    AIcon: Icon,
  },

  props: {
    value: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    isEditing: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    decryped: false,
    decryptedValue: '',
  }),

  computed: {
    fieldValue: {
      get() {
        if (this.isEditing && !this.decryptedValue) {
          this.decrypt();
        }
        return (this.decryped || this.isEditing) ? this.decryptedValue : this.value;
      },
      set(value) {
        this.decryptedValue = value;
      },
    },
    lockType() {
      return this.decryped ? 'lock' : 'unlock';
    },
    fieldType() {
      return this.decryped ? 'text' : 'password';
    },
  },

  watch: {
    isEditing() {
      if (this.isEditing === false) {
        this.decryptedValue = '';
      }
      this.decryped = false;
    },
  },

  mounted() {
    this.$message = message;
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

      if (Number.isNaN(parseInt(this.value, 16))) return false;

      const { data } = await client.query({
        query: decryptOne,
        variables: { value: this.value },
      });

      this.decryptedValue = data.decrypt;
      this.decryped = !this.isEditing;
      this.$emit('input', { key: 'value', value: this.fieldValue });
      return true;
    },

    async copy() {
      if (!this.decryped) {
        await this.decrypt();
        this.decryped = false;
      }
      copyToClipboard(this.decryptedValue);
      this.$message.info('Copied to the Clipboard!');
    },

    deleteField() {
      this.$emit('delete');
    },
  },
};
</script>

<style scoped>
  .field-actions i {
    cursor: pointer
  }
</style>

<style>
  .pass-field input:disabled {
    background: #fff;
    color: #888;
    cursor: initial;
  }
</style>
