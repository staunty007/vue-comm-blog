// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import VueNoty from 'vuejs-noty'
import VueDisqus from 'vue-disqus'
import VueSkeletonLoading from 'vue-skeleton-loading'
import wysiwyg from "vue-wysiwyg"

import 'vuejs-noty/dist/vuejs-noty.css'
import "vue-wysiwyg/dist/vueWysiwyg.css"


Vue.use(VueNoty)

Vue.use(VueDisqus)

Vue.use(VueSkeletonLoading)

Vue.use(wysiwyg, {})

Vue.config.productionTip = false

/* eslint-disable no-new */

const authData = localStorage.getItem("auth");
new Vue({
  el: '#app',
  router,
  data: {
  	auth: authData ? JSON.parse(authData) : {}
  },
  components: { App },
  template: '<App/>'
})
