import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { createRest } from '../../store/actions/rest.actions'

export const RestAdd = () => {
  const [name, setName] = useState('')
  const [photo, setPhoto] = useState('')
  const dispatch = useDispatch()

  const submitHandler = event => {
    event.preventDefault()
    dispatch(createRest(name, photo))
    setName('')
    setPhoto('')
  }

  return (
    <>
      <h1 className={'col-6 mx-auto mt-5 text-center'}>Добавить ресторан</h1>
      <Form className={'col-6 mx-auto mt-3'} onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label>Название</Form.Label>
          <Form.Control
            type="text"
            placeholder={'Введите название'}
            value={name}
            onChange={e => setName(e.target.value)}
            required={true}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Логотип</Form.Label>
          <Form.Control
            type="text"
            placeholder={'Укажите логотип'}
            value={photo}
            onChange={e => setPhoto(e.target.value)}
            required={true}
          />
        </Form.Group>
        <Button variant="primary" type={'submit'}>
          Добавить
        </Button>
      </Form>
    </>
  )
}
