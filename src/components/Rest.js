import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchRests } from '../store/actions/rest.actions'
import { CardColumns } from 'react-bootstrap'
import { FoodCard } from './FoodCard'
import { addToCart } from '../store/actions/user.actions'

export const Rest = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const userId = useSelector(state => state.user.id)
  const isAuth = useSelector(state => state.user.isAuth)
  const isAdmin = useSelector(state => state.user.isAdmin)
  const rest = useSelector(state =>
    state.rest.rests.find(r => r.id.toString() === id.toString())
  )

  const addHandler = (name, price) => {
    dispatch(addToCart(userId, { id: Date.now(), name, price }))
  }

  const renderFood = () => {
    return rest?.food.map(f => (
      <FoodCard
        key={f.id}
        id={f.id}
        name={f.name}
        price={f.price}
        photo={f.photo}
        disabled={!isAuth || isAdmin}
        onAdd={addHandler}
      />
    ))
  }

  useEffect(() => {
    dispatch(fetchRests())
  }, [dispatch])

  return (
    <>
      <h1 className={'mt-5 text-center'}>{rest?.name}</h1>
      <CardColumns className={'mt-3'}>{renderFood()}</CardColumns>
    </>
  )
}
