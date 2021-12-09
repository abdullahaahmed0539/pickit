import ReactDOM from "react-dom";
import { Modal, Button } from "react-bootstrap";
import React, { useState } from "react";

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

export const RemoveModal = props => {
  const [inputVal, setInputVal] = useState("");

  return ReactDOM.createPortal(
    <React.Fragment>
      <Backdrop />
      <div className="row">
        <div className="offset-md-2 offset-lg-4">
          <Modal.Dialog
            className="mb-5"
            style={{
              position: "fixed",
              top: "30vh",
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
              <label className="form-label"></label>
              <input
                onChange={e => setInputVal(e.target.value)}
                type="text"
                className="form-control"
                placeholder={props.productName}
                autoFocus
              />

              <Button
                variant="secondary"
                className="mt-4"
                onClick={props.close}
              >
                Close
              </Button>
              <Button
                variant="danger"
                className="mt-4"
                onClick={props.remove}
                disabled={inputVal === props.productName ? false : true}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      </div>
    </React.Fragment>,
    document.getElementById("modal-root")
  );
};

export const PreviewModal = props => {
  return ReactDOM.createPortal(
    <React.Fragment>
      <Backdrop />
      <div className="row">
        <div className="offset-md-2 offset-lg-4">
          <Modal.Dialog
            className="mb-5"
            style={{
              position: "fixed",
              top: "30vh",
              overflow: "hidden",
              zIndex: "100",
            }}
          >
            <Modal.Header>
              <Modal.Title>
                You are about to place an order. Click pay to finish placing
                order.
              </Modal.Title>
            </Modal.Header>

            <Modal.Footer>
              <Button
                variant="secondary"
                className="mt-4"
                onClick={props.close}
              >
                Close
              </Button>
              <Button
                variant="primary"
                className="mt-4"
                onClick={() => {
                  props.openConfirmationModal();
                  props.close();
                  props.pay();
                }}
              >
                Pay
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      </div>
    </React.Fragment>,
    document.getElementById("preview-root")
  );
};

export const ConfirmationModal = props => {
  return ReactDOM.createPortal(
    <React.Fragment>
      <Backdrop />
      <div className="row">
        <div className="offset-md-2 offset-lg-4">
          <Modal.Dialog
            className="mb-5"
            style={{
              position: "fixed",
              top: "30vh",
              overflow: "hidden",
              zIndex: "100",
            }}
          >
            <Modal.Header>
              <Modal.Title>
                <span className="text-success">Payment successful.</span> You
                can check order under orders tab.
              </Modal.Title>
            </Modal.Header>

            <Modal.Footer>
              <Button
                variant="secondary"
                className="mt-4"
                onClick={() => {
                  props.close()
                  
                }}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      </div>
    </React.Fragment>,
    document.getElementById("confirmation-root")
  );
};

