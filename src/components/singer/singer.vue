 <template >
  <div>
    <div class='title'>
    <p>- 热门歌手 -</p>
      </div>

      <scroll class='scroll' ref='Scroll'>
   <div class='singerlist' >
     <div class='singerlist_item' @click='itemClick(item)' v-for="(item,index) in HotSinger" :key='index'>
        <div class='singerlist_item_img'>
       <img  v-lazy="item.singer_pic" alt="">
           </div>
       <div class='singerlist_item_name'>
         <span >{{item.singer_name}}</span>
         </div>

     </div>
   </div>
    </scroll>

<transition name='slide'>
<router-view></router-view>
</transition>
  </div>
</template>

<script>
import {getSingerList} from '../../api/singer';
import {ERR_OK} from '../../api/config';
import scroll from '../commonComp/btscroll'
import {playlistMixin} from '../../common/js/mixin'

export default {
  mixins:[playlistMixin],
  components:{
    scroll
  },
  data(){
   return {
     HotSinger:[],
     detail:{}
   }
  },
  created(){
    this._getSingerList()  
      
  },
  methods:{
    
    handlePlaylist(playlist){
      const bottom = playlist.length>0?'50px':''
      this.$refs.Scroll.$el.style.bottom=bottom
    },
    itemClick(item){
     this.$router.push({
       path:`/singer/${item.singer_id}`
      } )
     this.$store.commit('SingerDetail',item)
     console.log(item)
    
    },
   _getSingerList(){
     getSingerList().then(res=>{
       if(res.code === ERR_OK){
            
           this.HotSinger=res.singerList.data.singerlist
          // console.log(this.HotSinger)
       }
     })
   }
  }
}
</script>

<style scoped>
.singerlist{
  display: flex;
  flex-direction: column;
  padding-left: 2rem;
}
.singerlist_item {
  display: flex;
  flex-direction: row;
}
.singerlist_item_img{
  width: 3.6rem;
  padding:0.6rem 1rem 0.6rem 0;
}
.singerlist_item_img img{
  width: 100%;
  border-radius: 100%;
}
.singerlist_item_name {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color:aliceblue;
}
.singerlist_item_name span {
  font-weight:600;
}
.title {
  text-align: center;
  padding:0.5rem 0;
  background-color: rgb(29, 29, 29);
  
}
.title p {
  color:rgb(238, 59, 4);
}
.slide-enter-active, .slide-leave-active{
    transition: all 0.2s;
}
  .slide-enter, .slide-leave-to{
    transform: translate3d(100%, 0, 0);
    opacity :0;
    }


  .scroll{
     
    position :absolute;
    top :7.7rem;
    left :0;
    right :0;
    bottom :0;
    overflow :hidden;
  }
</style>