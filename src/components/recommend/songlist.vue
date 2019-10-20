 <template>
   
   <div class='songList'>

   <div class='songList_item' @click='songListClick(item)' v-for='(item,index) in songlist' :key='index'>

     <div class='songList_item_img' >
       <img v-lazy="item.cover" :key='index' alt="">
     </div>

     <div class='songList_item_content'>
       <p>{{item.title}}</p>
       <span>歌单作者:{{item.username}}</span>
     </div>

   </div>

 </div>
   
</template>

<script>
import {getRecSongList} from '../../api/recSongList';
import {getSingerDetail,getSongVkey} from '../../api/singer';
 import {createSong} from '../../api/songList'
export default {
  props:{
      songlist:Array
  },
  data(){
    return {
      currentSongList:null
    }
  },
  methods:{
     songListClick(item){
       let id=item.content_id
       this.$store.commit('getSongListId',id)
     this.$emit('songListClick',id)
this.$store.commit('getSongListData',item)
     console.log(item)
  }
  }
}
</script>

<style scoped>
 .songList {
    width :100% ;
    display :flex;
    flex-direction :column;
  
     
  }  
     .songList_item{
     display :flex;
     flex-direction :row;
     padding :1rem 0 1rem 1rem;
     background-color: rgb(27, 27, 27);
     margin-bottom: 0.5rem;
}
   .songList_item_img {
     width :80px;
     height :80px;
    margin-right :0.2rem;
   }
   .songList_item_img img {
        height :100%;
        
   }
 .songList_item_content{
   display :flex;
   flex-direction :column;
   justify-content :space-around;
 }
  .songList_item_content p{
    font-size :1.1rem;
    color :#fff;
    font-weight :600;
 }
  .songList_item_content span{
  color: gray;
 }
</style>