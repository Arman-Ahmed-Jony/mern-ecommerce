import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
function ProductDetails() {
    let { id } = useParams()
    let test = useSearchParams()
  return (
    <div>
      {test}
      hello product details
    </div>
  )
}

export default ProductDetails
