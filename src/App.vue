<template lang="pug">
.app-wrapper(v-bind:class="{light: lightTheme.enabled, dark: darkTheme.enabled}")
  .theme-switcher
    input.theme-switcher__input#theme-switcher(v-on:change="changeTheme" type="checkbox")
    label.theme-switcher__label(for="theme-switcher") Тема: {{lightTheme.enabled ? lightTheme.name : darkTheme.name}}
  months
  days
  add-task
  list-of-tasks
</template>

<script>
import Months from "./components/Months";
import Days from "./components/Days";
import addNewTask from "./components/addNewTask";
import listOfTasks from "./components/ListOfTasks";

export default {
  components: {
    months: Months,
    days: Days,
    "add-task": addNewTask,
    "list-of-tasks": listOfTasks
  },
  name: "app",
  data() {
    return {
      lightTheme: {
        name: "Светлая",
        enabled: true
      },
      darkTheme: {
        name: "Темная",
        enabled: false
      }
    };
  },
  methods: {
    changeTheme: function() {
      this.lightTheme.enabled = !this.lightTheme.enabled;
      this.darkTheme.enabled = !this.darkTheme.enabled;
    }
  }
};
</script>

<style lang="less">
@green: #5a9216;
html,
body {
  font-size: 16px;
  font-family: "Open Sans", sans-serif;
  padding: 0;
  margin: 0;
}
* {
  box-sizing: border-box;
  &:before,
  &:after {
    box-sizing: border-box;
  }
}
.app-wrapper {
  width: 1140px;
  margin: 0 auto;
  transition: all 0.3s;
  &.dark {
    background: #1c313a;
    color: lighten(@green, 35%);
    input[type="text"],
    input[type="password"],
    input[type="email"],
    textarea {
      background: lighten(#1c313a, 10%);
      &::placeholder {
        color: lighten(@green, 30%);
      }
    }
  }
}
.theme-switcher {
  display: flex;
  justify-content: flex-end;
  position: relative;
  .theme-switcher__label {
    width: 160px;
    padding-right: 45px;
    &:after {
      content: "";
      position: absolute;
      height: 11px;
      width: 25px;
      right: 10px;
      top: 5px;
      border-radius: 10px;
      border: 1px solid @green;
      cursor: pointer;
      transition: all 0.2s;
      z-index: 1;
      background: lighten(@green, 15%);
    }
    &:before {
      content: "";
      position: absolute;
      height: 18px;
      width: 18px;
      right: 20px;
      top: 2px;
      border-radius: 50%;
      background: darken(@green, 15%);
      cursor: pointer;
      transition: all 0.2s;
      z-index: 2;
    }
  }
  .theme-switcher__input {
    display: none;
    &:checked ~ .theme-switcher__label {
      &:after {
        background: lighten(@green, 70%);
      }
      &:before {
        right: 5px;
        background: lighten(@green, 15%);
      }
    }
  }
}
</style>
