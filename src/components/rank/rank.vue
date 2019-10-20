<template>
  <div>
    <scroll class='scroll'>
    <div class='rankList'>
      <div  class='rankList-item' v-for='item in allRankList'
                :key='item.id'  @click='itemClick(item)'
                >
        <div class='rankList-item-img'>
          <img :src="item.frontPicUrl" alt="">
        </div>
        <div class='rankList-item-text' >
          <p v-for='(item,index) in item.song' :key='index'>{{index+1}}.{{item.title}}</p>
           
        </div>
      </div>
    </div>
    </scroll>

   <router-view></router-view>

  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import scroll from '../commonComp/btscroll'
 
export default {
  computed:{
    ...mapGetters(['getRankList'])
  },
  components:{
    scroll
  },
  data(){
   return{
     allRankList:[]
   
   }
  },
  created(){
    if(!this.getRankList){
      this.$router.push('/rec')
    }
    console.log(this.getRankList)
   this.allRankList= this.fixAllData(this.getRankList.toplist.data.group)
   
  },
  
  methods:{
    itemClick(item){
      let id=item.topId
      let period=item.period
     
         this.$router.push({
       path:`/rank/${id}&${period}`
      } ) 
    },
    fixAllData(list){
      let ret=[]
     list.forEach((item)=>{
       if(item){
         ret.push(...item.toplist)
          
       }
     })
     return ret
    },
     
  }
}
</script>

<style scoped>
.rankList {
  display: flex;
  flex-direction: column;
  padding:1rem 1rem 0 1rem ;
}
.rankList-item {
  display: flex;
  flex-direction: row;
  background-color: rgb(37, 37, 37);
  margin-bottom: 0.5rem;
  border-radius: 5px;
}

.rankList-item-img img{
  width: 6rem;
  height: 6rem;
  border-radius: 5px;
}
.rankList-item-text {
   display: flex;
   flex-direction: column;
   justify-content: center;
   padding-left: 1rem;
   overflow: hidden;
}
.rankList-item-text p {
  padding-bottom: 8px;
   overflow:hidden;
    text-overflow:ellipsis;
     white-space:nowrap;
  font-size: 0.8rem; 
}
.scroll {  
    position: absolute;
    top: 88px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden  ;
}
</style>