<template>
  <a-layout id="main-menu">
    <a-layout-sider
      v-model="collapsed"
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
      <a-menu theme="dark" mode="inline" :default-selected-keys="['1']">
        <a-menu-item key="1">
          <a-icon type="bars" />
          <span>All Items</span>
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item v-if="!collapsed" class="menu-subtitle" disabled>
          FOLDERS
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="()=> collapsed = !collapsed"
        />
      </a-layout-header>
      <a-layout-content>
        <nuxt />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
export default {
  data: () => ({
    collapsed: false,
  }),
};
</script>
<style scoped>
.ant-layout-content {
  margin: 24px 16px;
  padding: 24px;
  background: #fff;
  min-height: 280px;
}

#main-menu .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color .3s;
}

#main-menu .trigger:hover {
  color: #1890ff;
}

#main-menu .logo {
  height: 32px;
  margin: 16px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: bold;
  color: white;
  display: flex;
  align-content: center;
  justify-content: center;
}

.ant-menu-item-divider {
  background-color: #ffffff33;
}

.menu-subtitle {
  font-variant: all-small-caps;
  cursor: auto;
}
</style>
