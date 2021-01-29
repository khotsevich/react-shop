import React, { useEffect } from 'react'
import { ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrders, fetchRests } from '../../store/actions/rest.actions'

export const Dashboard = () => {
  const rests = useSelector(state => state.rest.rests)
  const orders = useSelector(state => state.rest.orders)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchRests())
    dispatch(fetchOrders())
  }, [dispatch])

  return (
    <>
      <h1 className={'col-6 mx-auto mt-5 text-center'}>Дашборд</h1>
      <ListGroup variant="flush" className={'mt-3 col-6 mx-auto'}>
        <ListGroup.Item></ListGroup.Item>
        <ListGroup.Item>
          <span className={'font-weight-bolder'}>Количество ресторанов: </span>
          <span className={'font-italic'}>{rests.length}</span>
        </ListGroup.Item>
        <ListGroup.Item>
          <span className={'font-weight-bolder'}>Количество блюд: </span>
          <span className={'font-italic'}>
            {rests.reduce((prev, curr) => prev + curr.food.length, 0)}
          </span>
        </ListGroup.Item>
        <ListGroup.Item>
          <span className={'font-weight-bolder'}>Количество заказов: </span>
          <span className={'font-italic'}>{orders.length}</span>
        </ListGroup.Item>
      </ListGroup>
    </>
  )
}
