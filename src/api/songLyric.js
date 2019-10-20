import { commonParams,options} from "./config"
import jsonp from '../common/js/jsonp'
import axios from "axios"

 export function getComment(id){
     const url='/api/getcomment'
     const data={
        g_tk:938407465,
        uin:594284504,
        format:'json',
        inCharset:'utf-8',
        outCharset:'utf-8',
        notice:0,
        platform:'h5',
        needNewCode:1,
        cid:205360772,
        reqtype:1,
        cmd:8,
        needmusiccrit:0,
        pagesize:3,
        lasthotcommentid:0,
        qq:594284504,
        msg_comment_id:'',
        pagenum:0,
        biztype:1,
        topid:id,
        ct:999,
        _:1570967712129
     }
     return axios.get(url,{
        params:data
    }).then((res)=>{
        return  res.data
      
    })
 }

export   function getLyric(mid){
    const url = '/api/lyric'
    const data = Object.assign({}, commonParams, {
        songmid: mid,
        platform: 'yqq.json',
        hostUin: 0,
        needNewCode: 0,
        pcachetime: +new Date(), 
      })
       
    
    return axios.get(url,{
        params:data
    }).then((res)=>{
        return  res.data
      
    })
}