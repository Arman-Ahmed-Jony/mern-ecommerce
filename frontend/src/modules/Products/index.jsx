import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Product from './components/Product'
import { getProducts } from '../../store/actions/productAction'
import {useSelector, useDispatch} from 'react-redux'
function Products() {
  const dispatch = useDispatch()
  const {products} = useSelector(state => state.products)


  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])
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
          title={product.name}
          description={product.description}
          img={{ src: 'https://source.unsplash.com/featured/400X400/?product' }}
          price={product.price}
          rating={product.rating}
          noOfReviews={product.numOfReviews}
          key={index}
        />
      ))}
    </div>
  )
}

export default Products
