import storage from 'good-storage'

const SEARCH_KEY='_search_'
const SEARCH_MAX_LENGTH=15
const PLAY_KEY='__play__'
const PLAY_MAX_LENGTH=20
const FAVORITE_KEY='__favorite__'
const FAV_MAX_LENGTH=200
function insertArray(arr,val,compare,maxLen){
    //比较函数
    const index=arr.findIndex(compare)
    if(index===0){
        return 
    }
    if(index>0){
        arr.splice(index,1)
    }
    arr.unshift(val)
    if(maxLen&&arr.length>maxLen){
        arr.pop()  //若超过储存上限，删掉最初的，也就是数组里最后一个，因为新数据时插入在数组开头的
    }
}

function deleteFromArray(arr,compare){
    const index=arr.findIndex(compare)
    if(index> -1){
        arr.splice(index,1)
    }
}

export function saveSearch(query){
  let searches=storage.get(SEARCH_KEY,[])
  insertArray(searches,query,(item)=>{
      return item===query
  },SEARCH_MAX_LENGTH)
  storage.set(SEARCH_KEY,searches)
  return searches
}

export function savePlay(song){
    let songs=storage.get(PLAY_KEY,[])
    insertArray(songs,song,(item)=>{
       
        return  song.id===item.id 
    },PLAY_MAX_LENGTH)
    storage.set(PLAY_KEY,songs)
    return songs
}
export function loadPlay(){
    return storage.get(PLAY_KEY,[])
}


export function loadSearch(){
    return storage.get(SEARCH_KEY,[])
}

export function deleteSearchHistoryItem(query){
    let searches=storage.get(SEARCH_KEY,[])
    deleteFromArray(searches,(item)=>{
        return item===query
    })
    storage.set(SEARCH_KEY,searches)
    return searches
}

export function deleteSearchAll(){
    storage.remove(SEARCH_KEY)
    return []
}

export function saveFav(song){
    let songs=storage.get(FAVORITE_KEY,[])
    insertArray(songs,song,(item)=>{
        return song.id===item.id
    },FAV_MAX_LENGTH)
    storage.set(FAVORITE_KEY,songs)
    return songs
}


export function deleteFav(song){
    let songs=storage.get(FAVORITE_KEY,[])
    deleteFromArray(songs,(item)=>{
        return song.id===item.id
    },FAV_MAX_LENGTH)
    storage.set(FAVORITE_KEY,songs)
    return songs
}

export function loadFav(){
    return storage.get(FAVORITE_KEY,[])
}