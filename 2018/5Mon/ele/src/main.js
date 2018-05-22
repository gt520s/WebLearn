// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import $http from 'vue-resource'

Vue.config.productionTip = false
Vue.use($http)
Vue.prototype.axios = axios.create({
  baseURL: 'http://localhost/api/data.txt',
  timeout: 1000
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
