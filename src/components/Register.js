import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../store/actions/user.actions'
import { CLEAR_ERROR } from '../store/types'
import { AppToast } from './UI/Toast'

export const Register = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [password, setPassword] = useState('')
  const error = useSelector(state => state.user.error)

  const dispatch = useDispatch()

  const submitHandler = event => {
    event.preventDefault()
    dispatch(register(email, name, address, password))
  }

  return (
    <>
      <h1 className={'col-6 mx-auto mt-5 text-center'}>Регистрация</h1>
      <Form className={'col-6 mx-auto mt-3'} onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder={'Введите email'}
            value={email}
            onChange={e => setEmail(e.target.value)}
            required={true}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Имя</Form.Label>
          <Form.Control
            type="text"
            placeholder={'Введите имя'}
            value={name}
            onChange={e => setName(e.target.value)}
            required={true}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Адрес доставки</Form.Label>
          <Form.Control
            type="text"
            placeholder={'Введите адрес доставки'}
            value={address}
            onChange={e => setAddress(e.target.value)}
            required={true}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="password"
            placeholder={'Введите пароль'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            required={true}
          />
        </Form.Group>
        <Button variant="primary" type={'submit'}>
          Регистрация
        </Button>
      </Form>
      {error && (
        <AppToast
          onClose={() => dispatch({ type: CLEAR_ERROR })}
          title={error}
        />
      )}
    </>
  )
}
