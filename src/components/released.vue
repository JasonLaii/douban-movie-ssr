<template>
  <div class="released" v-loading="loadingMoving">
    <div class="title">
      <h1>电影票 - {{city}}</h1>
      <div class="location">
        <el-dropdown trigger="click" @command="changeCity">
          <span class="el-dropdown-link">[切换城市]</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="(city,index) in citys"
              :key="index"
              :command="city.name"
            >{{city.name}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <movieTag :movieInfo="movingList"></movieTag>
  </div>
</template>
<script>
import movieTag from './common/movieTag'
export default {
  data() {
    return {
      citys: [
        {
          name: "北京"
        },
        {
          name: "广州"
        },
        {
          name: "上海"
        },
        {
          name: "深圳"
        },
        {
          name: "杭州"
        }
      ]
    };
  },

  //暴露静态函数接口
  // -通过访问路由来确定需要获的取那部分数据
  //

  asyncData({ store,route }){
    
    //触发 action 返回 Promise
    return store.dispatch('getMoving') 
  },

  methods: {
    changeCity(command) {
      this.$store.commit("MOVING_LOADING", { loading: true });
      this.$store.commit("MOVIE_CITY", { city: command });
      this.$store.commit("MaxNum",{maxNum: 12});
      asyncData(this.$store)
      // this.$store.dispatch("getMoving");
      
    },
      asyncData({ store,route }){
    
    //触发 action 返回 Promise
    return store.dispatch('getMoving') 
  }
  },

  mounted() {
    // this.$store.dispatch("getMoving");
    asyncData(store)
  },
  computed: {
    city() {
      return this.$store.getters.city;
    },
    movingList() {
      return this.$store.getters.movingList;
    },
    loadingMoving(){
      return this.$store.getters.loadingMoving
    }
  },
  components: {
    'movieTag': movieTag
    // 'movieTag' : ()=>import('./common/movieTag.vue')
    // movieTag: resolve => require(["./common/movieTag"], resolve)
  }
};
</script>
<style scoped>
.released {
  margin: 0 auto;
  width: 950px;
}
.title {
  line-height: 70px;
  border-bottom: 1px solid rgba(192, 192, 192, 0.932);
}
.title h1 {
  display: inline;
}
.location {
  display: inline-block;
}
.location span {
  font-size: 20px;
  padding-left: 10px;
}
</style>
