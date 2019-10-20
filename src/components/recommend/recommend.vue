<template>
 
  <div class='rec'>
    <scroll class='scroll' ref='Scroll' >
      
 <swipper :imgList='swipper' />
 <h3 class='recTitle'>-热门歌单推荐-</h3>
 <song-list :songlist='songList' @songListClick='songClick' />
 </scroll>
<transition name='slide'>
<router-view></router-view>
</transition>
  </div>
</template>

<script>
import {getRecData,getSongList} from '../../api/rec';
import {ERR_OK} from '../../api/config';
import swipper from '../commonComp/swipper';
 import axios from 'axios';
 import scroll from '../commonComp/btscroll';
 import songList from './songlist';
 import {playlistMixin} from '../../common/js/mixin'
 
export default {
  mixins:[playlistMixin],
  name:'rec',
  components:{
   swipper,
   scroll,
   songList
  },
  created(){
   this._getRecData()
   this._getSongList()
 
  },
  data(){
    return {
      swipper:[],
      songList:[]
    }
    
  },
  methods:{
    songClick(res){
       this.$router.push({
       path:`/rec/${res}`
      } )
    },
       handlePlaylist(playlist){
      const bottom = playlist.length>0?'50px':''
      this.$refs.Scroll.$el.style.bottom=bottom
    },
    
    _getRecData(){
       getRecData().then((res)=>{
         if(res.code === ERR_OK){
           this.swipper=res.data.slider
           
         }
       })
    },
    _getSongList(){
      getSongList().then((res)=>{
        if(res.code === ERR_OK){
        
          this.songList=res.recomPlaylist.data.v_hot
          this.$store.commit('getRankList',res)
        }
      })
    }
  }
  
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'   >
 @import '~stylus/variable' 
 
 .recTitle{ 
  color:$color-theme;
  text-align :center;
  padding :1rem 0;
  font-weight 600;
}
  
  .scroll{
     
    position absolute
    top 88px
    left 0
    right 0
    bottom 0
    overflow hidden
  }
.slide-enter-active, .slide-leave-active{
    transition: all 0.2s;
}
  .slide-enter, .slide-leave-to{
    transform: translate3d(100%, 0, 0);
    opacity :0;
    }
</style>