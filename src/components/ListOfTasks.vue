<template lang="pug">
.tasks
  .tasks__filter-radios
    .filter-radios__item
      input#all(type="radio" checked="checked" name="filter-tasks" @click="filter = null")
      label(for="all") Все задачи
    .filter-radios__item
      input#completed(type="radio" name="filter-tasks" @click="filter = true")
      label(for="completed") Выполненные
    .filter-radios__item
      input#not-completed(type="radio" name="filter-tasks" @click="filter = false")
      label(for="not-completed") Не выполненные
  .task(v-bind:class="['task_' + task.type, {completed: task.complete}]" v-for="(task, index) of filterTasks")
      .task__row.task__description Описание задачи: {{ task.description }}
      .task__row.task__project Проект: {{ task.project }}
      .task__row.task__executor Выполняет: {{ task.executor }}
      .task__row.task__time Время (ч): {{ task.time }}
      .task__row.task__comment(v-if="task.comment != null") Комментарий: {{ task.comment }}
      .task__row.task__date {{ task.date }}
      .form__item.to__complete(v-bind:title="task.complete ? 'Не выполнил' : 'Выполнил'")
        input.task__completed(type="checkbox" v-model="task.complete" v-bind:id="'complete-' + index")
        label(v-bind:for="'complete-' + index")
</template>

<script>
export default {
  data() {
    return {
      tasks: [
        {
          description: "Настройка целей яндекс метрика",
          project: "Софткасс",
          executor: "Алексей Завалин",
          time: 2,
          comment: null,
          date: "31 июля 2018",
          type: "plan",
          complete: true
        },
        {
          description: "Восстановление работы почты",
          project: "Азия Бас",
          executor: "Алексей Завалин",
          time: 2,
          comment: "Вирус",
          date: "17 июля 2018",
          type: "bug",
          complete: false
        },
        {
          description: "Доработка функционала корзины",
          project: "Beezone",
          executor: "Алексей Завалин",
          time: 4,
          date: "21 июля 2018",
          type: "addit",
          complete: false
        },
        {
          description: "Перенос сайта на Drupal",
          project: "Проект",
          executor: "Алексей Завалин",
          time: 1,
          date: "21 июля 2018",
          type: "delay",
          complete: true
        },
        {
          description: "Альфа: Мобильный адаптив",
          project: "Альфа",
          executor: "Никита Редин",
          time: 3,
          date: "21 июля 2018",
          type: "plan",
          complete: true
        }
      ],
      filter: null
    };
  },
  computed: {
    filterTasks: function() {
      console.log(this.filter);
      return this.tasks.filter(task => {
        if (this.filter != null) {
          return task.complete == this.filter;
        } else {
          return task;
        }
      });
    }
  }
};
</script>

<style lang="less">
@green: #5a9216;
.tasks {
  width: 700px;
  margin: 0 auto;
  .task {
    &.completed {
      box-shadow: inset 0 0 25px -3px @green;
    }
    padding: 10px 15px;
    border: 1px solid #eee;
    border-radius: 4px;
    margin-bottom: 20px;
    padding-right: 100px;
    position: relative;
    &.task_plan {
      background: fade(#2e7d32, 10%);
    }
    &.task_bug {
      background: fade(#dd2c00, 10%);
    }
    &.task_addit {
      background: fade(#00838f, 10%);
    }
    &.task_delay {
      background: fade(#e65100, 10%);
    }
    .task__completed {
      display: none;
      &:checked ~ label {
        border-color: lighten(@green, 15%);
        border-top-color: transparent;
        border-left-color: transparent;
        transform: rotate(35deg);
        width: 20px;
      }
    }
    .to__complete {
      position: absolute;
      top: 50%;
      right: 70px;
      width: 30px;
      height: 30px;
      margin-top: -15px;
      label {
        display: block;
        width: 30px;
        height: 30px;
        border: 3px solid darken(@green, 20%);
        cursor: pointer;
        transition: all 0.3s;
      }
    }
  }
}
</style>
