 <template>
  <div class='search'>
    <div  class='search-box-wrapper'>
   <search-box ref='searchBox' @query='queryChange' />
   </div>
    <div ref="shortcutWrapper" class="shortcut-wrapper" v-show='!query' >
        <scroll   class='shortcut' ref='scroll' >
           <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li class='item '>
                <a :href="specialKey.url"><span class='specialK'>{{specialKey.key}}</span></a>
              </li>
             <li @click='hotClick(item.k)'  v-for='item in hotKey' :key='item.id' class='item'>
               <span>{{item.k}}</span>
             </li>
            </ul>
          </div>
           <div class="search-history" v-show="getHistory.length">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span   class="clear" @click='deleteAll'>
                <i class="icon-clear"></i>
              </span>
            </h1>
            <search-history-list @delete='_deleteHistoryItem' @select='historyItemClick' :searches="getHistory"></search-history-list>
          </div>
          </div>
        </scroll>
    </div>
     <div class='result'  v-show='query'>
    <suggest @select='saveSearch'   :query='query'/>
  </div>
    
 <router-view></router-view>
    
  </div>
</template>

<script>
import {getSearch,getSearchHot} from '../../api/search'
import searchBox from '../../base/search-box/search-box'
import suggest from '../suggest/suggest'
import {mapActions } from 'vuex'
import searchHistoryList from '../../base/search-list/search-list'
import { MessageBox } from 'mint-ui';
import scroll from '../commonComp/btscroll'
import {playlistMixin,searchMixin} from '../../common/js/mixin'
export default {
  mixins:[playlistMixin,searchMixin],
  components:{
   searchBox,
   suggest ,
   searchHistoryList,
   scroll
  },
  computed:{
    
  
  },
  created(){
   this._getSearchHot()
  },
  data(){
  return {
    hotKey:[],
    specialKey:{},
   
    
  }
  },
  updated(){
    this.$refs.scroll.refresh()
  },
  methods:{
    handlePlaylist(playlist){
      const bottom = playlist.length>0?'50px':''
      this.$refs.scroll.$el.style.bottom=bottom
      this.$refs.scroll.refresh()
    },
    hotClick(item){
       this.$refs.searchBox.setQuery(item)
    },
    
    _getSearchHot(){
     getSearchHot().then(res=>{
       if(res.code === 0){
         this.hotKey=res.data.hotkey.slice(0,8)
         console.log(res)
         this.specialKey={
           key:res.data.special_key,
           url:res.data.special_url
         }
       }
     })
    },
   
   
 
   deleteAll(){
    // this.deleteHistoryAll()
    MessageBox.confirm('确认清空搜索历史?').then(() => {
       this.deleteHistoryAll()
}).catch(()=>{
    retur
});
   },
   ...mapActions([ 'deleteHistoryAll'])
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~stylus/variable"
  @import "~stylus/mixin"
.search
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        position: absolute
        top:0
        left :0
        bottom 0
        right 0
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d 
          .specialK
            color:red
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            background-color:rgb(29,29,29)
            border-radius:1rem;
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size:1.1rem
                color: $color-text-d
    .result
      position: absolute
      width: 100%
      top: 170px
      bottom: 0

</style>