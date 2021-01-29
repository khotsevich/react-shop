import React, { useState } from 'react'
import { ListGroup, Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createOrder, deleteFromCart } from '../store/actions/user.actions'

export const Cart = () => {
  const cart = useSelector(state => state.user.cart)
  const userId = useSelector(state => state.user.id)
  const [show, setShow] = useState(false)
  const history = useHistory()
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(createOrder(userId, cart))
    history.push('/')
    setShow(false)
  }

  const orderHandler = () => {
    setShow(true)
  }

  const deleteHandler = id => {
    dispatch(deleteFromCart(userId, id))
  }

  const renderFood = () => {
    return cart.map((f, i) => (
      <ListGroup.Item
        key={f.id + i}
        className={'d-flex justify-content-between align-items-center'}
      >
        <span className={'font-weight-bolder'}>{f.name} </span>
        <span className={'font-italic'}>
          {new Intl.NumberFormat('ru-RU').format(f.price)} ₽
        </span>
        <Button variant="danger" size="sm" onClick={() => deleteHandler(f.id)}>
          Удалить
        </Button>
      </ListGroup.Item>
    ))
  }

  return (
    <>
      <h1 className={'col-6 mx-auto mt-5 text-center'}>Корзина</h1>
      <ListGroup variant="flush" className={'mt-3 col-6 mx-auto'}>
        {renderFood()}
        <Button
          variant="success"
          className={'my-3'}
          onClick={orderHandler}
          disabled={!cart.length}
        >
          Оформить заказ
        </Button>
      </ListGroup>

      <Modal show={show}>
        <Modal.Header closeButton>
          <Modal.Title>Заказ оформлен</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Спасибо, что выбрали Никиту. Приятного аппетита!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
