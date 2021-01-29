import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ListGroup, Form, Button, Col, Row } from 'react-bootstrap'
import {
  addFood,
  deleteFood,
  fetchRests
} from '../../store/actions/rest.actions'

export const RestList = () => {
  const rests = useSelector(state => state.rest.rests)

  const dispatch = useDispatch()

  const submitHandler = event => {
    event.preventDefault()
    const id = event.target.id.value
    const name = event.target.name.value
    const photo = event.target.photo.value
    const price = event.target.price.value
    dispatch(addFood(id, { name, price, id: Date.now(), photo }))
    event.target.reset()
  }

  const deleteHandler = (restId, foodId) => {
    dispatch(deleteFood(restId, foodId))
  }

  useEffect(() => {
    dispatch(fetchRests())
  }, [dispatch])

  const renderRests = () => {
    return rests.map(r => {
      return (
        <ListGroup.Item key={r.id}>
          <h3>{r.name}</h3>
          <ListGroup className={'mt-2'}>
            {r.food.map(f => (
              <ListGroup.Item key={f.id}>
                <Row>
                  <Col>
                    <span className={'font-weight-bolder'}>{f.name}</span>
                  </Col>
                  <Col></Col>
                  <Col>
                    <span className={'font-italic'}>
                      {new Intl.NumberFormat('ru-RU').format(f.price)} ₽
                    </span>
                  </Col>
                  <Col>
                    <Button
                      variant="danger"
                      className={'w-100'}
                      onClick={() => deleteHandler(r.id, f.id)}
                    >
                      Удалить
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
            <ListGroup.Item>
              <Form className={'mt-2'} onSubmit={submitHandler}>
                <Form.Control
                  type="hidden"
                  name={'id'}
                  value={r.id}
                  required={true}
                />
                <Row>
                  <Col>
                    <Form.Control
                      type="text"
                      placeholder={'Введите название'}
                      name={'name'}
                      required={true}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type="text"
                      placeholder={'Укажите фотографию'}
                      name={'photo'}
                      required={true}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type="number"
                      placeholder={'Укажите цену'}
                      name={'price'}
                      required={true}
                    />
                  </Col>
                  <Col>
                    <Button
                      variant="primary"
                      type={'submit'}
                      className={'w-100'}
                    >
                      Добавить
                    </Button>
                  </Col>
                </Row>
              </Form>
            </ListGroup.Item>
          </ListGroup>
        </ListGroup.Item>
      )
    })
  }

  return (
    <>
      <h1 className={'col-6 mx-auto mt-5 text-center'}>Список ресторанов</h1>
      <ListGroup className={'mt-3'}>{renderRests()}</ListGroup>
    </>
  )
}
