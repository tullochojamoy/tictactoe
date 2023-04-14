import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function ModalDialog({gameWon, setGameWon}) {
  const initModal = () => {
    return setGameWon('')
  }
  return (
    <>
      <Modal show={Boolean(gameWon)}>
        <Modal.Header onClick={initModal}>
          <Modal.Title>{gameWon + ' HAS WON'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         Woo hoo
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={initModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}