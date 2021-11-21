import ReactDOM from "react-dom";
import { Modal, Button } from "react-bootstrap";
import React from "react";


const Backdrop = () => {
    console.log('k')
    return ReactDOM.createPortal(
        <div style={{position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100vh',
            zIndex: '10',
            background: 'rgba(0, 0, 0, 0.75)'}}>
        
        yes</div>,
        document.getElementById('backdrop-root')
    )
}






export const RemoveModal = (props) => {
  return ReactDOM.createPortal(
    <React.Fragment>
    <Backdrop/>
    <Modal.Dialog className='mb-5' style={{
        position: 'fixed',

        top: '30vh',
        left: '30%',
        overflow: 'hidden',
        zIndex: '100'}}>
      <Modal.Header >
        <Modal.Title>Are you sure you want to remove the product?</Modal.Title>
      </Modal.Header>

      

      <Modal.Footer>
        <Button variant="secondary" onClick={props.close}>Close</Button>
        <Button variant="danger" onClick={props.remove}>Delete</Button>
      </Modal.Footer>
    </Modal.Dialog>
    </React.Fragment>,
    document.getElementById('modal-root')
  );
};



