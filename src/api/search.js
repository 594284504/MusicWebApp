import jsonp from '../common/js/jsonp'
 import {commonParams,options} from './config'
 import axios from 'axios';
export function getSearch(query,page,zhida,num){
   const url='/api/search'

   const data ={
    ct:24,
    qqmusic_ver:1298,
    new_json:1,
    remoteplace:'txt.yqq.song',
    searchid:58573909297481941,
    t:0,
    aggr:1,
    cr:1,
    catZhida:zhida,
    lossless:0,
    flag_qc:0,
    p:page,
    n:num,
    w:query,
    g_tk:5381,
    loginUin:594284504,
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
        return  Promise.resolve(res.data)
      
    })
}

export function getSearchHot(){
    const url='https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
 
    const data ={
        g_tk:938407465,
        uin:594284504,
        format:'json',
        inCharset:'utf-8',
        outCharset:'utf-8',
        notice:0,
        platform:'h5',
        needNewCode:1
        }
 
      return jsonp(url,data,options)  
 }