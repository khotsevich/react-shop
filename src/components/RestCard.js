import React from 'react'
import { Card } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

export const RestCard = ({ id, name, photo }) => {
  return (
    <NavLink to={`/rests/${id}`}>
      <Card style={{ height: 300 }} className={'p-3'}>
        <Card.Img variant="top" src={photo} alt={name} className={'h-75'} />
        <Card.Title
          className={
            'h-25 text-body d-flex align-items-center justify-content-center'
          }
        >
          {name}
        </Card.Title>
      </Card>
    </NavLink>
  )
}
