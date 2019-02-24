/**
 * axios全局配置
 * TODO: 拦截器全局配置，根据实际情况修改
 */
import axios from 'axios'
import qs from 'qs'

const service = axios.create({
    // 请求超时时间
    timeout: 5000                 
})


// http request 拦截器
// 每次请求都为http头增加Authorization字段，其内容为token
/*
* 增加请求拦截器
*/
service.interceptors.request.use((config) => {
    if(config.method === 'post'){
      config.headers={
        'Content-Type': 'application/json'
       }
      //config.data = qs.stringify(config.data);
    }

    // 预处理请求的信息
    return config
  }, (error) => {
    // 预处理请求有异常error时抛出错误
    return Promise.reject(error)
  })
   
  /*
  * 增加相应拦截器
  */
 service.interceptors.response.use((response) => {
    // 预处理相应的数据
    return Promise.resolve(response.data) 
  }, (error) => {
    // 错误返回 状态码验证
    return Promise.reject(error)
  })

  export function get(url, params){    
    return new Promise((resolve, reject) =>{        
        axios.get(url, {            
            params: params        
        })        
        .then(res => {            
            resolve(res);        
        })        
        .catch(err => {            
            reject(err)        
        })    
    });
}
/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url, params) {    
    return new Promise((resolve, reject) => {         
        axios.post(url, params)        
        .then(res => {            
            resolve(res);        
        })        
        .catch(err => {            
            reject(err)        
        })    
    });
}

export default service