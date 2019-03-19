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
  middleware: 'auth',
  data: () => ({
    collapsed: false,
  }),
};
</script>
<style lang="scss" scoped>
@import url('~/assets/scss/main.scss');

.ant-layout-content {
  margin: 24px 16px;
  padding: 24px;
  min-height: 280px;
}

#main-menu {
  height: 100vh;
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color .3s;
    &:hover {
      color: #1890ff;
    }
  }

  .logo {
    height: 32px;
    margin: 16px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: bold;
    font-family: 'PT Sans', sans-serif;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
  }
}

.ant-menu-item-divider {
  background-color: #ffffff33;
}

.menu-subtitle {
  font-variant: all-small-caps;
  cursor: auto;
}
</style>
