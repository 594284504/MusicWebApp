 <template>
  <div  >
    <mt-swipe :auto="4000">
  <mt-swipe-item  v-for='item in imgList' :key='item.id'>
    <img class='swpImg' :src="item.picUrl" alt="">
    </mt-swipe-item>

</mt-swipe>
  </div>
</template>

<script>
export default {
  props:{
      imgList:Array
  }
}
</script>

<style scoped lang='stylus'>
.swpImg
  width: 100%;
  height: 100%;

.mint-swipe {
    height :11rem;
    
}
</style>