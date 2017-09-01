//  导入vue核心包
import Vue from 'vue';
// 导入App.vue的vue对象
import App from './App.vue';
// 导入路由配置
import router from './router'

// 注册mint-ui
// 导入mint-ui的css文件
import 'mint-ui/lib/style.min.css';
// 导入mint-ui组件对象
import mintui from 'mint-ui';
// 在Vue中全局使用mintui
Vue.use(mintui);

//  注册mui的css样式
import './assets/mui/css/mui.css';

// 导入一个当前系统的全局基本样式
import './assets/css/site.css';

// 用axios替换vue resource
import axios from 'axios'
import vueAxios from "vue-axios"

Vue.use(vueAxios, axios)

// 8.0 定义一个全局过滤器实现日期的格式化
import moment from 'moment'
Vue.filter('datefmt', function(input, fmtstring){
//	使用momentjs这个日期格式化类库实现日的格式化功能
  return moment(input).format(fmtstring)
})

// 9.0 使用图片预览组件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// 5.0 利用Vue对象进行解析渲染
new Vue({
  el: '#app',
  router: router,
  render: c => c(App)  // es6的函数写法 =>：goes to
})
