import React from 'react'
import { Card, Button } from 'react-bootstrap'

export const FoodCard = ({ id, name, photo, price, disabled, onAdd }) => {
  return (
    <Card style={{ height: 300 }} className={'p-3'}>
      <Card.Img variant="top" src={photo} alt={name} className={'h-50'} />
      <Card.Title
        className={
          'text-body d-flex align-items-center justify-content-center h-25 '
        }
      >
        {name} {price}
      </Card.Title>
      <Button
        onClick={() => onAdd(name, price)}
        disabled={disabled}
        variant="primary"
      >
        Добавить в корзину
      </Button>
    </Card>
  )
}
