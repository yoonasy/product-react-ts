import * as Mock from "mockjs";
import { MenuData } from "@/utils/menu";

Mock.setup({
  timeout: 0 // 延迟响应
})

Mock.mock(import.meta.env.VITE_BASE_URL + "/getProductList", (options: any) => {
  const req = JSON.parse(options.body)
  const size = req.size || 20

  return Mock.mock({
    code: 0,
    msg: "mock数据返回成功！",
    [`data|${size}`]: [
      {
        'id': '@guid',
        'type|1': req.type ? [req.type]: MenuData.map(e => e.type).filter(e => !!e),
        'name': '@ctitle(6, 12)',
        'price': '@float(0.01,100)',
        'img': '@image("300x300")',
        'desc': '@cparagraph()',
        'volume': '@integer(600, 9999)'
      }
    ]
  })
})

export default Mock
