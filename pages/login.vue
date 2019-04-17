<template>
  <main>
    <a-row>
      <a-col class="logo-column" :md="12">
        <h1 class="title">
          Password Keeper
        </h1>
      </a-col>
      <a-col :sm="24" class="form-column" :md="12">
        <div class="login-message">
          <h2>Welcome Back!</h2>
          <h4>Log in to continue</h4>
        </div>
        <form>
          <div class="input-group">
            <a-input
              v-model="email"
              type="email"
              placeholder="Email"
              @keypress.enter="login"
            >
              <a-icon slot="prefix" type="user" />
              <a-icon v-if="email" slot="suffix" type="close-circle" @click="cleanEmail" />
            </a-input>
          </div>
          <div class="input-group">
            <a-input
              v-model="password"
              type="password"
              placeholder="Password"
              @keypress.enter="login"
            >
              <a-icon slot="prefix" type="lock" />
              <a-icon v-if="password" slot="suffix" type="close-circle" @click="cleanPass" />
            </a-input>
          </div>
          <div class="form-options">
            <a-checkbox>Remember me</a-checkbox>
            <a href="#">Forgot Password?</a>
          </div>
          <a-button type="primary" @click="login">
            Login
          </a-button>
        </form>
      </a-col>
    </a-row>
  </main>
</template>

<script>
import {
  Row,
  Col,
  Input,
  Icon,
  Checkbox,
  Button,
} from 'ant-design-vue';

import { login, logout } from '../utils';

export default {
  layout: 'login',
  components: {
    ARow: Row,
    ACol: Col,
    AInput: Input,
    AIcon: Icon,
    ACheckbox: Checkbox,
    AButton: Button,
  },
  data: () => ({
    email: '',
    password: '',
  }),

  mounted() {
    logout(this.$store, this.$apolloHelpers);
  },

  methods: {
    cleanEmail() {
      this.email = '';
    },
    cleanPass() {
      this.password = '';
    },
    async login() {
      const result = await login({
        email: this.email,
        password: this.password,
        store: this.$store,
        apollo: this.$apolloHelpers,
      });

      if (result === true) {
        this.$router.push('/');
      }
    },
  },
};
</script>

<style scoped>

@media screen and (max-width: 768px){
  .logo-column {
    display: none !important
  }
  .form-column {
    width: 100vw
  }
}
  .logo-column {
    padding: 5rem;
    background: linear-gradient(164deg, rgba(24,102,190,1) 0%,
      rgba(24,144,255,1) 35%,
      rgba(0,212,255,1) 100%);
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .title {
    color: #f2f2f2 !important;
    font-weight: bold;
    height: fit-content;
    font-size: 2.5vw
  }

  .form-column {
    padding: 7vw 10vw;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    flex-direction: column;
  }

  .input-group {
    margin-bottom: 1.25rem
  }

  .login-message h2 {
    font-weight: bold;
    color: rgba(24,144,255,1);
    text-align: center;
    font-size: 2rem;
    margin-bottom: 2px
  }

  .login-message h4 {
    color: #888;
    text-align: center;
    margin-bottom: 36px
  }

  .form-column form {
    width: 100%;
  }

  .form-column button {
    width: 100%;
    height: 42px;
  }

  .form-options {
    margin-bottom: 48px;
    display: flex;
    justify-content: space-between
  }
</style>

<style>
  .input-group .ant-input {
    height: 42px !important;
  }


</style>
