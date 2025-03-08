import React from 'react'
import { Toast, ToastContainer } from 'react-bootstrap'

export default function ToastNotifications({showToast, setShowToast}) {
  return (
    <ToastContainer position="top-end">
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
            <Toast.Body>Utilizador registado com sucesso!</Toast.Body>
        </Toast>
    </ToastContainer>
  )
}
