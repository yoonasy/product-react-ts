import './product-detail.scss'
import { selectProduct, selectProductItem, ProductItem } from "@/store/product/product";
import { useAppSelector } from "@/store/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { useRef, MouseEvent, useState } from "react";

export default function ProductDetail() {
  const id = useParams()?.id || ''
  const list = useAppSelector(selectProduct);
  const data: ProductItem = selectProductItem(list, id) || {
    id: '',
    name: '',
    type: 0,
    price: 0,
    img: '',
    desc: '',
    volume: 0
  };

  const navigate = useNavigate()
  const [cur, setCur] = useState({ x: 0, y: 0 });
  const [preview, setPreview] = useState({ x: 0, y: 0 });
  const imgRef = useRef<HTMLImageElement>(null);

  /* methods */
  const onBack = () => {
    navigate(-1)
  }

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return

    const img = imgRef.current
    const w = img?.width as number
    const h = img?.height as number
    const left = img?.x as number
    const top = img?.y as number
    const glassWH = 218
    const glassHalf = glassWH / 2

    let x = event.pageX - left - glassHalf
    let y = event.pageY - top - glassHalf

    x = Math.max(0, x)
    y = Math.max(0, y)
    x = Math.min(w - glassWH, x)
    y = Math.min(h - glassWH, y)

    setCur({ x, y })
    setPreview({ x: w / glassWH * x, y: h / glassWH * y })
  }

  return (
    <div className="detail">
      <div className="detail-back" onClick={onBack}>返回列表</div>

      <div className="detail-wrap">
        <h2>产品详情</h2>
        <div>产品ID：{data.id}</div>

        <div className="zoom">
          <div className="zoom-wrap" onMouseMove={onMove}>
            <div className="zoom-glass" style={{left: cur.x + 'px', top: cur.y + 'px'}}></div>
            <img ref={imgRef} className="zoom-preview" src="https://img.alicdn.com/imgextra/i1/6000000002097/O1CN01dMsx1d1RMTGQNuy7I_!!6000000002097-0-picassoopen.jpg_430x430q90.jpg" />
          </div>

          <div className="zoom-big-wrap">
            <img style={{left: -preview.x + 'px', top: -preview.y + 'px'}} src="https://img.alicdn.com/imgextra/i1/6000000002097/O1CN01dMsx1d1RMTGQNuy7I_!!6000000002097-0-picassoopen.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}
