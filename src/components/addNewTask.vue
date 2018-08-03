<template lang="pug">
.add-task
  form.add-task__form
    .form-item
      label(for="task-text") Описание задачи
      textarea#task-text
    .form-item
      label(for="task-project") Проект
      input(type="text")
    .form-item
      template(v-for="(value, index) in taskTypes")
        input(type="radio" v-bind:id="'task-type-' + index" name="task-type")
        label(v-bind:for="'task-type-' + index") {{value}}
      

  .add-task__preview
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      taskTypes: ["План", "Просрочка", "Доп", "Баг"]
    };
  }
};
</script>

<style lang="less" scoped>
.form-item {
  margin-bottom: 15px;
  label {
    display: block;
  }
}
</style>
