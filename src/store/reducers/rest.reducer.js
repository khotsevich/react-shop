import {
  REST_REQUEST,
  REST_ERROR,
  CREATE_REST_SUCCESS,
  FETCH_REST_SUCCESS,
  ADD_FOOD,
  DELETE_FOOD,
  FETCH_ORDERS
} from '../types'

const initialState = {
  rests: [],
  orders: []
}

export const restReducer = (state = initialState, action) => {
  switch (action.type) {
    case REST_REQUEST:
      return {
        ...state,
        loading: true
      }
    case REST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case CREATE_REST_SUCCESS:
      return {
        ...state,
        rests: [...state.rests, action.payload]
      }
    case FETCH_REST_SUCCESS:
      return {
        ...state,
        rests: action.payload
      }
    case ADD_FOOD: {
      const rests = state.rests.map(r => {
        if (r.id.toString() === action.payload.id.toString()) {
          r.food = action.payload.food
        }
        return r
      })
      return {
        ...state,
        rests
      }
    }
    case DELETE_FOOD: {
      const rests = state.rests.map(r => {
        if (r.id.toString() === action.payload.id.toString()) {
          r.food = action.payload.food
        }
        return r
      })
      return {
        ...state,
        rests
      }
    }
    case FETCH_ORDERS:
      return {
        ...state,
        orders: action.payload
      }
    default:
      return state
  }
}
