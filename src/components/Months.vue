<template lang="pug">
div
  .months
    input.months__filter(type="text" v-model="search" placeholder="Месяц")
    ul.months__list
      li.months__item(v-for="(month, index) of filteredMonths" ) 
        router-link.months__link(v-bind:to="'/month-' + (index + 1)" v-bind:class="{'months__link_current' : index == currentMonth}" exact) {{ month | capitalize}}
</template>

<script>
export default {
  data() {
    return {
      months: [
        "январь",
        "февраль",
        "март",
        "апрель",
        "май",
        "июнь",
        "июль",
        "август",
        "сентябрь",
        "октябрь",
        "ноябрь",
        "декабрь"
      ],
      search: ""
    };
  },
  computed: {
    filteredMonths: function() {
      return this.months.filter(month => month.match(this.search));
    },
    currentMonth: function() {
      var now = new Date();
      return now.getMonth();
    }
  }
};
</script>

<style lang="less" scoped>
@green: #5a9216;
.months {
  margin-bottom: 35px;
  .months__filter {
    margin-bottom: 20px;
    padding: 10px 30px;
    border-radius: 3px;
    border: 1px solid desaturate(@green, 20%);
  }
  .months__list {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    list-style: none;
    grid-column-gap: 15px;
    grid-row-gap: 20px;
    padding: 0;
    margin: 0;
    .months__item {
      .months__link {
        display: block;
        text-align: center;
        padding: 25px;
        cursor: pointer;
        border-radius: 4px;
        border: 1px solid green;
        &_current {
          border: 2px solid green;
        }
        color: green;
        transition: all 0.2s ease-in-out;
        box-shadow: 0 0 0 0 transparent;
        font-size: 18px;
        position: relative;
        z-index: 2;
        &:before {
          content: "";
          position: absolute;
          z-index: -1;
          border-radius: 4px;
          left: -1px;
          top: -1px;
          height: calc(100% + 2px);
          width: 0;
          transition: all 0.2s ease-in-out;
          background: linear-gradient(to right, #bef67a, #5a9216);
        }
        &:hover,
        &.router-link-active {
          color: #fff;
          border-color: transparent;
          box-shadow: 0 25px 25px -15px fade(darken(#5a9216, 20%), 50%);
          &:before {
            width: calc(100% + 1px);
          }
        }
      }
    }
  }
}
</style>
