<template>
  <a-popover
    v-model="popoverStatus"
    trigger="click"
  >
    <template slot="content">
      <a-auto-complete
        option-label-prop="data-value"
        :data-source="iconList"
        :value="value"
        @search="searchIcon"
        @select="selectIcon"
      >
        <template slot="dataSource">
          <a-select-option
            v-for="icon in iconList"
            :key="icon.title"
            :data-value="icon.title"
            class="icon-option"
          >
            <svg width="25px" height="25px">
              <path :d="icon.value" />
            </svg>
            <span>{{ icon.title }}</span>
          </a-select-option>
        </template>
      </a-auto-complete>
    </template>
    <a-avatar class="icon-avatar" :style="passwordIconStyle" @click="visible = !visible">
      <i :class="value" class="mdi" />
    </a-avatar>
  </a-popover>
</template>

<script>
import * as mdi from '@mdi/js';

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
    iconList: null,
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
    searchIcon(value) {
      this.$emit('input', value);
      this.getIconList(value);
    },
    selectIcon(value) {
      this.$emit('input', value);
      this.handlePopover();
    },
    getIconList(search) {
      const realSearch = search.replace(/mdi|-/, '').toLowerCase();
      if (realSearch.length < 3) {
        this.iconList = [];
        return;
      }

      this.iconList = Object.keys(mdi)
        .filter(k => k.toLowerCase().match(realSearch))
        .map(k => ({
          title: k.replace(/([A-Z])/g, '-$1').toLowerCase(),
          value: mdi[k],
        }));
    },
  },
};
</script>

<style>
.icon-option {
  font-size: 12px;
  color: #777;
  display: flex;
  align-items: center;
}
.icon-option span {
  display: inline-block;
  width: calc(100% - 30px);
}
.icon-option svg {
  fill: #1890ff;
  margin-right: 5px
}
</style>
