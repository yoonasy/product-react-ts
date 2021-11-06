interface RES<T = any> {
  data: T
  code: number
  msg: string
}

// // 请求返回分页
// interface Page<T = any> {
//   pageNumber: number
//   pageSize: number
//   totalPage: number
//   totalRow: number
//   list: T[]
// }

// // 请求返回RES
type PromiseRes<K = any> = Promise<RES<K>>

// // 请求返回带页码RES
// type PromisePage<K = any> = Promise<RES<Page<K>>>
