<template lang="pug">
.user-data
  span.user-data__name Name : {{ user.name }}
  span.user-data__email Email : {{ user.email }}
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters.user;
    }
  }
};
</script>
