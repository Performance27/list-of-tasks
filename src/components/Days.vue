<template lang="pug">
div
  ul.days
    li.days__item(v-for="(n, index) in monthDays" v-bind:data-month="monthName" v-bind:data-start="dayStart" v-bind:style="index == 0 ? 'grid-column: ' + dayStart + ';' : ''" v-bind:class="{'days__item_weekend' : weekend(index) == 6 || weekend(index) == 0}" v-bind:title="currentDay(index)") 
      router-link.days__link(v-bind:to="'/month-' + (monthInfo.monthNumber + 1) +'/' + (index + 1)") {{ n }}
</template>

<script>
import Months from "../components/Months";

export default {
  components: {
    months: Months
  },
  data() {
    return {
      monthInfo: {
        dayStart: null,
        daysInMonth: 31,
        year: 2018,
        monthNumber: this.$route.params.number - 1
      }
    };
  },
  computed: {
    dayStart: function() {
      var dayStart = new Date(
        this.monthInfo.year,
        this.monthInfo.monthNumber,
        1,
        0,
        0,
        0,
        0
      );
      return dayStart.getDay();
    },
    monthName: function() {
      var months = [
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
      ];
      return months[this.monthInfo.monthNumber];
    },
    monthDays: function() {
      var date = new Date(
        this.monthInfo.year,
        this.monthInfo.monthNumber + 1,
        0
      );
      return date.getDate();
    }
  },
  methods: {
    weekend: function(index) {
      var days = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
      var dayStart = new Date(
        this.monthInfo.year,
        this.monthInfo.monthNumber,
        index + 1,
        0,
        0,
        0,
        0
      );
      return dayStart.getDay();
    },
    currentDay: function(index) {
      var days = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
      var dayStart = new Date(
        this.monthInfo.year,
        this.monthInfo.monthNumber,
        index + 1,
        0,
        0,
        0,
        0
      );
      return days[dayStart.getDay()];
    }
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
    .days__link {
      display: block;
      text-align: center;
      padding: 20px;
    }
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
    &:before {
      content: attr(title);
      position: absolute;
      top: 3px;
      right: 3px;
      font-size: 10px;
    }
    &_weekend {
      background: fade(red, 20%);
    }
  }
}
</style>
