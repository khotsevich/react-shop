import {
  CREATE_USER_SUCCESS,
  LOGOUT_USER,
  LOGIN_USER_SUCCESS,
  CLEAR_ERROR,
  USER_REQUEST,
  USER_ERROR,
  PATCH_USER_SUCCESS,
  ADD_TO_CART,
  DELETE_FROM_CART,
  CREATE_ORDER
} from '../types'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  isAdmin: user?.isAdmin,
  isAuth: user?.isAuth,
  id: user?.id,
  email: user?.email,
  name: user?.name,
  address: user?.address,
  cart: user?.cart,
  loading: false,
  error: null
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        isAuth: true,
        id: action.payload.id,
        email: action.payload.email,
        name: action.payload.name,
        address: action.payload.address,
        loading: false,
        error: null
      }
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        isAuth: true,
        isAdmin: action.payload.isAdmin,
        id: action.payload.id,
        email: action.payload.email,
        name: action.payload.name,
        address: action.payload.address,
        cart: action.payload.cart,
        loading: false,
        error: null
      }
    case PATCH_USER_SUCCESS:
      return {
        ...state,
        id: action.payload.id,
        email: action.payload.email,
        name: action.payload.name,
        address: action.payload.address,
        cart: action.payload.cart,
        loading: false,
        error: null
      }
    case LOGOUT_USER:
      return {
        ...state,
        isAdmin: false,
        isAuth: false,
        id: null,
        email: null,
        name: null,
        address: null,
        cart: null
      }
    case ADD_TO_CART:
      return {
        ...state,
        cart: action.payload
      }
    case DELETE_FROM_CART:
      return {
        ...state,
        cart: action.payload
      }
    case CREATE_ORDER:
      return {
        ...state,
        cart: []
      }
    case CLEAR_ERROR:
      return {
        ...state,
        error: null
      }
    default:
      return state
  }
}
