import React from 'react'

function Product({ img, title, description }) {
  return (
    <>
      <img src={img.src} alt="product images" width="500px" />
      <p>{title}</p>
      <p>{description}</p>
    </>
  )
}

export default Product
