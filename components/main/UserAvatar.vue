<template>
  <div class="user-avatar">
    <a-dropdown :trigger="['click']">
      <a id="user-avatar-name" class="ant-dropdown-link" href="#">
        <a-avatar id="user-avatar-image" icon="user" />
        <slot /> <a-icon type="down" />
      </a>
      <a-menu slot="overlay">
        <a-menu-item key="0">
          <a-icon type="setting" />Options
        </a-menu-item>
        <a-menu-item key="1">
          <a-icon type="key" />Change Password
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item key="2" @click="$router.push('/login')">
          <a-icon type="logout" />
          Logout
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
import {
  Avatar,
  Menu,
  Dropdown,
  Icon,
} from 'ant-design-vue';

export default {
  components: {
    AAvatar: Avatar,
    AMenu: Menu,
    AMenuItem: Menu.Item,
    AMenuDivider: Menu.Divider,
    ADropdown: Dropdown,
    AIcon: Icon,
  },
};
</script>

<style scoped>
#user-avatar-image {
  margin-right: 5px;
}

#user-avatar-name {
  text-decoration: none;
}

</style>

<style>
.user-avatar .ant-dropdown-menu {
  display: flex;
  align-items: center;
}
</style>
