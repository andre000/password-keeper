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
import {
  Avatar,
  Popover,
  AutoComplete,
  Select,
} from 'ant-design-vue';

export default {
  components: {
    AAvatar: Avatar,
    APopover: Popover,
    AAutoComplete: AutoComplete,
    ASelectOption: Select.Option,
  },
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
    mdi: [],
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
    async getIconList(search) {
      const realSearch = search.replace(/mdi|-/, '').toLowerCase();
      if (realSearch.length < 3) {
        this.iconList = [];
        return;
      }

      if (this.mdi.length === 0) {
        this.mdi = await import(/* webpackPrefetch: true *//* webpackChunkName: "mdi"  */ '@mdi/js');
      }

      this.iconList = Object.keys(this.mdi)
        .filter(k => k.toLowerCase().match(realSearch))
        .map(k => ({
          title: k.replace(/([A-Z])/g, '-$1').toLowerCase(),
          value: this.mdi[k],
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
