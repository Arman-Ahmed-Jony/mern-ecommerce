import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Product from './components/Product'
import { getProducts } from '../../store/actions/productAction'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'

function Products() {
  const alert = useAlert()
  const dispatch = useDispatch()
  const {products, loading, total, error} = useSelector(state => state.products)

  useEffect(() => {
    if (error) {
      return alert.error(error)
    }
    dispatch(getProducts({resultPerPage: '4'}))
  }, [dispatch, error, alert])
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
      }}
    >
      { loading ? <h1>loading...</h1> : products?.map((product, index) => (
        <Product
          id={product._id}
          title={product.name}
          description={product.description}
          img={{ src: 'https://source.unsplash.com/featured/200/?product' }}
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
