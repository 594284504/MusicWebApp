<template>
  <div class="progress-bar" ref="progressBar" @click='clickPercent' >
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn"
         @touchstart.prevent='progressTouchStart'
         @touchmove.prevent='progressTouchMove'
         @touchend='progressTouchEnd'
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
 
const BtnWidth=16
 
 

  export default {
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    watch:{
      percent(newPercent){
       if(newPercent>=0 && !this.touch.initiated){
         const barWidth=this.$refs.progressBar.clientWidth - 16
         const offsetWidth=newPercent * barWidth
         this.$refs.progress.style.width=`${offsetWidth}`
         this.$refs.progressBtn.style.transform=`translate3d(${offsetWidth}px,0,0)`
       }
      }
     
    },
    created(){
       this.touch={}
    },
    methods:{
       progressTouchStart(e){
        this.touch.initiated=true
        this.touch.startX=e.touches[0].pageX
        this.touch.left=this.$refs.progress.clientWidth
         
      },
      progressTouchMove(e){
        if(!this.touch.initiated){
          return 
        }
        //偏移的距离，对于这个进度条的距离
        const deltaX=e.touches[0].pageX - this.touch.startX
        const offsetWidth=Math.min(this.$refs.progressBar.clientWidth - 16 ,
          Math.max(0,this.touch.left+deltaX))
          this._offset(offsetWidth)
           
      },
      progressTouchEnd(){
         this.touch.initiated=false
         this._triggerPercent()
       
      },
      clickPercent(e){
        this._offset(e.offsetX)
        this._triggerPercent()
      },
      _triggerPercent(){
        const barWidth=this.$refs.progressBar.clientWidth - 16
        const percent=this.$refs.progress.clientWidth / barWidth
        this.$emit('dragPercent',percent)
        
      },
      _offset(offsetWidth){
        this.$refs.progress.style.width=`${offsetWidth}`
         this.$refs.progressBtn.style.transform=`translate3d(${offsetWidth}px,0,0)`
      }
    }
     
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~stylus/variable"

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>