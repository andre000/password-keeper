<template>
  <a-layout-sider
    v-model="collapsed"
    style="height: 100vh"
    breakpoint="sm"
    collapsible
  >
    <div class="logo">
      <template v-if="!collapsed">
        Password Keeper
      </template>
      <template v-else>
        PK
      </template>
    </div>
    <a-menu
      theme="dark"
      mode="vertical"
      :default-selected-keys="['1']"
    >
      <a-menu-item key="1" @click="$router.push('/')">
        <a-icon type="bars" />
        <span>All Items</span>
      </a-menu-item>
      <a-menu-divider />
      <a-menu-item v-if="!collapsed" class="menu-subtitle" disabled>
        FOLDERS
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import {
  Layout,
  Icon,
  Menu,
} from 'ant-design-vue';

export default {
  components: {
    AMenu: Menu,
    AMenuItem: Menu.Item,
    AMenuDivider: Menu.Divider,
    AIcon: Icon,
    ALayoutSider: Layout.Sider,
  },
  data: () => ({
    collapsed: false,
  }),
};
</script>

<style>

</style>
