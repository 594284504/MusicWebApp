<template>
  <transition name="slide">
    <div class="add-song" v-show="showFlag" >
      <div class="header">
        <h1 class="title">添加歌曲到列表</h1>
        <div class="close"  >
          <i class="icon-close" @click='hide'></i>
        </div>
      </div>
      <div class="search-box-wrapper">
        <search-box ref="searchBox" @query='queryChange'  placeholder="搜索歌曲"></search-box>
      </div>
      <div class='shortcut' v-show="!query">
          <switches :switches="switches" :currentIndex="currentIndex" @switch="switchItem"></switches>
          <div class="list-wrapper">
             <scroll v-if='currentIndex===0' class="list-scroll" ref='recentScroll'>
               <div class="list-inner">
               <song-list :songs='playHistory' @select='recent_play' />
               </div>
             </scroll> 
                
             <scroll class="list-scroll" ref='scroll'>
                 <div class="list-inner">
                <search-list  @delete='_deleteHistoryItem' :searches='getHistory' @select='historyItemClick'/>
                 </div>
             </scroll>  
          </div>  
      </div>
      <div class='search-result' v-show="query">
        <suggest @select="saveSearch" @selectItem='searchItemClick'  :query='query' />
      </div>
       <top-tip ref='tip'>
        <div class='tip-title'>
          <i class='icon-ok'></i>
          <span class='text'>已添加到当前播放列表</span>
        </div>
      </top-tip>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
   import {mapGetters,mapActions, mapMutations}  from 'vuex'
  import SearchBox from '../../base/search-box/search-box'
  import Suggest from '../suggest/suggest'
 import {searchMixin}  from '../../common/js/mixin'
 import Switches from '../../base/switches/switches.vue'  
import SongList from '../../base/song-list/song-list'
import SearchList from '../../base/search-list/search-list'
import Scroll from '../commonComp/btscroll'
import Song from '../../api/songList'
import TopTip from '../../base/top-tip/top-tip'
  export default {
    mixins:[searchMixin],
    
    data() {
      return {
         showFlag:false,
        
        // showSinger: false,
         currentIndex: 0,
        // songs: [],
        switches: [
          {
            name: '最近播放'
          },
          {
            name: '搜索历史'
          }
        ]
      }
    },
    computed: {
     ...mapGetters(['playHistory','getSinger'])
    },
   
    methods: {
      show() {
        this.showFlag = true
        this.$nextTick(()=>{
          this.$refs.recentScroll.refresh()
        })
      },
      
      hide() {
        this.showFlag = false
      },
      switchItem(index){
        this.currentIndex=index
         this.$refs.scroll.refresh()
      },
      recent_play(song,index){
        if(index!==0){
          
          this.insertSong(new Song(song))
          this.$refs.tip.show()
          this.setFullScreen(false)
          this.$refs.recentScroll.refresh()
          
        }
  console.log(song)
      },
      searchItemClick(){
       
      this.$refs.tip.show()
      
      },
      ...mapMutations({
        setFullScreen:'FULL_SCREEN'
      }),
      ...mapActions([
        'insertSong'
      ])
      
 
    },
    components: {
      SearchBox,
       Suggest,
       Switches,
       Scroll,
       SongList,
       SearchList,
       TopTip
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~stylus/variable"
  @import "~stylus/mixin"

  .add-song
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    z-index: 5200
    background: $color-background
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(100%, 0, 0)
    .header
      position: relative
      height: 44px
      text-align: center
      .title
        line-height: 44px
        font-size: $font-size-large
        color: rgb(255,255,176)
        font-weight :600
        border-bottom:1px solid rgb(190, 129, 24)
      .close
        position: absolute
        top: 0
        right: 8px
        .icon-close
          display: block
          padding: 12px
          font-size: 20px
          color: $color-theme

    .search-box-wrapper
      margin: 20px
    .shortcut
      .list-wrapper
        position: absolute
        top: 165px
        bottom: 0
        width: 100%
        .list-scroll
          height: 100%
          overflow: hidden
          .list-inner
            padding: 20px 30px 0 20px;
    .search-result
      position: fixed
      top: 124px
      bottom: 0
      z-index :100
      width: 100%
    .tip-title
      text-align: center
      padding: 18px 0
      font-size: 0
      align-items :center
      .icon-ok
        font-size:1.2rem
        color: $color-theme
        margin-right: 1rem
      .text
        font-size: 1.1rem
        color: #fff
        
</style>