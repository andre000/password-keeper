<template>
  <div v-if="selectedPassID">
    <div v-if="!loading.detail" class="password-detail">
      <div class="password-tools">
        <a-tooltip v-if="!isEditing">
          <template slot="title">
            Edit Password
          </template>
          <a-button type="primary" icon="edit" shape="circle" @click="enableEdit" />
        </a-tooltip>
        <a-tooltip v-if="isEditing">
          <template slot="title">
            Save Password
          </template>
          <a-button type="default" icon="save" shape="circle" @click="saveEdit" />
        </a-tooltip>
        <a-tooltip v-if="isEditing">
          <template slot="title">
            Cancel Changes
          </template>
          <a-button type="danger" icon="close" shape="circle" @click="cancelEdit" />
        </a-tooltip>
      </div>

      <a-form>
        <h3>{{ selectedPassID === 'NEW' ? 'New Password' : 'Details' }}</h3>
        <a-form-item class="form-with-icon" label="Title">
          <pass-icon v-model="pass.icon" :is-editing="isEditing" />
          <a-input v-model="pass.title" :disabled="!isEditing" />
        </a-form-item>
        <a-form-item label="Username">
          <a-input v-model="pass.username" :disabled="!isEditing" />
        </a-form-item>
      </a-form>
    </div>
    <a-skeleton
      :avatar="true"
      :paragraph="{rows: 4}"
      :title="false"
      active
      class="password-detail"
    />

    <div v-if="!loading.detail" class="password-detail">
      <a-form>
        <h3>Fields</h3>
        <pass-field
          v-for="(field, key) in pass.fields"
          :key="`pf-${key}`"
          :is-editing="isEditing"
          :value="field.value"
          :title="field.title"
          @delete="handleFieldDelete(key)"
          @input="changeFieldValue($event, key)"
        />

        <pass-new-field
          v-for="(newField, k) in newFields"
          :key="k"
          :title="newField.title"
          :value="newField.value"
          @changeValue="handleChangeNewField($event, newField)"
          @delete="handleDeleteNewField(k)"
        />

        <a-button
          v-if="isEditing"
          block
          style="margin-bottom: 18px"
          type="dashed"
          @click="addNewField"
        >
          <a-icon type="plus" /> Add New Field
        </a-button>
      </a-form>
    </div>
    <a-skeleton v-else :avatar="false" :title="false" active class="password-detail" />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
// import decryptOne from '@/graphql/decrypt.gql';
import PassField from '@/components/index/PassField';
import PassNewField from '@/components/index/PassNewField';
import PassIcon from '@/components/index/PassIcon';

export default {
  components: {
    PassField,
    PassIcon,
    PassNewField,
  },

  data: () => ({
    isEditing: false,
    pass: {},
    newFields: [],
  }),

  computed: {
    ...mapState('mainPage', ['selectedPassID', 'selectedPass', 'loading']),
  },

  watch: {
    async selectedPassID() {
      if (this.selectedPassID === 'NEW') {
        this.pass = {};
        this.isEditing = true;
        return;
      }
      await this.getPassDetail(this.selectedPassID);
      this.pass = JSON.parse(JSON.stringify(this.selectedPass)) || {};
    },
  },

  methods: {
    enableEdit() {
      this.isEditing = true;
    },
    async saveEdit() {
      const editedPass = this.pass;
      if (!editedPass.fields) {
        editedPass.fields = [];
      }

      editedPass.fields = [
        ...editedPass.fields.map((d) => {
          // eslint-disable-next-line
          delete (d.__typename);
          return d;
        }),
        ...this.newFields,
      ];

      await this.savePassword({
        id: editedPass._id === 'NEW' ? null : editedPass._id,
        icon: editedPass.icon,
        title: editedPass.title,
        username: editedPass.username,
        fields: editedPass.fields,
      });

      this.newFields = [];
      await this.getPassDetail(editedPass._id);

      this.pass = JSON.parse(JSON.stringify(this.selectedPass)) || {};
      this.isEditing = false;
    },
    cancelEdit() {
      this.pass = JSON.parse(JSON.stringify(this.selectedPass)) || {};
      this.isEditing = false;
      this.newFields = [];
      if (this.selectedPassID === 'NEW') this.SET_SELECTED_PASS_ID(null);
    },
    async addNewField() {
      this.newFields = [...this.newFields, { title: '', value: '' }];
      await this.$nextTick();
    },
    handleChangeNewField({ key, value }, field) {
      // eslint-disable-next-line
      field[key] = value;
    },
    handleDeleteNewField(index) {
      this.newFields.splice(index, 1);
    },
    handleFieldDelete(index) {
      this.pass.fields.splice(index, 1);
    },
    changeFieldValue({ key, value }, index) {
      this.pass.fields[index][key] = value;
    },
    ...mapActions('mainPage', ['getPassDetail', 'savePassword']),
    ...mapMutations('mainPage', ['SET_SELECTED_PASS_ID']),
  },
};
</script>

<style scoped>
  @media (max-width: 575px) {
    .password-detail {
      padding: 18px 28px 9px !important;
    }
  }

  .password-detail {
    position: relative;
    padding: 36px 56px 18px;
    background: #fff;
  }
  .password-detail:not(:first-child) {
    margin-top: 12px
  }
  .button-detail {
    padding: 18px 0px !important;
    background: #fff;
    text-align: center;
  }
  .password-tools {
    position: absolute;
    top: 18px;
    right: 18px;
  }
  .form-with-icon >>> .ant-form-item-children {
    display: flex;
  }
  .form-with-icon >>> .ant-avatar {
    margin-right: 6px;
    min-width: 32px;
  }
  input:disabled {
    background: #fff;
    color: #888;
    cursor: initial;
  }
</style>
