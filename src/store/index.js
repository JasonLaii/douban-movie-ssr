import Vue from 'vue'
import Vuex from 'vuex'
import state from './modules/state'
import getters from './modules/getters'
import mutations from './modules/mutations'
import actions from './modules/actions'

Vue.use(Vuex)

export function createStore(){
  
  return new Vuex.Store({
    
    state,
    getters,
    mutations,
    actions
    // state: ()=>import('./modules/state'),
    // getters:()=>import('./modules/getters'),
    // mutations: ()=>import('./modules/mutations'),
    // actions:()=> import('./modules/actions')
  })
}