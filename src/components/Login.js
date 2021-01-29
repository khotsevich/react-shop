import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../store/actions/user.actions'
import { CLEAR_ERROR } from '../store/types'
import { AppToast } from './UI/Toast'

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const error = useSelector(state => state.user.error)

  const dispatch = useDispatch()

  const submitHandler = event => {
    event.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <>
      <h1 className={'col-6 mx-auto mt-5 text-center'}>Вход</h1>
      <Form className={'col-6 mx-auto mt-3'} onSubmit={submitHandler}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Введите email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required={true}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required={true}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Войти
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
