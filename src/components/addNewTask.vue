<template lang="pug">
.container
  .add-task(v-if="userIsAuthenticated")
    form.add-task__form(@submit.prevent="addTask")
      .form-item
        label(for="task-text") Описание задачи
        textarea#task-text(v-model="task.description")
      .form-item
        label(for="task-project") Проект
        input(type="text" v-model="task.project")
      .form-item.radios
        .radios__item(v-for="(value, index) in taskTypes" v-bind:key="index")
          input(type="radio" v-bind:id="'task-type-' + index" name="task-type" v-bind:value="value.name" required)
          label(v-bind:for="'task-type-' + index" v-bind:class="'radios__item_' + value.class" @click="comment = value.comment; task.type = value.class;") {{value.name}}
      .form-item(v-if="comment")
        label(for="comment") Комментарий
        textarea#comment(v-model="task.comment")
      .form-item
        label(for="time") Время (ч)
        input#time(type="text" v-model="task.time")
      .form-item.radios
        .radios__item
          input(type="radio" value="Текущая" name="date" id="current" checked="checked")
          label(for="current" class="radios__item_default" @click="own = false") Текущая
        .radios__item
          input(type="radio" value="Собственная" name="date" id="own")
          label(for="own" class="radios__item_default" @click="own = true") Собственная
      .form-item(v-if="own")
        label(for="calendar") Дата
        input.calendar#calendar(type="date" v-model="task.date")
      .form-item
        input#complete(v-model="task.complete" type="checkbox")
        label(for="complete") Выполнена
      .form-actions
        button#add-task.btn.btn_submit(@click="addTask") Добавить задачу
    .add-task__preview
      .task(v-bind:class="'task_' + task.type")
        .task__description {{ task.description }}
        .task__project {{ task.project }}
        .task__executor {{task.executor}}
        .task__time {{ task.time }}
        .task__comment(v-if="task.comment != null") {{ task.comment }}
        .task__date {{ task.date }}
  .alert(v-else) Вы не вошли или не зарегистрированы
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      task: {
        description: "",
        project: "",
        comment: "",
        time: "",
        complete: false,
        type: "",
        date: "",
        executor: ""
      },
      own: false,
      comment: false,
      taskTypes: [
        {
          name: "План",
          class: "plan",
          comment: false
        },
        {
          name: "Доп",
          class: "addit",
          comment: false
        },
        {
          name: "Просрочка",
          class: "delay",
          comment: true
        },
        {
          name: "Баг",
          class: "bug",
          comment: true
        }
      ]
    };
  },
  computed: {
    user() {
      this.$store.getters.user;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    }
  },
  methods: {
    addTask: function() {
      var now = new Date();
      var date;
      if (!this.own) {
        date = now.getFullYear() + "-" + now.getMonth() + "-" + now.getDate();
      } else {
        date = this.task.date;
      }
      var tasks = firebase.database().ref("tasks");
      var newTask = tasks.push();
      newTask.set({
        description: this.task.description,
        project: this.task.project,
        comment: this.task.comment,
        time: this.task.time,
        complete: this.task.complete,
        type: this.task.type,
        date: date,
        executor: this.$store.getters.user.name
      });
      // firebase
      //   .database()
      //   .ref("tasks/" + id * 1000)
      //   .set({
      //     description: this.task.description,
      //     project: this.task.project,
      //     comment: this.task.comment,
      //     time: this.task.time,
      //     complete: this.task.complete,
      //     type: this.task.type,
      //     date: date,
      //     executor: this.$store.getters.user.name
      //   });
    }
  }
};
</script>

<style lang="less" scoped>
@green: #5a9216;
.add-task {
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  .add-task__form {
    width: 400px;
  }
  .add-task__preview {
    width: 700px;
  }
}
.form-item {
  margin-bottom: 15px;
  input[type="text"],
  textarea {
    display: block;
    width: 100%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    &:focus {
      color: #495057;
      background-color: #fff;
      border-color: #80bdff;
      outline: 0;
      box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }
  }
  label {
    display: inline-block;
    margin-bottom: 0.5rem;
  }
}

.form-actions {
  button,
  input[type="submit"] {
    cursor: pointer;
    &.btn {
      display: inline-block;
      font-weight: 400;
      text-align: center;
      white-space: nowrap;
      vertical-align: middle;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      border: 1px solid transparent;
      padding: 0.375rem 0.75rem;
      font-size: 1rem;
      line-height: 1.5;
      border-radius: 0.25rem;
      transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
      &_submit {
        color: #fff;
        background-color: #1565c0;
        border-color: #1565c0;
      }
    }
  }
}

.radios {
  display: flex;
  .radios__item {
    margin-right: 5px;
    margin-bottom: 15px;
    input {
      display: none;
      &:checked ~ label {
        &.radios__item_plan {
          background: fade(#2e7d32, 50%);
        }
        &.radios__item_bug {
          background: fade(#dd2c00, 50%);
        }
        &.radios__item_addit {
          background: fade(#00838f, 50%);
        }
        &.radios__item_delay {
          background: fade(#e65100, 50%);
        }
        &.radios__item_default {
          background: fade(#757575, 50%);
        }
      }
    }
    label {
      padding: 10px 20px;
      border: 1px solid;
      border-radius: 2px;
      cursor: pointer;
      &.radios__item_plan {
        border-color: #2e7d32;
        color: darken(#2e7d32, 30%);
      }
      &.radios__item_bug {
        border-color: #dd2c00;
        color: darken(#dd2c00, 30%);
      }
      &.radios__item_addit {
        border-color: #00838f;
        color: darken(#00838f, 30%);
      }
      &.radios__item_delay {
        border-color: #e65100;
        color: darken(#e65100, 30%);
      }
      &.radios__item_default {
        border-color: #757575;
        color: darken(#757575, 30%);
      }
    }
  }
}

.task {
  padding: 10px 15px;
  border: 1px solid #eee;
  border-radius: 4px;
  &.task_plan {
    background: fade(#2e7d32, 15%);
  }
  &.task_bug {
    background: fade(#dd2c00, 15%);
  }
  &.task_addit {
    background: fade(#00838f, 15%);
  }
  &.task_delay {
    background: fade(#e65100, 15%);
  }
}
</style>
