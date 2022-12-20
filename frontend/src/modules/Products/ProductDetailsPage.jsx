import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getProductDetails } from '../../store/actions/productAction'
import ProductDetailsCard from './components/ProductDetailsCard'

function ProductDetails() {
  const dispatch = useDispatch()
  const { product, loading, error } = useSelector((state) => state.product)
  let { id } = useParams()
  useEffect(() => {
    dispatch(getProductDetails(id))
  }, [dispatch, id])

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
          <div>
            <ProductDetailsCard/>
          <p>id: {product._id}</p>
          <p>name: {product.name}</p>
          <p>name: {product.description}</p>
          <p>name: {product.price}</p>
          <p>name: {product.category}</p>
          <p>name: {product.stock}</p>
          <p>name: {product.rating}</p>
          <p>name: {product.numOfReviews}</p>
        </div>
      )}
    </>
  )
}

export default ProductDetails
