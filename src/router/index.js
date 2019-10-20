import Vue from 'vue'
import Router from 'vue-router'
// import Rec from '../components/recommend/recommend.vue';
// import Rank from '../components/rank/rank.vue';
// import Search from '../components/search/search.vue';
// import Singer from '../components/singer/singer.vue';
// import singer_detail from '../components/singer-detail/singer_detail.vue';
// import songlistdetail from '../components/recommend/songListDetail.vue'
// import rankDetail from '../components/rank/rankDetail.vue';
// import user_center from '../components/user-center/user-center.vue'

Vue.use(Router)
const Rec=(resolve=>{
  import('../components/recommend/recommend.vue').then((mod)=>{
    resolve(mod)
  })
})
const Rank=(resolve=>{
  import('../components/rank/rank.vue').then((mod)=>{
    resolve(mod)
  })
})
const Search=(resolve=>{
  import('../components/search/search.vue').then((mod)=>{
    resolve(mod)
  })
})
const  Singer=(resolve=>{
  import('../components/singer/singer.vue').then((mod)=>{
    resolve(mod)
  })
})
const  singer_detail=(resolve=>{
  import('../components/singer-detail/singer_detail.vue').then((mod)=>{
    resolve(mod)
  })
})
const songlistdetail=(resolve=>{
  import('../components/recommend/songListDetail.vue').then((mod)=>{
    resolve(mod)
  })
})
const rankDetail=(resolve=>{
  import('../components/rank/rankDetail.vue').then((mod)=>{
    resolve(mod)
  })
})
const user_center=(resolve=>{
  import('../components/user-center/user-center.vue').then((mod)=>{
    resolve(mod)
  })
})
 const originalPush = Router.prototype.push
 Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
 }
export default new Router({
  routes: [
    {path: '/',component: Rec},
    {path: '/rec',component: Rec,
    children:[{
      path:':id',component:songlistdetail
     }]},
    {path: '/rank',component: Rank,
    children:[{
      path:':id&:period',component:rankDetail
     }]
  },
    {path: '/singer',component: Singer,
     children:[{
      path:':id',component:singer_detail
     }]
  },
     {path:'/search',component:Search,
     children:[{
      path:':id',component:singer_detail
     }]
    },
    {path:'/user',component:user_center}
    

  ]
})
