// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from "echarts";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import './assets/css/reset.css'

Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts;

//引用axios，将其挂到vue的原型上
import axios from 'axios'
Vue.prototype.$http = axios

//解决点击router-link 造成堆栈报错
import Router from 'vue-router'
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
