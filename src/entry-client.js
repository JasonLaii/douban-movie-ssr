import { createApp } from "./main";

const { app, router, store } = createApp();

if (window.__INITIAL_STATE__) {
  //store获取状态
  store.replaceState(window.__INITIAL_STATE__);
}



//挂载app实例之前调用 router.onReady
//是因为路由器需要提前解析路由配置中的异步组件
// 在可以正确的调用组件中可能存在的路由钩子
router.onReady(() => {

//  1.在路由导航前解析数据
  //使用 router.beforeRseolve() 是 确保所有组件都resolved
  //to: 即将进入的路由对象
  // from:当前要离开的路由
  // next:Function 下一步
  // router.beforeResolve((to, from, next) => {
  //   //目的路由里面的组件
  //   const matched = router.getMatchedComponents(to);
  //   //上一个路由里的组件
  //   const preMatched = router.getMatchedComponents(from);

  //   //对比两个路由的组件，找出差异组件
  //   let diffed = false;
  //   const activated = matched.filter((current, index) => {
  //     return diffed || (diffed = (preMatched[index] !== current));
  //   });

  //   //没有差异组件
  //   if (!activated.length) {
  //     return next();
  //   }

  //   //预渲染差异组件
  //   Promise.all(
  //     activated.map(current => {
  //       if (current.asyncData) {
  //         return current.asyncData({ store, route: to });
  //       }
  //     })
  //   )
  //     .then(() => {
  //       next();
  //     })
  //     .catch(next);

  // });

  //挂载
  app.$mount("#app");


});



//---------------------------------------------
//2.匹配要渲染的视图，再获取数据
// Vue.mixin({
//   beforeMount(){
//     const { asyncData } = this.$options
//     if(asyncData){
//       //将获取数据操作分配给promise
//       //以便在组件中，可以在数据准备就绪后
//       //通过运行 this.dataPromise.then(...)执行其他任务

//       this.dataPromise = asyncData({
//         store : this.$store,
//         route : this.$route
//       })
//     }
//   }
// })





//在路由update(query或者params更改时)时，我们也需要调用asyncData来预取数据
Vue.mixin({
  beforeRouteUpdate(to,from,next){
    const {asyncData} = this.$options
    if(asyncData){
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next)
    }else{
      next()
    }
  }
})