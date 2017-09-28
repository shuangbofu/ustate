import Vue from 'vue'
// import 'mint-ui/lib/style.css'
import App from './App.vue'
import router from './router/index.js'
import axios from 'axios'
import store from './store'
// import VueInfiniteScroll from 'vue-infinite-scroll'
// Vue.prototype.$http = axios
axios.defaults.withCredentials = true

// Vue.use(VueInfiniteScroll)
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
