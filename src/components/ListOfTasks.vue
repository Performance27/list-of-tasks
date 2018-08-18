<template lang="pug">
.tasks
  .tasks__filter
    .tasks__filter-radios
      .tasks__filter-radios-item
        input#all(type="radio" checked="checked" name="filter-tasks" @click="filterComplete = null")
        label(for="all") Все задачи
      .tasks__filter-radios-item
        input#completed(type="radio" name="filter-tasks" @click="filterComplete = true")
        label(for="completed") Выполненные
      .tasks__filter-radios-item
        input#not-completed(type="radio" name="filter-tasks" @click="filterComplete = false")
        label(for="not-completed") Не выполненные
    .tasks__filter-type
      .tasks__filter-type-item
        input#all-types(type="radio" value="" name="type" checked v-model="filterType")
        label(for="all-types") Все типы
      .tasks__filter-type-item(v-for="type of types") 
        input(v-bind:id="type.value" name="type" v-model="filterType" v-bind:value="type.value" type="radio")
        label(v-bind:for="type.value") {{type.name}}       
  .tasks__item(v-bind:class="['task_' + task.type, {completed: task.complete}]" v-for="task of getTasks")
      .tasks__item-row.tasks__item-description Описание задачи: {{ task.description }}
      .tasks__item-row.tasks__item-project Проект: {{ task.project }}
      .tasks__item-row.tasks__item-executor Выполняет: {{ task.executor }}
      .tasks__item-row.tasks__item-time Время (ч): {{ task.time }}
      .tasks__item-row.tasks__item-comment(v-if="task.comment != null") Комментарий: {{ task.comment }}
      .tasks__item-row.task__date {{ task.date }}
      .form__item.to__complete(v-bind:title="task.complete ? 'Не выполнил' : 'Выполнил'")
        input.task__completed(type="checkbox" v-model="task.complete" v-bind:id="'complete-' + index")
        label(v-bind:for="'complete-' + index")
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      types: [
        {
          name: "План",
          value: "plan"
        },
        {
          name: "Доп",
          value: "addit"
        },
        {
          name: "Просрочка",
          value: "delay"
        },
        {
          name: "Баг",
          value: "bug"
        }
      ],
      filterComplete: null,
      filterExecutor: "",
      filterType: ""
    };
  },
  computed: {
    // filterTasks: function() {
    //   return this.tasks.filter(task => {
    //     if (this.filterComplete != null) {
    //       return (
    //         task.complete == this.filterComplete &&
    //         task.executor.match(this.filterExecutor) &&
    //         task.type.match(this.filterType)
    //       );
    //     } else {
    //       return (
    //         task &&
    //         task.executor.match(this.filterExecutor) &&
    //         task.type.match(this.filterType)
    //       );
    //     }
    //   });
    // },
    // executors: function() {
    //   var executors = [];
    //   this.tasks.forEach(function(item) {
    //     executors.push(item.executor);
    //   });
    //   return unique(executors);
    // },
    getTasks: function() {
      var tasks = [];
      firebase
        .database()
        .ref("tasks")
        .limitToLast(10)
        .once("value", function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            tasks.push(childData);
          });
        });
      return tasks;
    }
  }
};

function unique(arr) {
  var obj = {};

  for (var i = 0; i < arr.length; i++) {
    var str = arr[i];
    obj[str] = true; // запомнить строку в виде свойства объекта
  }

  return Object.keys(obj); // или собрать ключи перебором для IE8-
}
</script>

<style lang="less">
@green: #5a9216;
.tasks {
  width: 700px;
  margin: 0 auto;
  .tasks__item {
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
