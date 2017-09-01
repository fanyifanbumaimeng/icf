import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

import home from '@/components/Home.vue'
import shopcar from '@/components/shopcar/car.vue'
import newslist from '@/components/news/newslist.vue'
import newsinfo from '@/components/news/newsinfo.vue'
import photolist from '@/components/photo/photolist.vue'
import photoinfo from '@/components/photo/photoinfo.vue'
import goodslist from '@/components/goods/goodslist.vue'
import goodsinfo from '@/components/goods/goodsinfo.vue'
import goodsdesc from '@/components/goods/goodsdesc.vue'
import goodscomment from '@/components/goods/goodscomment.vue'
import car from '@/components/shopcar/car.vue'

// 3.0.2 定义路由规则
export default new Router({
  linkActiveClass:'mui-active',  //改变路由激活时的class名称
  routes:[
    {path:'/',redirect:'/home'},// 设置当服务器启动的时候默认进入 /home中
    {path:'/home',component:home},   //首页
    {path:'/shopcar',component:shopcar},  // 购物车
    {path:'/news/newslist',component:newslist}, //新闻资讯列表页面
    {path:'/news/newsinfo/:id',component:newsinfo},  // 新闻资讯详情页面
    {path:'/photo/photolist',component:photolist},
    {path:'/photo/photoinfo/:id',component:photoinfo},
    {path:'/goods/goodslist',component:goodslist},
    {path:'/goods/goodsinfo/:id',component:goodsinfo},
    {path:'/goods/goodsdesc/:id',component:goodsdesc},
    {path:'/goods/goodscomment/:id',component:goodscomment},
    {path:'/shopcar/car',component:car}
  ]
});

