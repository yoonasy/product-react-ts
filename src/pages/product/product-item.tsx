import './product-item.scss'
import PropTypes from 'prop-types'
import { MenuData } from "@/utils/menu";
import { Link } from "react-router-dom";
import { ProductItem as ItemType } from "@/store/product/product";
import { useEffect, useRef } from "react";

interface PropsType {
  data: ItemType
}

ProductItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    volume: PropTypes.number.isRequired
  })
}

function ProductItem({data}: PropsType) {
  const hidden = false
  const initial = useRef(false)
  const priceRef = useRef<HTMLEmbedElement>(null)
  const descRef = useRef<HTMLAnchorElement>(null)

  /* methods */
  const typeName = (type: number): string => {
    return MenuData.find(e => e.type == type)?.name as string
  }

  const colorAnimate = (dom: HTMLElement) => {
    dom.onanimationend = function () {
      dom.onanimationend = null
      dom.classList.remove('colorAnim')
    }
    // dom.offsetWidth // 重绘 用onanimationed删除样式减少文字渲染跳动时间
    dom.classList.add('colorAnim')
  }

  /* effect */
  useEffect(() => {
    if (!initial.current) {
      initial.current = true
      return
    }

    if (priceRef.current) {
      colorAnimate(priceRef.current)
    }

    if (descRef.current) {
      colorAnimate(descRef.current)
    }

    return () => {}; // 析构函数Destructor
  }, [data]);

  return (
    <div className={['card', hidden ? 'hidden' : ''].join(' ')}>
      <section>
        <Link to={`/product/detail/${data.id}`}><img src={data.img} alt="" /></Link>
      </section>

      <div className="card-wrap">
        <p className="productPrice">
          <em ref={priceRef} className="txt" title={data.price.toFixed(2)}><b>¥</b>{data.price.toFixed(2)}</em>
        </p>

        <p className="productTitle">
          <Link ref={descRef} className="txt" to={`/product/detail/${data.id}`}>[{typeName(data.type)}] {data.desc}</Link>
        </p>

        <p className="productShop">
          <a className="productShop-name" href="https://chaoshi.tmall.com/" target="_blank">天猫超市</a>
          <span className="productShop-type">{typeName(data.type)}</span>
        </p>

        <p className="productStatus">
          <span>月成交 <em>{data.volume}+笔</em></span>
          <span className="productComment">评价 <a
            href="https://detail.tmall.com/data.htm?id=539062758214&amp;skuId=null&amp;areaId=511000&amp;cat_id=2&amp;is_b=1&amp;rn=633171671fc8b6785c699f49e46818df&amp;on_comment=1#J_TabBar"
            target="_blank">9.6万</a></span>
          <span className="aliww"><a className="ww-inline ww-online"
                                     title="点此可以直接和卖家交流选好的宝贝，或相互交流网购体验，还支持语音视频噢。" /></span>
        </p>
      </div>
    </div>
  )
}

export default ProductItem
