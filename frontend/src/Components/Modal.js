import ReactDOM from "react-dom";
import { Modal, Button } from "react-bootstrap";
import React, {useState} from "react";

const Backdrop = () => {
  return ReactDOM.createPortal(
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100vh",
        zIndex: "10",
        background: "rgba(0, 0, 0, 0.75)",
      }}
    ></div>,
    document.getElementById("backdrop-root")
  );
};

export const RemoveModal = (props) => {
  const [inputVal, setInputVal] = useState('')
  
  return ReactDOM.createPortal(
    <React.Fragment>
      <Backdrop />
      <Modal.Dialog
        className="mb-5"
        style={{
          position: "fixed",
          top: "30vh",
          left: "30%",
          overflow: "hidden",
          zIndex: "100",
        }}
      >
        <Modal.Header>
          <Modal.Title>
            Are you sure you want to delete? To continue type{" "}
            <strong>"{props.productName}"</strong>
          </Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          {/* <div className="form-group "> */}
            <label className="form-label">
            </label>
            <input
              onChange={(e) => setInputVal(e.target.value)}
              type="text"
              className="form-control"
              placeholder={props.productName}
              autoFocus
            />
          {/* </div> */}
          <Button variant="secondary" className='mt-4' onClick={props.close}>
            Close
          </Button>
          <Button variant="danger" className='mt-4' onClick={props.remove} disabled={inputVal===props.productName? false: true}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </React.Fragment>,
    document.getElementById("modal-root")
  );
};
