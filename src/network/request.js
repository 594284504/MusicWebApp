import axios from 'axios'
export function request(config){
   let instance = axios.create({
       baseURL='',
       timeout=1000
   })
   instance.interceptors.request.use(config=>{
       console.log('请求成功')
       return config
   },err=>{
       console.log(err) 
   })

   instance.interceptors.response.use(res=>{
     console.log('响应成功')
     return res
   },err=>{
      console.log(err)
   })

   return instance(config)


   }

