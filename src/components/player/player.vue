 <template>
  <div class='player' v-show="playList.length>0" >
    <transition name='normal'>
       <div class="normal-player" v-show="fullScreen">

        <div class="background"  >
          <img width="100%" height="100%" @error="errorImg($event)" :src='currentSong.image' >
        </div>

        <div class="top">
          <div class="back" @click='back'>
            <i class="icon-back"></i>
          </div>
                <h1 class="title"  >{{currentSong.name}}</h1>
                <h2 class="subtitle" @click='ToSingerMainPage'>{{currentSong.singer+' >'}}</h2>
              
               <div @click='commentPage' class='icon-comment'>
                   <i class='mui-icon mui-icon-chat'></i>
               </div>

        </div>

 <div class="middle" 
      @touchstart.prevent='middleTouchStart'
      @touchmove.prevent='middleTouchMove'
      @touchend='middleTouchEnd'          
                 >
          <div class="middle-l" ref="middleL">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd" :class='cdCls' >
                <img class="image" @error="errorImg($event)" :src='currentSong.image' >
              </div>
            </div>
             <div class="cd-lyric-wrapper">
              <div class="cd-lyric">{{cdLyric}}</div>
            </div>
          </div>
          <scroll class='middle-r' ref='lyricList' :data='currentLyric&&currentLyric.lines'>
             <div class="lyric-wrapper">
                <div v-if="currentLyric">
                <p ref="lyricLine" class='text'
                :class="{'current':currentLineNum === index}" 
               v-for="(line,index) in currentLyric.lines" :key='index'
                >{{line.txt}}</p>
              </div>
            </div>
            </scroll>  
        </div>

 

    <div class="bottom">
         <div class="dot-wrapper">
            <span class="dot" :class="{'active':currentShow==='cd'}" ></span>
            <span class="dot" :class="{'active':currentShow==='lyric'}" ></span>
          </div>
          <div class="progress-wrapper">
            <span class="time time-l">{{format(currentTime)}}</span>
            <div class="progress-bar-wrapper">
              <progress-bar :percent='percent' 
                            @dragPercent='touchDragPercent'/>
            </div>
            <span class="time time-r">{{format(timeLength)}}</span>
          </div>
       <div class="operators">
             
            <div class="icon i-left"  @click='changeMode'>
              <i :class="iconMode"></i>
            </div>
            <div class="icon i-left" :class='disableCls' >
              <i  class='icon-prev' @click='lastSong'></i>
            </div>
            <div class="icon i-center"  :class='disableCls' >
              <i  :class='playIcon' @click='togglePlaying'></i>
            </div>
            <div class="icon i-right" :class='disableCls' > 
              <i   class="icon-next" @click='nextSong'></i>
            </div>
            <div class="icon i-right">
               
              <i class='icon' :class="iconFav(currentSong)" @click='toggleFavorite(currentSong)'  ></i>
              
            </div>
          </div>  
       </div>
    </div>
</transition>
 <transition name='mini'>
    <div class='mini_player' v-show='!fullScreen'  @click.stop='backMain'>
      <div class='progress_bar_mini' ref='bar_mini'>
        <div class='barInner'>
          <div class='currentProgress' ref='currentPercent_mini'></div>
        </div>
      </div>
      <div class="icon">
          <img   width="40" height="40" :class='cdCls' @error="errorImg($event)"  :src="currentSong.image">
        </div>
        <div class="text">
          <h2 class="name" >{{currentSong.name}}</h2>
          <p class="desc"  >{{currentSong.singer}}</p>
        </div>
        <div class="control">
          <i  :class='playIcon'  @click.stop='togglePlaying' ></i>
        </div>
        <div class="control" >
          <i class="icon-playlist" :class="{'active':showPlayList===true}" @click.stop='showList'></i>
        </div>
    </div>
</transition>
 <audio ref='ad' :src='currentSong.url'
   @canplay='ready'  @error='error' @timeupdate='updateTime'
   @ended='end'
     ></audio>

       <transition name='_comment'>
     <comment :commentList='currentComment' @backPlayer='commentBack' class='asas' v-if='showComment'/>
      </transition>
      <play-list :isShowList='showPlayList'  ref='play_list'  @hidePlayList='isHideList' />
  </div>

</template>

<script>
import {mapGetters,mapMutations, mapActions} from 'vuex'
import progressBar from '../../base/progress-bar/progress-bar'
import {playMode} from '../../common/js/config';
 
import scroll from '../commonComp/btscroll'
import comment from '../comment/userComment'
import {getComment} from '../../api/songLyric';
import playList from '../playlist/playlist'
  import Lyric from 'lyric-parser'
  import { Toast } from 'mint-ui';
  import {playerMixin} from '../../common/js/mixin'
export default {
  mixins:[playerMixin],
  components:{
    progressBar,
    scroll,
    comment,
    playList
  },
 
  computed:{
      ...mapGetters([ 'fullScreen','playing','getSinger']),
      playIcon(){
     return  this.playing?'icon-pause':'icon-play' 
     },
  
      cdCls(){
        return this.playing?'play':'pause'
      },
      
      disableCls() {
        return this.songReady ? '' : 'disable'
      },
     percent(){
       return this.currentTime/this.timeLength
     }
  },
  watch:{
    currentSong(newSong,oldSong){
      if(!newSong.id){
        return 
      }
      if(newSong.id===oldSong.id){
        return 
      }
      if(this.currentLyric){
        this.currentLyric.stop()
      }
        console.log(this.currentSong,this.getSinger)
      this.$nextTick(()=>{
         this.$refs.ad.play()
        this.getLyric()
      })
    },
   playing(newPlaying){
     console.log(this.playing)
     const audio=this.$refs.ad
      this.$nextTick(()=>{
     newPlaying? audio.play():audio.pause()
  
   })
   },
   percent(){
      const currentWidth=parseInt(this.$refs.bar_mini.clientWidth * this.percent)
      this.$refs.currentPercent_mini.style.width=`${currentWidth}px`
   },
  
},
   
  data(){
   return {
    
     songReady:false,
     currentTime:0,
     timeLength:null,
     currentLyric:null,
     currentLineNum:0,
     currentShow:'cd',
     cdLyric:'',
     currentSongData1:{},
     currentSongData2:{},
     showComment:false,
     currentComment:{},
     showPlayList:false,
    
   }
  },
   
  created(){
    
   this.touch={}
  },
  methods:{
    errorImg(e){
      e.target.src=require('../../assets/noresult.jpeg')
    },
    commentBack(){
      this.showComment=false
    },
    getLyric(){
      this._getComment(this.currentSong.id)
  this.currentSong.getLyric().then((res)=>{
   this.currentLyric = new Lyric(res,this.handleLyric)
   
           this.currentLyric.play()
        
         console.log(this.currentLyric)
    }).catch((e)=>{
      console.log9('22222')
    }) 
      

     if(this.currentSong.singerdata){
       this.currentSongData1={
            singer_id:1,
             singer_mid : this.currentSong.singerdata.singer_mid,
           singer_name : this.currentSong.singerdata.singer_name,
            singer_pic : this.currentSong.singerdata.singer_pic
          }
      
     }
       if(this.getSinger) {
        this.currentSongData2={
            singer_id:2,
             singer_mid :this.getSinger.singer_mid,
           singer_name : this.getSinger.singer_name,
            singer_pic : this.getSinger.singer_pic
          }
        }  
    },


    handleLyric({lineNum,txt}){
       this.currentLineNum = lineNum
         if(lineNum>5){
           let lineEl=this.$refs.lyricLine[lineNum - 5]
          
           this.$refs.lyricList.scroll.scrollToElement(lineEl,1000)
         }else{
           this.$refs.lyricList.scroll.scrollTo(0,0,1000)
          }
          this.cdLyric=txt
    },
    togglePlaying(){
      this.setPlaying(!this.playing)
      if(this.currentLyric){
        this.currentLyric.togglePlay()
      }
    },
    commentPage(){
       this.showComment=true
    },
    
    ToSingerMainPage(){
      if(this.currentSong.singerdata){
        this.$store.commit('SingerDetail',this.currentSongData1)
        console.log(this.currentSong.singerdata)
      }else{
         this.$store.commit('SingerDetail',this.currentSongData2)
         console.log(this.currentSongData2)
      }
           
     this.$router.push({
       path:`/singer/${this.currentSong.id}`
             })
      this.setFullScreen(false)
    },
    loop(){
     this.$refs.ad.currentTime=0
       this.$refs.ad.play()
       if(this.currentLyric){
        this.currentLyric.seek(0)
      }
    },
    end(){
      if(this.mode===playMode.loop){
       this.loop()
      }else{
        this.nextSong()
      }
      
    },
     
    back(){
       this.setFullScreen(false)
    
    },
    backMain(){
        this.setFullScreen(true)
  },
    nextSong(){
      if(!this.songReady){
        return 
      }
      if(this.playList.length===1){
        this.loop()
        return 
      }else{
      let index =this.currentIndex + 1
     if(index===this.playList.length){
       index=0
     }
    }
     this.setCurrentIndex(index)
     if(!this.playing){
       this.togglePlaying()
     }
     this.songReady=false
    },
    lastSong(){
      if(!this.songReady){
        return 
      }
       if(this.playList.length===1){
        this.loop()
        return 
      }else{
       let index =this.currentIndex - 1
     if(index===-1){
       index=this.playList.length-1
     }
      }
     this.setCurrentIndex(index)
     if(!this.playing){
       this.togglePlaying()
     }
     this.songReady=false
    },
     ready(){
   
       this.songReady=true
        this.savePlayHistory(this.currentSong)
       this.timeLength=this.$refs.ad.duration
     },
     error(){
       this.songReady=true
       Toast('您还不是VIP用户，无法试听')
     },
     updateTime(e){
      this.currentTime=e.target.currentTime
     },
     _pad(num,n=2){
       let len=num.toString().length
       while(len<n){
         num='0'+num
         len++
       }
       return num
     },
     format(interval){
      interval=interval | 0
      const minute=interval/60 | 0
      const second=this._pad(interval%60)
      return `${minute}:${second}`
     },
     touchDragPercent(percent){
       const currentTime=this.timeLength * percent
       this.$refs.ad.currentTime=this.timeLength * percent
       if(!this.playing){
         this.togglePlaying()
       }
       if(this.currentLyric){
        this.currentLyric.seek(currentTime * 1000)
      }
     },
     middleTouchStart(e){
       this.touch.initiated=true
    const touch = e.touches[0]
    this.touch.startX=touch.pageX
    this.touch.startY=touch.pageY
     },
     middleTouchMove(e){
       if(!this.touch.initiated){
         return 
       }
       const touch = e.touches[0]
    const deltaX=touch.pageX - this.touch.startX 
    const deltaY=touch.pageY - this.touch.startY 
    if(Math.abs(deltaY)>Math.abs(deltaX)){
      return 
    }
    const left = this.currentShow==='cd' ? 0 : -window.innerWidth
    const width=Math.min(0,Math.max(-window.innerWidth,left+deltaX))
    this.touch.percent=Math.abs(width/window.innerWidth)
    this.$refs.middleL.style.opacity = 1 - this.touch.percent
    this.$refs.lyricList.$el.style.transform=`translate3d(${width}px,0,0)`
     },
     middleTouchEnd(){
      //  this.touch.initiated=false
       let width
       let opacity
       let time=500
       console.log(this.touch.percent)
       if(this.currentShow==='cd'){
         if(this.touch.percent > 0.33){
           width=-window.innerWidth
           this.currentShow='lyric'
           opacity=0
         }else{
           width=0
           opacity=1
         }
       }else{
         if(this.touch.percent<0.66){
           width=0
           this.currentShow='cd'
           opacity=1
         }else{
           width=-window.innerWidth
           opacity=0
         }
        }
         this.$refs.middleL.style.opacity = opacity
         this.$refs.middleL.style.transition=`${time}ms`
       this.$refs.lyricList.$el.style.transform=`translate3d(${width}px,0,0)`
        this.$refs.lyricList.$el.style.transition=`${time}ms`
        this.touch.initiated = false
     },
     ...mapMutations({ 
                     setFullScreen:'FULL_SCREEN',
                      }),
     ...mapActions(['savePlayHistory']),                 
 _getComment(id){
    getComment(id).then(res=>{
      
      if(res.code===0){
      this.currentComment=res.hot_comment
     
      }
    })
    },
    showList(){
      this.showPlayList=!this.showPlayList
    },
    isHideList(){
      this.showPlayList=false
    },
   
  },
 
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~stylus/variable"
  @import "~stylus/mixin"

  .player
    .normal-player
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      z-index: 150
      background: $color-background
      .background
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        z-index: -1
        opacity: 0.6
        filter: blur(20px)
      .top
        position: relative
        margin-bottom: 25px
        .back
          position absolute
          top: 0
          left: 6px
          z-index: 50
          .icon-back
            display: block
            padding: 9px
            font-size: $font-size-large-x
            color: $color-theme
            transform: rotate(-90deg)
        .title
          width: 70%
          margin: 0 auto
          line-height: 40px
          text-align: center
          no-wrap()
          font-size: $font-size-large
          color: $color-text
        .subtitle
          line-height: 20px
          text-align: center
          font-size: $font-size-medium
          color: $color-text
        .icon-comment
            position: absolute
            right:5px  
            top:0.6rem
            i
              font-size :1.6rem   
      .middle
        position: fixed
        width: 100%
        top: 80px
        bottom: 170px
        white-space: nowrap
        font-size: 0
        .middle-l
          display: inline-block
          vertical-align: top
          position: relative
          width: 100%
          height: 0
          padding-top: 80%
          .cd-wrapper
            position: absolute
            left: 10%
            top: 0
            width: 80%
            height: 100%
            .cd
              width: 100%
              height: 100%
              box-sizing: border-box
              border: 10px solid rgba(255, 255, 255, 0.1)
              border-radius: 50%
              &.play
                animation: rotate 20s linear infinite
              &.pause
                animation-play-state: paused
              .image
                position: absolute
                left: 0
                top: 0
                width: 100%
                height: 100%
                border-radius: 50%

           .cd-lyric-wrapper
            width: 80%
            margin: 30px auto 0 auto
            overflow: hidden
            text-align: center
            .cd-lyric
              height: 30px
              line-height: 30px
              font-size: 1rem
              font-weight :600
              color: $color-theme
        .middle-r
          display: inline-block
          vertical-align: top
          width: 100%
          height: 100%
          overflow: hidden
          .lyric-wrapper
            width: 100%
            margin: 0 auto
            overflow: hidden
            text-align: center
            .text
              line-height: 38px
              color: $color-text-l
              font-size: 1rem
              &.current
                color: $color-text
                font-size :1.2rem
.bottom
        position: absolute
        bottom: 50px
        width: 100%
        .dot-wrapper
          text-align: center
          font-size: 0
          .dot
            display: inline-block
            vertical-align: middle
            margin: 0 4px
            width: 8px
            height: 8px
            border-radius: 50%
            background: $color-text-l
            &.active
              width: 20px
              border-radius: 5px
              background: $color-text-ll
        .progress-wrapper
          display: flex
          align-items: center
          width: 80%
          margin: 0px auto
          padding: 10px 0
          .time
            color: $color-text
            font-size: $font-size-small
            flex: 0 0 30px
            line-height: 30px
            width: 30px
            &.time-l
              text-align: left
            &.time-r
              text-align: right
          .progress-bar-wrapper
            flex: 1
  .operators
          display: flex
          align-items: center
          .icon
            flex: 1
            color: $color-theme
            &.disable
              color: $color-theme-d
            i
              font-size: 30px
          .i-left
            text-align: right
          .i-center
            padding: 0 20px
            text-align: center
            i
              font-size: 40px
          .i-right
            text-align: left
          .icon-favorite
            color: $color-sub-theme
      &.normal-enter-active, &.normal-leave-active
        transition: all 0.4s
        .top, .bottom
          transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
      &.normal-enter, &.normal-leave-to
        opacity: 0
        .top
          transform: translate3d(0, -100px, 0)
        .bottom
          transform: translate3d(0, 100px, 0) 
     .mini_player
       display: flex
       align-items: center
       position: fixed
       left: 0
       bottom: 0
       z-index: 1180
       width: 100%
       height: 60px
       background: $color-highlight-background      
       &.mini-enter-active, &.mini-leave-active
        transition: all 0.4s
       &.mini-enter, &.mini-leave-to
        opacity: 0
       .icon
         flex: 0 0 40px
         width: 40px
         padding: 0 10px 0 20px
         
         img
           border-radius: 50%
           display :block
           &.play
             animation: rotate 10s linear infinite
           &.pause
             animation-play-state: paused 
       .text
         display: flex
         flex-direction: column
         justify-content: center
         flex: 1
         line-height: 20px
         overflow: hidden
         margin-left :40px
         .name
           margin-bottom: 2px
            
         .desc
           no-wrap()
           font-size: $font-size-small
           color: $color-text-d
        .control
          flex: 0 0 30px
          width: 50px
          padding: 0 10px
          i
            font-size:1.6rem
            &.active
              color: orange
              font-size :2rem

.progress_bar_mini
    height: 30px
    width :100%
    position :fixed
    bottom:43px
    .barInner
      position: relative
      top: 13px
      height: 2px
      background: rgba(0, 0, 0, 0.3)
      .currentProgress
        position: absolute
        height: 100%
        background: $color-theme
        width:0
     

   ._comment-enter-active, ._comment-leave-active 
    transition: all 0.6s;
   ._comment-enter, ._comment-leave-to 
    transform: translate3d(0,100%, 0);
    opacity :0;
     

       

  @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)
</style>