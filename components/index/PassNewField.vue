<template>
  <div>
    <div class="ant-form-item-label">
      <label>New Field</label>
    </div>
    <a-input-group style="margin-bottom: 18px" compact>
      <a-input v-model="editTitle" style="width: 25%" placeholder="Title" />
      <a-input v-model="editValue" style="width: 70%" placeholder="Value" />
      <a-tooltip>
        <template slot="title">
          Delete new Field
        </template>
        <a-button style="width: 5%" type="danger" icon="delete" @click="$emit('delete')" />
      </a-tooltip>
    </a-input-group>
  </div>
</template>

<script>
import {
  Input,
  Tooltip,
  Button,
} from 'ant-design-vue';

export default {
  components: {
    AInput: Input,
    AInputGroup: Input.Group,
    ATooltip: Tooltip,
    AButton: Button,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
  },

  computed: {
    editTitle: {
      get() {
        return this.title;
      },
      set(value) {
        this.$emit('changeValue', { key: 'title', value });
      },
    },
    editValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('changeValue', { key: 'value', value });
      },
    },
  },
};
</script>

<style>

</style>
