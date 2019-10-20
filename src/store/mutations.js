 
import *as types from './mutation-types';

export default {
    
    SingerDetail(state,singer){
        state.singer=singer
    },
    getSongListId(state,data){
      state.songListId=data            
    },
    getSongListData(state,data){
      state.listData=data
    },
    getRankList(state,data){
      state.rankList=data
    },
    [types.PLAYING](state,flag){
     state.playing=flag
    },
    [types.FULL_SCREEN](state,flag){
    state.fullScreen=flag
    },
    [types.PLAYLIST](state,list){
    state.playList=list
    },
    [types.SEQUENCE_LIST](state,list){
        state.sequenceList=list
    },
    [types.MODE](state,mode){
        state.mode=mode
    },
    [types.CURRENT_INDEX](state,index){
     state.currentIndex=index
    },
    [types.SEARCH_HISTORY](state,data){
      state.searchHistory=data
    },
    [types.PLAY_HISTORY](state,data){
     state.playHistory=data
    },
    [types.FAVORITE_LIST](state,list){
      state.favoriteList=list
     },
}