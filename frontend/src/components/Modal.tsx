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
    <Modal.Title>Confirm deletion</Modal.Title>
  </Modal.Header>
  <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
    <Button variant="primary" onClick={() => deleteUser(userIdToDelete)}>Delete</Button>
  </Modal.Footer>
</Modal>
    </>
  )
}

export default ModalShow;