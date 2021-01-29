import React, { useEffect } from 'react'
import { CardColumns } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { RestCard } from './RestCard'
import { fetchRests } from '../store/actions/rest.actions'

export const Main = () => {
  const rests = useSelector(state => state.rest.rests)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchRests())
  }, [dispatch])

  const renderRests = () => {
    return rests.map(r => (
      <RestCard key={r.id} name={r.name} photo={r.photo} id={r.id} />
    ))
  }

  return (
    <>
      <h1 className={'mt-5 text-center'}>Наши рестораны</h1>
      <CardColumns className={'mt-3'}>{renderRests()}</CardColumns>
    </>
  )
}
