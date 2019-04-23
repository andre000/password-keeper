<template>
  <div style="position: relative">
    <editor-menu-bar v-if="!disabled" :editor="editor">
      <div slot-scope="{ commands, isActive }" class="menubar">
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          <i class="mdi mdi-format-bold" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
          <i class="mdi mdi-format-italic" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.strike() }"
          @click="commands.strike"
        >
          <i class="mdi mdi-format-strikethrough" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
        >
          <i class="mdi mdi-format-underline" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.code() }"
          @click="commands.code"
        >
          <i class="mdi mdi-code-braces" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.paragraph() }"
          @click="commands.paragraph"
        >
          <i class="mdi mdi-format-paragraph" />
        </button>

        <button
          class="menubar__button letter"
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
        >
          H1
        </button>

        <button
          class="menubar__button letter"
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >
          H2
        </button>

        <button
          class="menubar__button letter"
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
        >
          H3
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          <i class="mdi mdi-format-list-bulleted" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
          <i class="mdi mdi-format-list-numbered" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.blockquote() }"
          @click="commands.blockquote"
        >
          <i class="mdi mdi-format-quote-close" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.code_block() }"
          @click="commands.code_block"
        >
          <i class="mdi mdi-code-braces" />
        </button>

        <button
          class="menubar__button"
          @click="commands.horizontal_rule"
        >
          <i class="mdi mdi-minus" />
        </button>

        <button
          class="menubar__button"
          @click="commands.undo"
        >
          <i class="mdi mdi-undo" />
        </button>

        <button
          class="menubar__button"
          @click="commands.redo"
        >
          <i class="mdi mdi-redo" />
        </button>
      </div>
    </editor-menu-bar>

    <editor-content
      :editor="editor"
      class="editor markdown-body ant-input"
      :class="disabled ? 'readonly' : ''"
    />
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap';
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Image,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
} from 'tiptap-extensions';

export default {
  components: {
    EditorContent,
    EditorMenuBar,
  },

  props: {
    value: {
      type: Object,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    editor: null,
  }),

  watch: {
    disabled() {
      this.editor.setOptions({ editable: !this.disabled });
    },
    value() {
      if (this.value) {
        this.editor.setContent(this.value);
      } else {
        this.editor.clearContent();
      }
    },
  },

  mounted() {
    this.editor = new Editor({
      content: this.value,
      extensions: [
        new Blockquote(),
        new BulletList(),
        new CodeBlock(),
        new HardBreak(),
        new Heading({ levels: [1, 2, 3] }),
        new HorizontalRule(),
        new ListItem(),
        new OrderedList(),
        new TodoItem(),
        new TodoList(),
        new Bold(),
        new Code(),
        new Italic(),
        new Link(),
        new Strike(),
        new Underline(),
        new History(),
        new Image(),
      ],
      editable: !this.disabled,
      onBlur: () => {
        if (this.editor.getHTML() === '<p></p>') return this.$emit('input', null);
        return this.$emit('input', this.editor.getJSON());
      },
    });
  },

  beforeDestroy() {
    this.editor.destroy();
  },

};
</script>

<style scoped>
  .editor.ant-input {
    height: auto;
    margin-bottom: 4px;
    overflow:auto;
  }

  .editor.readonly {
    border: none !important;
  }

  .menubar {
    display: flex;
    height: 36px;
    align-items: center;
  }

  .menubar__button {
    padding: 0px;
    border: none;
    background: none;
    height: 32px;
    display: inline-flex;
    justify-content: center;
    outline: none;
    cursor: pointer;
    align-items: center;
    font-weight: bold;
    width: 46px;
  }

  .letter {
    font-size: 10px;
    line-height: 38px;
  }

</style>

<style>
  .editor .ProseMirror {
    padding: 0;
    margin: 0;
    outline: none;
  }
</style>
