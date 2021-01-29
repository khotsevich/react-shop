import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { patchUser } from '../store/actions/user.actions'

export const Profile = () => {
  const id = useSelector(state => state.user.id)
  const isAdmin = useSelector(state => state.user.isAdmin)
  const [name, setName] = useState(useSelector(state => state.user.name))
  const [email, setEmail] = useState(useSelector(state => state.user.email))
  const [address, setAddress] = useState(
    useSelector(state => state.user.address)
  )
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const submitHandler = event => {
    event.preventDefault()
    dispatch(patchUser(id, email, name, address, password))
    setPassword('')
  }

  return (
    <>
      <h1 className={'col-6 mx-auto mt-5 text-center'}>Личный кабинет</h1>
      <Form className={'col-6 mx-auto mt-3'} onSubmit={submitHandler}>
        <Form.Control type="hidden" value={id} required={true} />
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            disabled={isAdmin}
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required={true}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Имя</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required={true}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Адрес доставки</Form.Label>
          <Form.Control
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
            required={true}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required={true}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Сохранить
        </Button>
      </Form>
    </>
  )
}
