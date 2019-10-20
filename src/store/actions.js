 import *as types from './mutation-types'
import {playMode}  from '../common/js/config'
import {shuffle} from '../common/js/util'
import {saveSearch,deleteSearchHistoryItem,deleteSearchAll,savePlay,saveFav,deleteFav} from '../common/js/catch'
 


let findIndex=(list,song)=>{
  return list.findIndex((item)=>{
    return item.id===song.id
  })
}

export const selectPlay=function({commit,state},{list,index}){
  commit(types.PLAYING,true)
  if(state.mode===playMode.random){
    let randomList = shuffle(list)
    commit(types.PLAYLIST,randomList)
    index=findIndex(randomList,list[index])
  }else{
    commit(types.PLAYLIST,list)
  }
  
  commit(types.CURRENT_INDEX,index)
  commit(types.FULL_SCREEN,true)
  commit(types.SEQUENCE_LIST,list)
}
 
export const randomPlay = function ({commit},{list}){
   commit(types.MODE,playMode.random)
   commit(types.SEQUENCE_LIST,list)
   let randomList = shuffle(list)
   commit(types.PLAYLIST,randomList)
   commit(types.CURRENT_INDEX,0)
   commit(types.FULL_SCREEN,true)
   commit(types.PLAYING,true)
}
 
export const insertSong= function({commit,state},song){
   let playlist=state.playList.slice()
   let sequenceList=state.sequenceList.slice()
   let currentIndex=state.currentIndex
   let currentSong=playlist[currentIndex]
   let findPlayIndex=findIndex(playlist,song)
   currentIndex++
   playlist.splice(currentIndex,0,song)
   if(findPlayIndex>-1){
     if(currentIndex>findPlayIndex){
       playlist.splice(findPlayIndex,1)
       currentIndex--
     }else{
       playlist.splice(findPlayIndex+1,1)
     }
   }

   let currentSongIndex=findIndex(sequenceList,currentSong)+1
   let fsIndex=findIndex(sequenceList,song)
   sequenceList.splice(currentSongIndex,0,song)
   if(fsIndex>-1){
     if(currentSongIndex>fsIndex){
       sequenceList.splice(fsIndex,1)
     }else{
       sequenceList.splice(fsIndex+1,1)
     }
   }
   commit(types.PLAYLIST,playlist)
   commit(types.SEQUENCE_LIST,sequenceList)
   commit(types.CURRENT_INDEX,currentIndex)
   commit(types.FULL_SCREEN,true)
   commit(types.PLAYING,true)
}

export const saveSearchHistory=function({commit},query){
  commit(types.SEARCH_HISTORY,saveSearch(query))
}

export const savePlayHistory=function({commit},song){
  commit(types.PLAY_HISTORY,savePlay(song))
}


export const deleteHistoryItem=function({commit},query){
  commit(types.SEARCH_HISTORY,deleteSearchHistoryItem(query))
}

export const deleteHistoryAll=function({commit}){
  commit(types.SEARCH_HISTORY,deleteSearchAll())
}

export const deleteSong=function({commit,state},song){
  let playList=state.playList.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex=state.currentIndex
  let DeleteIndex=findIndex(playList,song)
  playList.splice(DeleteIndex,1)
  let deleteIndex=findIndex(sequenceList,song)
  sequenceList.splice(deleteIndex,1)

  if(currentIndex>DeleteIndex || currentIndex === playList.length){
     currentIndex--
  }

  commit(types.PLAYLIST,playList)
  commit(types.SEQUENCE_LIST,sequenceList)
  commit(types.CURRENT_INDEX,currentIndex)

  if(!playList.length){
    commit(types.PLAYING,false)
  }else{
    commit(types.PLAYING,true)
  }
}

export const deleteListAll=function({commit}){
  commit(types.PLAYLIST,[])
  commit(types.SEQUENCE_LIST,[])
  commit(types.CURRENT_INDEX,-1)
  commit(types.PLAYING,false)
}

export const saveFavoriteList = function({commit},song){
  commit(types.FAVORITE_LIST,saveFav(song))
}

export const deleteFavoriteList = function({commit},song){
  commit(types.FAVORITE_LIST,deleteFav(song))
}