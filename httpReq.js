/* 
  自定义封装的http请求方法——httpReq
  其中对错误进行了统一处理
*/
import axios from 'axios'
import { message } from 'antd'
// 给请求地址前加一个"/api"，在请求头中添加Token
const instance = axios.create({
  baseURL: '/',
})
// 添加返回拦截器，直接获取返回内容的data
instance.interceptors.response.use((res) => {
  return res.data
})
// 封装axios方法，并导出httpReq为新的请求工具
export const httpReq = (method, url, data, resType) => {
  return new Promise((resolve, reject) => {
    instance({
      method: method,
      url: url,
      data: data,
      responseType: resType
    }).then(
      (data) => {
        // 可拓展
        resolve(data)
      },
      (err) => {
        // 错误在这统一处理
        const status = err.response.status
        const errInfo = err.response.data.message || status
        // 将错误信息传递下去，用于结束请求loading
        reject({ status, errInfo })
        // 根据状态码做提示处理
        switch (status) {
          case 401:
            message.error(`认证失败: ${errInfo}`)
            break
          case 403:
            message.error(`未授权: ${errInfo}`)
            setTimeout(() => {
              window.location.href = '/'
            }, 1500)
            break
          case 404:
            message.error(`未找到资源: ${errInfo}`)
            break
          case 500:
            message.warning(`服务器未能处理: ${errInfo}`)
            break
          default:
            break
        }
      }
    )
  })
}
