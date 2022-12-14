import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productReducer } from './reducers/ProductReducer'
import { productDetailsReducer } from './reducers/ProductReducer'

const reducer = combineReducers({
  products: productReducer,
  product: productDetailsReducer
})

let initialState = {}
const middleware = [thunk]
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store