<template lang="pug">
header
  nav.app-nav
    ul.app-nav__list
      li.app-nav__item
        router-link.app-nav__link(to="/" exact) Главная
      li.app-nav__item
        router-link.app-nav__link(to="/add-task" exact) Добавить задачу
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.app-nav {
  padding: 10px;
  background: #4f5b62;
  margin-bottom: 25px;
  .app-nav__list {
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
    justify-content: center;
    .app-nav__link {
      display: block;
      padding: 10px 20px;
      color: #fff;
    }
  }
}
</style>
