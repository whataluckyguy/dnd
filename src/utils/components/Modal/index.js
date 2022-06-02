import React, { useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import "./Modal.css";

const Modal = props => {
  const closeOnEscapeKeyDown = useCallback( e => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  }, [props]) ;

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, [closeOnEscapeKeyDown]);

  return ReactDOM.createPortal(
    <CSSTransition
      in={props.show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
    >
      <div className="modal" onClick={props.onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
            {props.header && 
                <div className="modal-header">
                    { props.header }
                </div>
            }
            
            <div className="modal-content"> {props.content} </div>
            <div className="modal-buttons">
                {props.cancel && <div onClick = {() => props.onCancelClick()}> cancel </div>}
                <div className="blue-button" onClick = {() => props.onConfirmClick()}> ok </div>
            </div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById("root")
  );
};

export default Modal;
