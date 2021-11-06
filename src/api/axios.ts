import axios from 'axios'
// import Cookies from 'js-cookie'

// 请求拦截
axios.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 响应拦截
axios.interceptors.response.use(
  (response) => {
    // 对响应数据做些事

    return response
  },
  (error: any) => {
    let err: any = {}
    // 对响应错误做点什么
    if ((error.response && error.response.status && error.response.status >= 500) || !error.response)
      err = {
        type: 'error',
        message: '哎呀，服务器忙不过来啦，请稍后再试一下',
        showClose: true
      }
    else if ((error.response && error.response.status && error.response.status === 404) || !error.response)
      err = {
        type: 'error',
        message: '哎呀，服务器开了小差，暂时没有办法处理哦',
        showClose: true
      }
    else if ((error.response && error.response.status && error.response.status >= 400) || !error.response)
      err = {
        type: 'error',
        message: '哎呀，服务器忙不过来啦，请稍后再试一下',
        showClose: true
      }

    return Promise.resolve(error)
  }
)

export default {
  post<T = any>(url: string, data = {}, config = {}): Promise<RES<T>> {
    // const Token = Cookies.get('Token') ? 'Token ' + Cookies.get('Token') : ''

    // if (data) {
    //   const fm = new FormData()
    //   for (const key in data) {
    //     if (data[key as keyof typeof data] === undefined) {
    //       continue
    //     }
    //     fm.append(key, data[key as keyof typeof data])
    //   }
    //
    //   data = fm
    // }

    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        baseURL: import.meta.env.VITE_BASE_URL,
        url,
        data: data,
        timeout: +import.meta.env.VITE_TIMEOUT,
        // headers: { Authorization: Token },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        ...config
      })
        .then((response) => {
          if (response.data.code !== 0) {
            // ElMessage.error(response.data.desc || '服务器繁忙请稍后再试！')
            throw response.data.desc
          }
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  /**
   * PostSteam 返回流处理
   * @param url
   * @param data
   * @param config
   * @returns {Observable<Object<*>>}
   */
  /*  posts(url: string, data: any = {}, config: any = {}) {
    return Observable.from(this.post(url, data, config)).pipe(
      filter((data) => (config.filter !== false ? data && data.code === 200 : !0))
    )
  },*/
  get<T = any>(url: string, params = {}, config = {}): Promise<RES<T>> {
    // const Token = Cookies.get('Token') ? 'Token ' + Cookies.get('Token') : ''

    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        baseURL: import.meta.env.VITE_BASE_URL,
        url,
        params,
        timeout: +import.meta.env.VITE_TIMEOUT,
        // headers: { Authorization: Token },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        ...config
      })
        .then((response) => {
          if (response.data.code !== 1) {
            // ElMessage.error(response.data.desc || '服务器繁忙请稍后再试！')
            throw response.data.desc
          }
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  /**
   * GetSteam 返回流处理
   * @param url
   * @param data
   * @param config
   * @returns {Observable<Object<*>>}
   */
  // gets(url: string, data: any, config: any) {
  //   return Observable.from(this.get(url, data, config)).filter((data: RES) =>
  //     config.filter !== false ? data && data.code === 200 : !0
  //   )
  // }
}
