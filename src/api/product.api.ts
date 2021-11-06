import axios from './axios'
import { ProductItem } from "../store/product/product";

/**
 * 格式化小数
 * @param value
 * @param args
 */
const toFixed = (value: number, ...args: any[]): number => {
  return Number(value.toFixed(args[0] || 2));
}

const productApi = {
  /**
   * 获取商品列表
   * @param type 商品类型
   * @param size
   */
  async getProductList(type: number, size: number) {
    const res = await axios.post<ProductItem[]>('/getProductList', { type, size })
    return res.data.map(e => {
      e.price = toFixed(e.price, 2)

      return e
    })
  },
}

export default productApi
