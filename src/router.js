import Vue from 'vue'
import Router from 'vue-router'
import released from './components/released'
import readyToRelease from './components/readyToRelease'
import search from './components/search'
import top250 from './components/top250'

Vue.use(Router)

//导出工厂函数
export function createRouter(){
  return new Router({
    // linkActiveClass: 'active',
    mode: 'history',
    routes:[
      //async 加快加载速度
      {
        path:'/',
        name: 'index',
        component: 
        // released
        ()=>import('./components/released.vue')
      },{
        path:'/released',
        name:'released',
        component:released
        // ()=>import('./components/released.vue')
      },{
        path:'/readyToRelease',
        name:'readyToRelease',
        component: readyToRelease
        // ()=>import('./components/readyToRelease.vue')
      },{
        path: '/search',
        name:'search',
        component: search
        // ()=> import('./components/search.vue')
      },{
        path:'top250',
        name:'top250',
        component:top250
        // ()=>import('./components/top250.vue')
      },{
        pth: '/movieDetails',
        name:'movieDetails',
        component: ()=>import('./components/common/movieDetails.vue')
      }
    ]
  })
}
