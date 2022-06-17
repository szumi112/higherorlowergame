import React from 'react'
import { useState } from 'react';
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

const HowToPlay = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


  return (
    <div className='howto'>
<Button variant="success" size="sm" onClick={handleShow}>
        → Game Rules ←
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>"Higher Or Lower" Game Rules</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <span>&bull; Player has one card at a time</span>
            <br></br>
            <br></br>
            <span>&bull; There are two buttons that the player uses to decide (guess) whether the next card number will be higher or lower</span>
            <br></br>
            <br></br>
            <span>&bull; Once the player chooses one of the options, he/she gets 0.1 point for the correct answer and a new card is shown</span>
            <br></br>
            <br></br>
            <span>&bull; There are 30 rounds of the game</span>


            
            </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default HowToPlay