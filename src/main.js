import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../mock/index.js'
import './plugins/element.js'
import './plugins/components.js'
import * as filters from './utils/filters'

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
