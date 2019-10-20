 <template >
  
  <div class='singer_detail' ref='singerDet'>
       
   
 <detail-com :singerInfo='listInfo' :songlist='currentSongList'/>

 
  </div>
 
</template>

<script>
 import detailCom from '../music-list/musicDetailPage';
 import {mapGetters} from 'vuex'
 import {getRecSongList} from '../../api/recSongList';
import {getSingerDetail,getSongVkey} from '../../api/singer';
 import {createSong} from '../../api/songList'
import {playlistMixin} from '../../common/js/mixin'
export default {
  mixins:[playlistMixin],
  components:{
     detailCom
  },
  computed:{
      ...mapGetters(['getSongListId','getSongListData'])
  },
  data(){
    return {
      currentSongList:[],
      listInfo:null,
      clickSongData:{}
    }
  },
 created(){
  
  this._getRecSongList(this.getSongListId)
   console.log(this.getSongListData)
    if(this.getSongListData){
       this.listInfo={
      singer_name:this.getSongListData.title,
      singer_pic:this.getSongListData.cover
   }
    }
  
 },
   methods:{
  handlePlaylist(playlist){
      const bottom = playlist.length>0?'50px':''
      this.$refs.singerDet.style.bottom=bottom
    },


    _getRecSongList(id){
          if(!this.getSongListData){
           this.$router.push('/rec')
          }
        getRecSongList(id).then((res)=>{
         if(res.code===0){
           let songs=res.cdlist[0].songlist
           console.log(songs)
           
          this.currentSongList=this.itemSongData(songs)
           console.log(this.currentSongList)
            
                }
           })
     },
     itemSongData(list){
       let ret=[]
       list.forEach(item=>{
       
           
         let clickSongData={
           singer_id:1,
             singer_mid : item.singer[0].mid,
           singer_name : item.singer[0].name,
            singer_pic : `http://y.gtimg.cn/music/photo_new/T001R300x300M000${item.singer[0].mid}.jpg?max_age=2592000`
           }
            
           
         this.keyMid=item.mid
                let vkey=null
              getSongVkey(item.mid).then(res=>{
                vkey=res.req_0.data.midurlinfo[0].vkey
              })
               
              setTimeout(()=>{
                  
              if(item.id && item.mid){
                  ret.push(createSong(item,vkey,clickSongData))
              }
              },400)
              
       })
       return ret
     }
     
   }
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>


.singer_detail
    position:fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 20;
    background-color:#000;
    
</style>