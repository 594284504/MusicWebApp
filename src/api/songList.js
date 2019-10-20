import {getLyric}  from '../api/songLyric'
import {Base64} from 'js-base64'
 
export default class Song{
    constructor({id,mid,singer,name,album,image,url,singerdata}){
        this.id=id
        this.mid=mid
        this.singer=singer
        this.name=name
        this.album=album
        this.image=image
        this.url=url
        this.singerdata=singerdata

    }

    getLyric(){
        if(this.lyric){
            return Promise.resolve(this.lyric)
        }
        return new Promise((resolve,reject)=>{
             getLyric(this.mid).then((res)=>{
            resolve(Base64.decode(res.lyric))
        }) 
        })
       
    }
}

export function createSong(singerData,vkey,singerdata){
    return new Song({
        id:singerData.id,
        mid:singerData.mid,
        singer:filterSinger(singerData.singer),
        name:singerData.name,
        album:singerData.album,
        image:`http://y.gtimg.cn/music/photo_new/T002R300x300M000${singerData.album.mid}.jpg?max_age=2592000`,
        url:`http://isure.stream.qqmusic.qq.com/C400${singerData.file.media_mid}.m4a?guid=6531591040&vkey=${vkey}&uin=0&fromtag=66`,
        singerdata:singerdata
    })
   
}

export function filterSinger(singer){
  let ret=[]
  if(!singer){
      return ''
  }
  singer.forEach((s)=>{
      ret.push(s.name)
  })
  return ret.join('/')
}