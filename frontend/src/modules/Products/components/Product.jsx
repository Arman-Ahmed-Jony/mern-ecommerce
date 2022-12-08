import React from 'react'
import { useEffect } from 'react'
import ReactStars from 'react-rating-stars-component'
import { Link } from 'react-router-dom'
import style from '../style.module.css'

function Product({
  id,
  img,
  title,
  description,
  ratingChanged,
  noOfReviews,
  price,
  rating
}) {
  useEffect(() => {
    
  }, [])
  const options = {
    count: 5,
    onChange: ratingChanged,
    size: 30,
    emptyIcon: <i className="far fa-star"></i>,
    halfIcon: <i className="fa fa-star-half-alt"></i>,
    fullIcon: <i className="fa fa-star"></i>,
    isHalf: true,
    edit: false,
    value: rating,
    activeColor: '#0ac43e',
  }
  return (
    <Link to={id} className={style['product-container']}>
      <img src={img.src} alt="product images" width="400px" />
      <p>{title}</p>
      <p>{description}</p>
      <div className={style.review}>
        <ReactStars {...options} /> ({noOfReviews} reviews)
      </div>
      <p className={style.price}>{price} ৳</p>
    </Link>
  )
}

export default Product
