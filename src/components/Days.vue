<template lang="pug">
ul.days
  li.days__item(v-for="n in 30" data-month="Январь") {{ n }}
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
@green: #5a9216;
.days {
  display: grid;
  margin: 0;
  padding: 0;
  list-style: none;
  grid-gap: 15px 25px;
  grid-template-columns: repeat(7, 1fr);
  .days__item {
    text-align: center;
    padding: 20px;
    border-bottom: 2px solid lighten(desaturate(@green, 80%), 40%);
    position: relative;
    cursor: pointer;
    &:after {
      content: attr(data-month);
      position: absolute;
      left: 3px;
      top: 3px;
      font-size: 8px;
      color: fade(lighten(@green, 10%), 80%);
    }
  }
}
</style>
