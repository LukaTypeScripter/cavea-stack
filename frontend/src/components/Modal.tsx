import React from 'react'
import { Modal, Button } from 'react-bootstrap';

interface Props {
    showModal: boolean
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
    deleteUser: (id: number) => void
    userIdToDelete: number
}
function ModalShow({showModal,setShowModal,deleteUser,userIdToDelete}:Props) {
  return (
    <>
           <Modal show={showModal} onHide={() => setShowModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>დაადასტურე წაშლა!</Modal.Title>
  </Modal.Header>
  <Modal.Body>დარწმუნებული ხართ,რომ გსურთ ამის წაშლა?</Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowModal(false)}>უკან დაბრუნება</Button>
    <Button variant="btn btn-danger" onClick={() => deleteUser(userIdToDelete)}>წაშლა</Button>
  </Modal.Footer>
</Modal>
    </>
  )
}

export default ModalShow;