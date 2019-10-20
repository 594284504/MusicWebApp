 <template >
  
  <div class='singer_detail' ref='singerDet'>
       <detail-page :singerInfo='singerInfo'    :songlist='songs' />
   
 
  </div>
 
</template>

<script>
import {mapGetters} from 'vuex'
 import {ERR_OK} from '../../api/config';
import {getSingerDetail,getSongVkey} from '../../api/singer';
 import {createSong} from '../../api/songList'
import detailPage from '../music-list/musicDetailPage'
 

 import {playlistMixin} from '../../common/js/mixin'
export default {
  mixins:[playlistMixin],
    components:{
     detailPage
    },
   computed:{
       ...mapGetters(['getSinger']),
       
   },
   
   data(){
       return {
           singermid:'',
           singerDetail:[],
           songs:[] ,
           singerInfo:{},
            
       }
   },
   created(){
      
       this.singermid= this.getSinger.singer_mid
        this.singerInfo=this.getSinger
         
      this._getSingerDetail(this.singermid)
     
    
        
   },
  
   
     methods:{
          handlePlaylist(playlist){
      const bottom = playlist.length>0?'50px':''
      this.$refs.singerDet.style.bottom=bottom
    },
       _getSingerDetail(e){
           if(!this.getSinger.singer_id){
               this.$router.push('/rec')
               return   
           }
           getSingerDetail(e).then(res=>{
               if(res.code === ERR_OK){
                 
               console.log(res)
                
               this.singerDetail=res.singer.data.songlist
               this.songs=this.newSingerDetail(res.singer.data.songlist)
               console.log(this.songs)
               }
           })
       },
       newSingerDetail(list){
            let ret=[]
          list.forEach(item=>{
              
                let vkey 
        
        
        getSongVkey(item.mid).then(res=>{
                vkey=res.req_0.data.midurlinfo[0].vkey
              })
              setTimeout(()=>{
          
              if(item.id && item.mid){
                  ret.push(createSong(item,vkey))
              }
              },400)
              
         
          })
          return ret
       },
    
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
    z-index: 10;
    background-color:#000;
    
</style>