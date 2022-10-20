import React from 'react'

function Product({ img, title, description }) {
  return (
    <div style={{ width: '400px', margin: '10px' }}>
      <img src={img.src} alt="product images" width="400px" />
      <p>{title}</p>
      <p>{description}</p>
    </div>
  )
}

export default Product
