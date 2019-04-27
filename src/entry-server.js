import { createApp } from './main'

export default context =>{
  
  //路由有可能是异步路由钩子函数或组件，所以返回Promise
  //以便服务器可以在所有内容渲染前 就已经准备就绪
  return new Promise((resolve,reject) =>{
    const { app,router,store } = createApp()
    
    router.push(context.url)


    router.onReady(()=>{
      //返回路由匹配的的组件数组
      const matchedComponents = router.getMatchedComponents()
      //路由匹配不到组件，pending->rejected
      if( !matchedComponents){
        return reject({code:404})
      }

      //将多个Promise实例包装成全新的Promise实例
      Promise.all(matchedComponents.map(Component=>{
        //调用 asyncData 获取数据
        if(Component.asyncData){
          return Component.asyncData({
            store,
            //当前路由信息对象
            route: router.currentRoute
          })
        }
      })).then(()=>{

        //在所有预取钩子 resolve后
        // store存储仓已经填充了渲染程序所需要的状态
        //当我们将状态附加到 上下文(context)
        
        //  ??
        //并且 `template` 选项用于 renderer时
        //状态将自动序列化为 `window.__INITIAL_STATE__` 并注入HTML
        // window.__INITIAL_STATE__  --> 是自定义属性

        context.state = store.state
        
        //resolve app实例 以便它可以渲染
        resolve(app)

      }).catch(reject)
    },reject) //error callback

  })
  
}