import axios from 'axios'
import { objectToApiQuaryString } from '../../utilities/methods'
import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  CLEAR_ERRORS,
} from '../constants/productConstants'

export const getProducts = (criteria = {}) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST })

    const { data } = await axios.get(`/api/v1/products${objectToApiQuaryString(criteria)}`)
    dispatch({ type: ALL_PRODUCT_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload: error.response.data.message,
    })
  }
}

export const getProductDetails = (id ,criteria = {}) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST })
    const { data} = await axios.get(`/api/v1/products/${id}${objectToApiQuaryString(criteria)}`)
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    })
  }
}

// clearing errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  })
}
