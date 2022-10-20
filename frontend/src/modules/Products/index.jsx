import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Product from './components/Product'

function Products() {
  const [products, setProducts] = useState([])
  const getProducts = () => {
    setProducts([
      {
        title: 'product 1',
        description: 'product description',
        src: 'https://media.istockphoto.com/photos/background-for-cosmetic-products-of-natural-beige-color-picture-id1273934874?s=612x612',
      },
      {
        title: 'product 2',
        description: 'product description',
        src: 'https://media.istockphoto.com/photos/background-for-cosmetic-products-of-natural-beige-color-picture-id1273934874?s=612x612',
      },
      {
        title: 'product 3',
        description: 'product description',
        src: 'https://media.istockphoto.com/photos/background-for-cosmetic-products-of-natural-beige-color-picture-id1273934874?s=612x612',
      },
      {
        title: 'product 1',
        description: 'product description',
        src: 'https://media.istockphoto.com/photos/background-for-cosmetic-products-of-natural-beige-color-picture-id1273934874?s=612x612',
      },
      {
        title: 'product 2',
        description: 'product description',
        src: 'https://media.istockphoto.com/photos/background-for-cosmetic-products-of-natural-beige-color-picture-id1273934874?s=612x612',
      },
      {
        title: 'product 3',
        description: 'product description',
        src: 'https://media.istockphoto.com/photos/background-for-cosmetic-products-of-natural-beige-color-picture-id1273934874?s=612x612',
      },
      {
        title: 'product 1',
        description: 'product description',
        src: 'https://media.istockphoto.com/photos/background-for-cosmetic-products-of-natural-beige-color-picture-id1273934874?s=612x612',
      },
      {
        title: 'product 2',
        description: 'product description',
        src: 'https://media.istockphoto.com/photos/background-for-cosmetic-products-of-natural-beige-color-picture-id1273934874?s=612x612',
      },
      {
        title: 'product 3',
        description: 'product description',
        src: 'https://media.istockphoto.com/photos/background-for-cosmetic-products-of-natural-beige-color-picture-id1273934874?s=612x612',
      },
    ])
  }

  useEffect(() => {
    getProducts()
  }, [])
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      }}
    >
      {products.map((product) => (
        <Product
          title={product.title}
          description={product.description}
          img={{ src: product.src }}
        />
      ))}
    </div>
  )
}

export default Products
