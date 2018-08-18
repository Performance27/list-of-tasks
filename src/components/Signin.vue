<template lang="pug">
#signin
  .alert(v-if="error")
    .alert-message(@dismissed="onDismissed") {{ error.message }}
  form(@submit.prevent="onSignin")
    label(for="email") Email
    input(name="email" id="email" v-model="email" type="email" required)
    label(for="password") Пароль
    input(name="password" id="password" v-model="email" type="password" required)
    button(type="submit" :disabled="loading" :loading="loading") Войти
    button(color="red" dark :disabled="loading" :loading="loading" @click.prevent="onSigninGoogle") Войти через Google
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  computed: {
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
    onSignin() {
      this.$store.dispatch("signUserIn", {
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
    onResetPassword() {
      if (this.email === "") {
        return this.$store.dispatch("setError", {
          message: "Email can not be blnak"
        });
      }
      this.$store.dispatch("resetPasswordWithEmail", { email: this.email });
    },
    onDismissed() {
      this.$store.dispatch("clearError");
    }
  }
};
</script>
