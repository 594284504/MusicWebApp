import {mapGetters, mapMutations,mapActions } from 'vuex'
 import {playMode} from './config'
 import {shuffle} from './util'

export const playlistMixin = {
  computed: {
    ...mapGetters([
      'playList'
    ])
  },
  mounted() {
    this.handlePlaylist(this.playList)
  },
  activated() {
    this.handlePlaylist(this.playList)
  },
  watch: {
    playlist(newVal) {
      this.handlePlaylist(newVal)
    }
  },
  methods: {
    handlePlaylist() {
      throw new Error('component must implement handlePlaylist method')
    }
  }
}

export const playerMixin={
  computed:{
    iconMode(){
      return this.mode === playMode.sequence?
                         'icon-sequence':this.mode === playMode.loop ? 
                         'icon-loop' : 'icon-random' 
    },
    
    ...mapGetters([ 'favoriteList','sequenceList','mode','currentIndex','playList','currentSong']),
  },
    methods:{
      changeMode(){
        const mode=(this.mode+1) % 3
         this.setMode(mode)
         let list=this.sequenceList  
         if(mode === playMode.random){
           list =  shuffle(this.sequenceList)
           console.log(list)
         }else {
          list=this.sequenceList
          console.log(list)
         }
         this.$refs.listContent.refresh()
         this.resetCurrentIndex(list)
         this.setPlayList(list)
         this.$refs.listContent.refresh()
    },
    resetCurrentIndex(list){
      let index=list.findIndex((item)=>{
        return item.id === this.currentSong.id
      })
        this.setCurrentIndex(index)
    },
    iconFav(song){
      if(this.isFavorite(song)){
        return 'icon-favorite'
      }
      return 'icon-not-favorite'
     },
    toggleFavorite(song){
      if(this.isFavorite(song)){
        this.deleteFavoriteList(song)
        console.log(song)
      }else{
        this.saveFavoriteList(song)
      }
    },
    isFavorite(song){
     const index=this.favoriteList.findIndex((item)=>{
       return item.id===song.id
     })
     return index > -1
    },
    ...mapActions(['saveFavoriteList','deleteFavoriteList']),
    ...mapMutations({setPlayList:'PLAYLIST',
                     setMode:'MODE',
                     setCurrentIndex:'CURRENT_INDEX',
                     setPlaying:'PLAYING'}),
    }
  }

export const searchMixin={
  data(){
    return {
      query:''
    } 
  },
  computed:{
    ...mapGetters(['getHistory'])
  },
  methods:{
    queryChange(query){
      this.query=query
    },
    blurInput(){
      this.$refs.searchBox.blur()
    },
    saveSearch( ){
     this.saveSearchHistory(this.query)
    },
    historyItemClick(item){
      this.query=item
      this.$refs.searchBox.query=item
    
     },
     _deleteHistoryItem(item){
      this.deleteHistoryItem(item)
     },
    ...mapActions(['saveSearchHistory','deleteHistoryItem' ])
  }
}















 