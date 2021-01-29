import axios from '../../utils/axios'
import {
  CREATE_USER_SUCCESS,
  LOGOUT_USER,
  LOGIN_USER_SUCCESS,
  USER_REQUEST,
  USER_ERROR,
  PATCH_USER_SUCCESS,
  ADD_TO_CART,
  DELETE_FROM_CART,
  CREATE_ORDER
} from '../types'

export const register = (email, name, address, password) => async dispatch => {
  try {
    dispatch({ type: USER_REQUEST })
    const users = await axios.get(`/users?email=${email}`)
    if (users.data.length) {
      return dispatch({
        type: USER_ERROR,
        payload: 'Email занят'
      })
    }

    const { data } = await axios.post('/users', {
      email,
      name,
      address,
      password,
      cart: []
    })

    const user = {
      id: data.id,
      email: data.email,
      name: data.name,
      address: data.address,
      cart: []
    }

    localStorage.setItem('user', JSON.stringify({ ...user, isAuth: true }))

    return dispatch({
      type: CREATE_USER_SUCCESS,
      payload: { ...user }
    })
  } catch (e) {
    return dispatch({
      type: USER_ERROR,
      payload: 'Ошибка при регистрации'
    })
  }
}

export const login = (email, password) => async dispatch => {
  try {
    dispatch({ type: USER_REQUEST })

    const { data } = await axios.get(
      `/users?email=${email}&password=${password}`
    )

    if (!data.length) {
      return dispatch({ type: USER_ERROR, payload: 'Неверные данные' })
    }

    const user = {
      id: data[0].id,
      email: data[0].email,
      name: data[0].name,
      address: data[0].address,
      cart: data[0].cart
    }

    if (user.email === 'admin@mail.ru') {
      user.isAdmin = true
    }

    localStorage.setItem('user', JSON.stringify({ ...user, isAuth: true }))

    return dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: { ...user }
    })
  } catch (e) {
    return dispatch({ type: USER_ERROR, payload: 'Ошибка при входе' })
  }
}

export const patchUser = (
  id,
  email,
  name,
  address,
  password
) => async dispatch => {
  try {
    dispatch({ type: USER_REQUEST })

    const { data } = await axios.patch(`/users/${id}`, {
      email,
      name,
      address,
      password
    })

    const user = {
      id: data.id,
      email: data.email,
      name: data.name,
      address: data.address,
      cart: data.cart
    }

    localStorage.setItem('user', JSON.stringify({ ...user, isAuth: true }))

    return dispatch({
      type: PATCH_USER_SUCCESS,
      payload: { ...user }
    })
  } catch (e) {
    return dispatch({ type: USER_ERROR, payload: 'Ошибка при входе' })
  }
}

export const addToCart = (userId, food) => async dispatch => {
  try {
    dispatch({ type: USER_REQUEST })
    const user = await axios.get(`/users/${userId}`)
    const { data } = await axios.patch(`/users/${userId}`, {
      cart: [...user.data.cart, food]
    })
    localStorage.setItem('user', JSON.stringify({ ...data, isAuth: true }))
    dispatch({ type: ADD_TO_CART, payload: data.cart })
  } catch (e) {
    return dispatch({
      type: USER_ERROR,
      payload: 'Ошибка при добавлении товара в корзину'
    })
  }
}

export const deleteFromCart = (userId, foodId) => async dispatch => {
  try {
    dispatch({ type: USER_REQUEST })
    const user = await axios.get(`/users/${userId}`)
    const cart = user.data.cart.filter(f => f.id !== foodId)
    const { data } = await axios.patch(`/users/${userId}`, { cart })
    localStorage.setItem('user', JSON.stringify({ ...data, isAuth: true }))
    dispatch({ type: DELETE_FROM_CART, payload: data.cart })
  } catch (e) {
    return dispatch({
      type: USER_ERROR,
      payload: 'Ошибка при удалении товара из корзину'
    })
  }
}

export const createOrder = (userId, cart) => async dispatch => {
  try {
    dispatch({ type: USER_REQUEST })
    await axios.post('/orders', { userId, cart })
    const user = await axios.patch(`/users/${userId}`, { cart: [] })
    localStorage.setItem('user', JSON.stringify({ ...user.data, isAuth: true }))
    dispatch({ type: CREATE_ORDER })
  } catch (e) {
    return dispatch({
      type: USER_ERROR,
      payload: 'Ошибка при оформлении заказа'
    })
  }
}

export const logout = () => {
  localStorage.removeItem('user')
  return {
    type: LOGOUT_USER
  }
}
