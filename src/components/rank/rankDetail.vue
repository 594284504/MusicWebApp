 <template>
  <div class='rankDetail'>
 
    <rank-detail :singerInfo='info' :rank='true' :songlist='currentSongList' />
  </div>
</template>

<script>
import {GetRankDetail} from '../../api/rankDetail'
import {mapGetters} from 'vuex'
import rankDetail from '../music-list/musicDetailPage'
import {getSingerDetail,getSongVkey} from '../../api/singer';
 import {createSong} from '../../api/songList'
export default {
    components:{
    rankDetail
    },
   computed:{
    ...mapGetters(['getRankList']),
    info(){
       
          return this.result
       
      }
   },
   watch:{
      
   },
   data(){
    return {
        
        rankInfo:null,
         
        currentSongList:null,
        result:{}
    }
   },
   created(){
 this.getRankDetail(this.$route.params.id,this.$route.params.period)
   },
 
   methods:{
       
       getRankDetail(e,d){
          
          GetRankDetail(e,d).then(res=>{
               if(res.code === 0){ 
                   this.result={singer_name:res.detail.data.data.AdShareContent,
                             singer_pic:res.detail.data.data.mbFrontPicUrl  
                   }
                this._getRecSongList(res.detail.data.songInfoList)
              }
             
           })
        
       },

        _getRecSongList(songlist){
        
          this.currentSongList=this.itemSongData(songlist)
      
            
                },
          
     
     itemSongData(list){
       let ret=[]
       list.forEach(item=>{
         this.keyMid=item.mid
                let vkey=null
              getSongVkey(item.mid).then(res=>{
                vkey=res.req_0.data.midurlinfo[0].vkey
              })
          let clickSongData={
                singer_id:1,
                  singer_mid : item.singer[0].mid,
                singer_name : item.singer[0].name,
                 singer_pic : `http://y.gtimg.cn/music/photo_new/T001R300x300M000${item.singer[0].mid}.jpg?max_age=2592000`
           }
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
 .rankDetail
    position:fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 20;
    background-color:#000;
    
  
</style>