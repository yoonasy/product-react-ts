import './product-main.scss'
import { Suspense, lazy, useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import {
  fetchDataAsync,
  selectProduct,
} from '@/store/product/product';
import { useParams } from "react-router-dom";

const AsyncItem = lazy(() => import('./product-item'))

export default function ProductMain() {
  const size = 300 // 初始数据多少条
  const updateSize = 50 // 需要随机更新多少条 必须小于等于size
  const updateTime = 5e3 // 多久随机更新一次
  let timer = 0 // 定时器索引

  const type = Number(useParams().type) || 0
  const list = useAppSelector(selectProduct);
  const dispatch = useAppDispatch();

  /* methods */
  const loopUpdate = () => {
    clearInterval(timer) // pending中又取消的情况，这里再清除一次
    timer = setInterval(() => {
      dispatch(fetchDataAsync({type, size: updateSize, randomUpdate: true}))
    }, updateTime)
  }

  /* effect */
  useEffect(() => {
    clearInterval(timer)
    dispatch(fetchDataAsync({type, size})).finally(() => loopUpdate()) // 需要放到生命周期中请求vite中 放到外面会被react初始化 会请求两次

    return () => {
      console.log('Destructors 析构函数 -> componentWillUnmount')
      clearInterval(timer)
    };
  }, [type]);

  return (
    <main className="product">
      <section className="product-wrap">
        <div className="product-list">
          <Suspense fallback={<div>loading...</div>}>
            {list.map(item => (
              <AsyncItem data={item} key={item.id} />
            ))}
          </Suspense>
        </div>
      </section>
    </main>
  )
}
