import axios from '../../utils/axios'
import {
  ADD_FOOD,
  CREATE_REST_SUCCESS,
  FETCH_REST_SUCCESS,
  REST_ERROR,
  REST_REQUEST,
  DELETE_FOOD,
  FETCH_ORDERS
} from '../types'

export const createRest = (name, photo) => async dispatch => {
  try {
    dispatch({ type: REST_REQUEST })
    const { data } = await axios.post('/rests', { name, photo, food: [] })
    return dispatch({
      type: CREATE_REST_SUCCESS,
      payload: { id: data.id, name: data.name, photo: data.photo, food: [] }
    })
  } catch (e) {
    return dispatch({
      type: REST_ERROR,
      payload: 'Ошибка при добавлении ресторана'
    })
  }
}

export const fetchRests = () => async dispatch => {
  try {
    dispatch({ type: REST_REQUEST })
    const { data } = await axios.get('/rests')
    return dispatch({ type: FETCH_REST_SUCCESS, payload: data })
  } catch (e) {
    return dispatch({
      type: REST_ERROR,
      payload: 'Ошибка при загрузке ресторана'
    })
  }
}

export const addFood = (id, food) => async dispatch => {
  try {
    dispatch({ type: REST_REQUEST })
    const rest = await axios.get(`/rests/${id}`)
    const { data } = await axios.patch(`/rests/${id}`, {
      food: [...rest.data.food, food]
    })
    dispatch({ type: ADD_FOOD, payload: { ...data } })
  } catch (e) {
    return dispatch({
      type: REST_ERROR,
      payload: 'Ошибка при добавлении блюда'
    })
  }
}

export const deleteFood = (restId, foodId) => async dispatch => {
  try {
    dispatch({ type: REST_REQUEST })
    const rest = await axios.get(`/rests/${restId}`)
    const food = rest.data.food.filter(f => f.id !== foodId)
    const { data } = await axios.patch(`/rests/${restId}`, { food })
    dispatch({ type: DELETE_FOOD, payload: { ...data } })
  } catch (e) {
    return dispatch({
      type: REST_ERROR,
      payload: 'Ошибка при удалении блюда'
    })
  }
}

export const fetchOrders = () => async dispatch => {
  try {
    dispatch({ type: REST_REQUEST })
    const { data } = await axios.get(`/orders`)
    dispatch({ type: FETCH_ORDERS, payload: data })
  } catch (e) {
    return dispatch({
      type: REST_ERROR,
      payload: 'Ошибка при загрузке заказов'
    })
  }
}
