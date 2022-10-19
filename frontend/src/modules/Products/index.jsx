import React from 'react'
import Product from './components/Product'

function Products() {
  return (
    <>
      <Product
        title="test product"
        description="test description"
        img={{
          src: 'https://media.istockphoto.com/photos/background-for-cosmetic-products-of-natural-beige-color-picture-id1273934874?s=612x612',
          alt: 'product image for cosmetic products of natural',
        }}
      />
    </>
  )
}

export default Products
