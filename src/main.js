import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Routes from './routes'
import
store from './store'
import firebase from 'firebase'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAHGXXFyOk6pEYoShvuc3-NiaeqR0xP7pM",
  authDomain: "list-of-tasks-a7593.firebaseapp.com",
  databaseURL: "https://list-of-tasks-a7593.firebaseio.com",
  projectId: "list-of-tasks-a7593",
  storageBucket: "list-of-tasks-a7593.appspot.com",
  messagingSenderId: "1046876690098"
};

Vue.use(VueResource);
Vue.use(VueRouter);

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
});

//Filters
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

new Vue({
  el: '#app',
  store,
  render: h => h(App),
  router: router,
  created() {
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
  }
})
