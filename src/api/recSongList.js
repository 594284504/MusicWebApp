import { commonParams,options } from "./config"
import axios from "axios"
import jsonp from '../common/js/jsonp'
// export   function getRecSongList(){
//     const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg?type=1&json=1&utf8=1&onlysong=0&new_format=1&disstid=6844821851&g_tk=5381&loginUin=594284504&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0'
//     return jsonp(url,options)
// }

export   function getRecSongList(disstid){
    const url = '/api/r'
    const data =  {
        type:1,
        json:1,
        utf8:1,
        onlysong:0,
        new_format:1,
        disstid:disstid,
        g_tk:5381,
        loginUin:0,
        hostUin:0,
        format:'json',
        inCharset:'utf8',
        outCharset:'utf-8',
        notice:0,
        platform:'yqq.json',
        needNewCode:0,
      }
       
    
    return axios.get(url,{
        params:data
    }).then((res)=>{
        return Promise.resolve(res.data) 
      
    })
}