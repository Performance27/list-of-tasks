<template lang="pug">
#signup
  .alert(v-if="error")
    .alert-message(@dismissed="onDismissed") {{ error.message }}
  form(@submit.prevent="onSignup")
    label(for="name") Имя
    input(name="name" id="name" v-model="name" type="text" required)
    label(for="email") Email
    input(name="email" id="email" v-model="email" type="email" required)
    label(for="password") Пароль
    input(name="password" id="password" v-model="password" type="password" required)
    label(for="confirmPassword") Подтверждение пароля
    input(name="confirmPassword" id="confirmPassword" v-model="confirmPassword" type="password" required :rules="[comparePasswords]")
    button(type="submit" :disabled="loading" :loading="loading") Зарегистрироваться
    button(color="red" dark :disabled="loading" :loading="loading" @click.prevent="onSigninGoogle") Войти через Google
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  },
  computed: {
    comparePasswords() {
      return this.password !== this.confirmPassword
        ? "Passwords do not match"
        : "";
    },
    user() {
      return this.$store.getters.user;
    },
    error() {
      return this.$store.getters.error;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/profile");
      }
    }
  },
  methods: {
    onSignup() {
      this.$store.dispatch("signUserUp", {
        name: this.name,
        email: this.email,
        password: this.password
      });
    },
    onSigninGoogle() {
      this.$store.dispatch("signUserInGoogle");
    },
    onSigninGithub() {
      this.$store.dispatch("signUserInGithub");
    },
    onDismissed() {
      this.$store.dispatch("clearError");
    }
  }
};
</script>
