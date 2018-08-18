<template lang="pug">
header
  nav.app-nav
    ul.app-nav__list
      li.app-nav__item
        router-link.app-nav__link(to="/" exact) Главная
      li.app-nav__item
        router-link.app-nav__link(to="/add-task" exact) Добавить задачу
      li.app-nav__item(v-for="item in menuItems" :key="item.title") 
        router-link.app-nav__link(v-bind:to="item.link") {{ item.title }}
      li.app-nav__item(v-if="userIsAuthenticated" @click="onLogout") 
        a.app-nav__link() Выйти
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    menuItems() {
      let menuItems = [
        { icon: "face", title: "Зарегистрироваться", link: "/signup" },
        { icon: "lock_open", title: "Войти", link: "/signin" }
      ];
      if (this.userIsAuthenticated) {
        menuItems = [{ icon: "person", title: "Профиль", link: "/profile" }];
      }
      return menuItems;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    }
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
