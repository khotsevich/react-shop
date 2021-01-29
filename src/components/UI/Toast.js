import React from 'react'
import { Toast } from 'react-bootstrap'

export const AppToast = ({ title, onClose }) => {
  return (
    <Toast
      className={'bg-danger text-white'}
      onClose={onClose}
      delay={3000}
      autohide={true}
      style={{
        position: 'absolute',
        right: 30,
        bottom: 30
      }}
    >
      <Toast.Body>{title}</Toast.Body>
    </Toast>
  )
}
