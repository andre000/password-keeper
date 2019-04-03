<template>
  <a-popover
    v-model="popoverStatus"
    trigger="click"
  >
    <template slot="content">
      <a-input
        :value="value"
        @keyup.enter="visible = false"
        @input="$emit('input', $event.target.value)"
      >
        <a-tooltip slot="addonAfter">
          <template slot="title">
            Go to the icons list
          </template>
          <a-icon style="cursor: pointer" type="link" @click="openIconPage" />
        </a-tooltip>
      </a-input>
    </template>
    <a-avatar class="icon-avatar" :style="passwordIconStyle" @click="visible = !visible">
      <i :class="value" class="mdi" />
    </a-avatar>
  </a-popover>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
    },

    isEditing: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    visible: false,
  }),

  computed: {
    passwordIconStyle() {
      return this.isEditing ? {
        background: '#1890ff',
        cursor: 'pointer',
      } : null;
    },
    popoverStatus: {
      get() {
        return this.visible && this.isEditing;
      },
      set(value) {
        this.visible = this.isEditing && value;
      },
    },
  },

  methods: {
    openIconPage() {
      window.open('https://materialdesignicons.com/');
    },
    handlePopover() {
      this.visible = !this.visible;
    },
  },
};
</script>

<style scoped>
</style>
