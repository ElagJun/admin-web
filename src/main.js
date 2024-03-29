import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import common from './util/common';
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';

Vue.use(ElementUI);
Vue.use(mavonEditor);

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.GLOBAL = common;

// 添加响应拦截器
axios.interceptors.response.use(
  res => {
    return res;
  },
  err => {
    if (err.response.status == 401) {
      router.push('/login');
    } else {
      return Promise.reject(err);
    }
  });
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
