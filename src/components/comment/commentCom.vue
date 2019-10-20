<template>
     
       <div class='content_item_text'>
                    <p>{{it.nick}}</p>
                    <span v-show='isShowAll'>{{it.rootcommentcontent |  ellipsis}}</span>
                    <span v-show='!isShowAll'>{{it.rootcommentcontent }}</span>
                    <i @click='showAll($event)' v-show='it.rootcommentcontent.length>50'>查看全文</i>  
                </div> 
     
    </template>

<script>
export default {
    props:{
        it:{}
    },
    data(){
       return {
           isShowAll:true,
       }
    },
    filters:{
    ellipsis(value){
        if(!value){
            return 
        }
        if(value.length>40){
            return value.slice(0,35) + '...'
             
        }
        return value
    }
    },
    methods:{
         showAll(e){
             if(e.target.innerHTML=='查看全文'){
               e.target.innerHTML='收起'   
             }else{
                 e.target.innerHTML='查看全文'  
             }
          
         
          this.isShowAll=!this.isShowAll
        }
    }
}
</script>

<style scoped>
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
</style>