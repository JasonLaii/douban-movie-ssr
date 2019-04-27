import Vue from 'vue'
import App from './App.vue'
import element from 'element-ui'
import {createRouter} from './router'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'


Vue.config.productionTip = false
Vue.use(element)
// ssr
// 导出工厂函数 用于创建新的App应用程序，router和store实例
//
export function createApp(){
  
  const router = createRouter()
  const store =createStore()
  
  //同步路由状态(route state) 到 store 
  sync(store,router)

  const app = new Vue({
    //根实例渲染应用程序组件
    render: h => h(App),
    router,
    store
  })
  return { app , router, store}
}