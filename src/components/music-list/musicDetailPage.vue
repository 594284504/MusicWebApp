<template>
  <div>
    <div class='headerBgc' :style='Opacity' v-show='isShow'></div>
    <div class='headerNav'  >
        <i class="mui-icon mui-icon-back" @click='back'  ></i>
        <span>{{singerName}} </span>
    </div>

    <scroll class='scroll' ref='Scroll' :probeType='3' @scroll='currentY'>
     
    <div class='bgimage' ref='wrap'>
     
      <div class='wrapper' :style='bgi'   ref='img' ></div>
     
      <div class='btn' @click='randomPlayClick'>
        <span class="mui-icon mui-icon-refresh">随机播放全部</span>
      </div>
     
    </div>
    <div class='songList'>
      <div class='songList-item'  v-for='(item,index) in songlist'
            :key='index'  @click.stop='songItem(item,index)'         >

        <div class="rank" v-show="rank">
          <i :class="getRankCls(index)" v-text="getRankText(index)"></i>
        </div>
        <div class='content'>
        <p>{{item.name}}</p>
        <span>{{item.singer}} - {{item.album.title}}</span>
         
        </div>
      </div>
    </div>
    
    </scroll>
  </div>
</template>

<script>
import scroll from '../commonComp/btscroll'
 import {mapActions} from 'vuex'
 
export default {
  
  components:{
  scroll
  },
  props:{
    singerInfo:Object,
    songlist:{
     type:Array,
     default:[]
    },
    rank:Boolean
  },
  
  data(){
    return { 
       Opacity:{
         opacity:0
       },
       isShow:false
    }
  },
  computed:{
   bgi(){ 
      return `background-image:url(${this.singerInfo.singer_pic})`
   },
   singerName(){
     return this.singerInfo.singer_name
   }
  },
   
  methods:{
   
    back(){
      this.$router.back()
    },
    currentY(p){
        
      let top=-(p.y)
      if(top>=80&&top<255){
        this.isShow=true
        const opacity=top/255
        this.Opacity={opacity}
      }else if(top<80){
        this.isShow=false
      } 
    let scale=1
      if(p.y>0){
        let percent=p.y/this.$refs.wrap.offsetHeight
       scale=1+percent
      }
        
     this.$refs.img.style.transform=`scale(${scale},${scale})`
    },
    ...mapActions(['selectPlay','randomPlay']),


    songItem(item,index){
      this.selectPlay({
        list:this.songlist,
        index
      })
    },
    randomPlayClick(){
     this.randomPlay({
       list:this.songlist
     })
    },
    getRankCls(index){
      if (index <= 2) {
          return `icon icon${index}`
        } else {
          return 'text'
        }
    },
     getRankText(index) {
        if (index > 2) {
          return index + 1
        }
      }
   
  },
   
}
</script>

<style scoped>
.headerBgc{
  width: 100%;
  height: 2.5rem;
  position: absolute;
  z-index: 100;
  background-color: rgb(39, 39, 39);
}
.headerNav {
   position: absolute;
   width: 100%;
  text-align: center;
  padding-top: 10px;
  z-index: 130;
  
}
.headerNav i {
  position: absolute;
  left: 0;
  top: 0px;
  font-size:2.5rem;
  z-index: 120;
}
.headerNav span {
  font-size: 1rem;
  color:#fff;
   font-weight: 400;

}
 .bgimage {
   width: 100%;
   height: 290px;
   background-size:cover;
  position: relative;
   overflow: hidden;
   
 }
 
  .bgimage .wrapper {
  
    width: 100%;
    height: 100%;
     background-size:cover;
    zoom:0.5;
      
  }
 .bgimage .btn {
   position: absolute;
   bottom: 2rem;
   width: 100%;
  text-align: center;
 }
  .bgimage div span {
     padding:0.4rem 1rem;
    border: 1px solid;
      border-radius: 20px;
      font-size: 1.2rem;
  }
 .songList {
   width: 100%;
  
   padding:1rem 0 0 1.5rem;
 }
 .songList-item {
  display: flex;
  flex-direction: row;
   padding:0.4rem 0.5rem 0.4rem 0;
   overflow:hidden;
    width: 100%;
    
 }
 
 .content{
   display: flex;
   flex-direction: column;
    margin-left: 0.6rem;
    padding: 5px 5px;
     overflow:hidden;
    text-overflow:ellipsis;
     white-space:nowrap;
 
 }
 .songList-item p {
    overflow:hidden;
    text-overflow:ellipsis;
     white-space:nowrap;
    
   font-size: 1.1rem;
   color:#fff;
   margin-bottom: 0.6rem;
   font-weight: 600;
 }
 .songList-item span {
        overflow:hidden;
    text-overflow:ellipsis;
     white-space:nowrap;
      color:gray;
    
 }
 .scroll {
   width: 100%;
   height: 100%;
   position: absolute;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
    
 }
 .rank{
   line-height: 40px;
   width: 30px;
  
   text-align: center;
   display: flex;
   flex-direction: column;
   justify-content: center;
 }
 .rank i {
    display: block;
     height: 50px;
     
 }
 .icon {
   display: inline-block;
   width: 30px;
   height: 30px;
   background-size: 30px 30px;
   background-position: 0 10px;
    background-repeat: no-repeat;
   
     }
  .icon0{
     background-image: url('../../base/song-list/first@2x.png');
     }
  .icon1{
     background-image: url('../../base/song-list/second@2x.png');
     }
  .icon2{
    background-image: url('../../base/song-list/third@2x.png')
}
 .text {
   color: rgb(243, 171, 4)!important;
   font-weight: 600;
   font-size: 1.3rem;
   

  }        
</style>