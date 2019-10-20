<template>
  <scroll ref="suggest" class='suggest' 
           :pullUpLoad='isPullUp' @pullingUp='loadMore'
           :beforeScroll='true'  @beforeScroll='listScroll'
  >
      
    <ul class="suggest-list">
      <li   class="suggest-item" v-for="item in key"
            :key='item.id'    @click='resultClick(item)'
        >
        <div class="icon">
          <i :class='getIcon(item)' ></i>
        </div>
        <div  class='singer_Pic' v-if="item.zhida_singer" >
          <img class='pic' v-once :src='item.zhida_singer.singerPic'  alt="">
        </div>
        <div class="name">
          <p class="text" :style='isSinger(item)'  v-html=" getName(item)" ></p>
        </div>
      </li>
        <loading v-show="hasMore" />
    </ul>
      
     
  </scroll>
</template>

<script type="text/ecmascript-6">
 import {getSearch } from '../../api/search'
import { filterSinger} from '../../api/songList'
import scroll from '../commonComp/btscroll'
import loading from '../../base/loading/loading'
import Singer from '../../common/js/singer'
import {mapMutations} from 'vuex'
import {mapActions} from 'vuex'
import {createSong} from '../../api/songList'
import {getSongVkey} from '../../api/singer'
const NUM=30
  export default {
    components:{
     scroll,
     loading
    },
    props:{
      query:{
        type:String,
        default:''
      }
    },
    watch:{
      query(){
         
        this.key=[]
         
         if(this.timer){
           clearTimeout(this.timer)
         }
         this.timer=setTimeout(()=>{
            this.search()
             this.$refs.suggest.refresh()  
            this.$refs.suggest.scroll.scrollTo(0,0) 
               
           },500)
       
       
      },
      
    },
    data(){
      return {
        page:1,
        num:30,
        result:[],
        isPullUp:true,
        hasMore:true,
         key:[],
         
      }
    },
    
    methods:{
    
      src(item){
        if(item.type === 'singer'){
          if(item.zhida_singer.singerPic){
          return item.zhida_singer_singerPic
         }
       }
      },
      isSinger(item){
        if(item.type === 'singer')
        return {color:'skyblue'}
      },
      getIcon(item){
       if(item.type === 'singer'){
         return 'icon-mine'
         
       }else{
         return 'icon-music'
       }
      },
      getName(item){
        if(item.type === 'singer'){
        return item.zhida_singer.singerName
        }else{
          return `${item.name}-${item.singer}`
        }
      },
      search(){
        this.page=1
        this.hasMore=true
        getSearch(this.query,this.page,1,NUM).then(res=>{
               if(res.code === 0){
                 console.log(res)
              this._result(res.data,res.data.song.list)
                this.result=this.key
              console.log(this.key)
               this.checkMore(res.data)
               } else{
                 this.hasMore=false
               }
                 setTimeout(()=>{
             this.$refs.suggest.refresh() 
                 },600) 
                
              
             })
      },
      _result(data,list){
       
        if(data.zhida.zhida_singer){
          
          this.key.push({...data.zhida,...{type:'singer'}})
       console.log(data.zhida)
        }
        if(data.song){
         this._normalizeSongs(data.song.list,list)
          
        }
        
      },
       _normalizeSongs(list,res) {
          if(!list){
            return 
          }
  
       for(let i=0;i<list.length;i++){
            let singerdata={
              singer_id:res[i].singer[0].id,
             singer_mid : res[i].singer[0].mid,
           singer_name :  res[i].singer[0].name,
            singer_pic : `http://y.gtimg.cn/music/photo_new/T001R300x300M000${res[i].singer[0].mid}.jpg?max_age=2592000`
            }
        
                  let vkey 
               getSongVkey(list[i].mid).then(res=>{
                 if(res){
                    vkey=res.req_0.data.midurlinfo[0].vkey
                 }
               
              }) 
               
              setTimeout(() => {
                if (list[i].mid) {
               this.key.push(createSong(list[i],vkey,singerdata)) 
                  }
              }, 220);
           
       
         
       }
          //  list.forEach((musicData) => {
         
          //     let vkey
          //      getSongVkey(musicData.mid).then(res=>{
                  
          //          vkey= res.req_0.data.midurlinfo[0].vkey
              
          //       setTimeout(() => {
               
               
          //            if (musicData.mid) {
          //    this.key.push(createSong(musicData,vkey))
          //                   }
                            
          //             })
          //     }, 300);

          //     })  
                  
             
                 
         
      },
      checkMore(data){
        const song=data.song
        if(!song.list.length||(song.curnum+song.curpage*NUM)>=song.totalnum){
          
           this.hasMore=false  
          
         
        }
      },
      loadMore(){
       if(!this.hasMore){
         return 
       }
       
         this.page++
       getSearch(this.query,this.page,1,NUM).then(res=>{
         if(res.code===0){
         this._loadMore(res.data,res.data.song.list),
         this.checkMore(res.data)
          this.$refs.suggest.finishPullUp()
              setTimeout(()=>{
             this.$refs.suggest.refresh() 
                 },500) 
         }
       })

      },
      _loadMore(data,list){
     
        if(data.song){
       this._normalizeSongs(data.song.list,list)
        }
       
      },
          ...mapMutations({setSinger: 'SingerDetail'}),
      resultClick(item){
          if(item.type === 'singer'){
          const singer={
            singer_id:item.zhida_singer.singerID,
             singer_mid : item.zhida_singer.singerMID,
           singer_name : item.zhida_singer.singerName,
            singer_pic : item.zhida_singer.singerPic
          }
           
          this.$store.commit('SingerDetail',singer)
          this.$router.push({
       path:`/search/${singer.singer_mid}`
             })
          }else{
               this.$emit('selectItem' )
              this.insertSong( item)  
          }
        
            this.$emit('select',item)
      
        },
       ...mapActions({insertSong:'insertSong'}),
       listScroll(){
         this.$emit('listScroll')
       }
      },
    updated(){  
       
      
    
    }
     
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~stylus/variable"
  @import "~stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 2rem
        flex-direction :row
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 1.2rem
          color: $color-theme
      .pic    
        width:3rem
        height:3rem
        border-radius :100%
        margin-right :1rem
      .name
        flex: 1
        font-size: 1.2rem
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
       margin-top :10px;
       text-align :center;
      width: 100%
      
       
      

       
</style>