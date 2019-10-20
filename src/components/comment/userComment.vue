<template> 
    <div class='comment'>
        <div class='nav' @click='back'>
            <i class="icon-back"></i>
            <span>热门评论({{commentNum }})</span>
        </div>
         
        <div v-show="hasComment" class='no_result'>
            <p>暂无评论~</p>
            <img src="../../assets/noresult.jpeg" alt="">
            
            </div>

        <scroll class='scroll'>
        <div class='content'>

            <div class='content_item' v-for="item in commentList.commentlist" :key='item.id'>
                <div class='content_item_img'>
                    <img :src="item.avatarurl" alt="">
                    </div>
                  <com :it='item' />
                
                <div class='praise'>{{item.praisenum}} <i  class='icon-favorite zan'></i></div>
            </div>
        </div>
        </scroll>
    </div>
</template>

<script>
import scroll from '../commonComp/btscroll'
import com from './commentCom'
export default {
    components:{
     scroll,
     com
    },
    props:{
     commentList:Object
    },
    data(){
     return {
         commentNum:'',
         isShowAll:false,
         hasComment:false
     }
    },
    created(){
        this.commentNum=this.commentList.commenttotal
        if(this.commentNum===0){
            this.hasComment=true
        }
    },
    filters:{
    ellipsis(value){
        if(!value){
            return 
        }
        if(value.length>40){
            return value.slice(0,50) + '...'
             
        }
        return value
    }
    },
    methods:{
        back(){
            this.$emit('backPlayer')
        },
       
    }
}
</script>

<style scoped>
.scroll {
    position: absolute;
    top:3rem;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
}
 .comment{
     position: fixed;
     top: 0;
     left: 0;
     right: 0;
     bottom: 0;
     z-index: 200;
     background-color: #000;
 }
 .nav {
     width: 100%;
     height: 3rem;
     background-color: rgb(63, 62, 62);
     text-align: center
 }
 .nav span{
     line-height: 3rem;
     font-size: 1.2rem;
     font-weight: 600;
 }
 .nav i {
     position: absolute;
     top: 10px;
     left: 10px;
     font-size: 1.6rem;
 }
.content{
     
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 1rem  ;
}
.content_item{
    position: relative;
    display: flex;
    flex-direction: row;
     background-color: rgb(34, 34, 34);
     border-radius: 1rem;
     margin-top: 0.8rem;
     padding: 0 0.5rem 0 0
}
.content_item_img {
    width: 4rem;
}
.content_item_img img {
    width: 2rem;
    height: 2rem;
    border-radius: 100%;
    margin: 0.5rem 0 0 0.5rem;
}
.content_item_text {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.content_item_text p {
    margin: 1rem 0 1.5rem 0.5rem;
    color:rgb(206, 206, 206);
    font-size: 1rem;
}
.content_item_text span {
    margin-bottom: 1.1rem;
    color:rgb(192, 189, 189);
    line-height: 1.5rem; 
}
.content_item_text i {
    font-style: normal;
    color:rgb(71, 161, 245);
    font-size: 14px;
    margin: -5px 0 10px 0px;
}
.praise{
    position: absolute ;
    top: 0.5rem;
    right: 0.5rem;
}
.zan{
    color:red
}
.no_result{
    width: 15rem;
    height: 15rem;
    margin:1rem auto;
    text-align: center;
}
.no_result img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
.no_result p{
    margin: 3rem 0 5rem 0;
    font-size: 1.2rem;
    font-weight: 600;
}
</style>