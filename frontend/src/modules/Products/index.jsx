import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Product from './components/Product'

function Products() {
  const [products, setProducts] = useState([])
  const getProducts = () => {
    setProducts([
      {
        _id: 1,
        title: 'product 1',
        description: 'product description',
        noOfReviews: 100,
        price: 2300,
        src: 'https://media.istockphoto.com/photos/background-for-cosmetic-products-of-natural-beige-color-picture-id1273934874?s=612x612',
      },
      {
        _id: 2,
        title: 'product 2',
        description: 'product description',
        noOfReviews: 100,
        price: 230,
        src: 'https://media.istockphoto.com/photos/background-for-cosmetic-products-of-natural-beige-color-picture-id1273934874?s=612x612',
      },
      {
        _id: 2,
        title: 'product 2',
        description: 'product description',
        noOfReviews: 100,
        price: 230,
        src: 'https://media.istockphoto.com/photos/background-for-cosmetic-products-of-natural-beige-color-picture-id1273934874?s=612x612',
      },
      {
        _id: 2,
        title: 'product 2',
        description: 'product description',
        noOfReviews: 100,
        price: 230,
        src: 'https://media.istockphoto.com/photos/background-for-cosmetic-products-of-natural-beige-color-picture-id1273934874?s=612x612',
      },
      {
        _id: 2,
        title: 'product 2',
        description: 'product description',
        noOfReviews: 100,
        price: 230,
        src: 'https://media.istockphoto.com/photos/background-for-cosmetic-products-of-natural-beige-color-picture-id1273934874?s=612x612',
      },
      {
        _id: 2,
        title: 'product 2',
        description: 'product description',
        noOfReviews: 100,
        price: 230,
        src: 'https://media.istockphoto.com/photos/background-for-cosmetic-products-of-natural-beige-color-picture-id1273934874?s=612x612',
      },
      {
        _id: 2,
        title: 'product 2',
        description: 'product description',
        noOfReviews: 100,
        price: 230,
        src: 'https://media.istockphoto.com/photos/background-for-cosmetic-products-of-natural-beige-color-picture-id1273934874?s=612x612',
      },
      {
        _id: 2,
        title: 'product 2',
        description: 'product description',
        noOfReviews: 100,
        price: 230,
        src: 'https://media.istockphoto.com/photos/background-for-cosmetic-products-of-natural-beige-color-picture-id1273934874?s=612x612',
      },
      {
        _id: 2,
        title: 'product 2',
        description: 'product description',
        noOfReviews: 100,
        price: 230,
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
        justifyContent: 'flex-start',
      }}
    >
      {products.map((product, index) => (
        <Product
          id={product._id}
          title={product.title}
          description={product.description}
          img={{ src: product.src }}
          price={product.price}
          noOfReviews={product.noOfReviews}
          key={index}
        />
      ))}
    </div>
  )
}

export default Products
