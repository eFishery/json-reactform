import React from 'react';
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  Spinner,
} from 'reactstrap';
import PropTypes from "prop-types";
import { MdCheckCircle, MdError, MdQuestionAnswer } from "react-icons/md";

const ModalSpinner = (
  {
    isOpen = false,
    message = '',
    type = '',
    onAccept = () => { return false },
    onDismiss = () => { return false },
    btnAcceptId = ''
  }
) => {

  return (
    <Modal isOpen={isOpen} centered returnFocusAfterClose={false} backdrop='static'>
      <ModalHeader>Pop-Up Message</ModalHeader>
      <ModalBody className="d-flex align-items-center font-weight-bold">
        {type === 'loading' ? <Spinner color="success" className="mr-2" /> : null}
        {type === 'success' ? <MdCheckCircle className="text-success" size={30} /> : null}
        {type === 'error' ? <MdError className="text-danger" size={30} /> : null}
        {type === 'confirm' ? <MdQuestionAnswer className="text-dark" size={30} /> : null}
        <span style={{ fontSize: '18px' }} className="ml-3">{message}</span>
      </ModalBody>
      {type !== 'loading' ?
        <ModalFooter>
          <Button color="danger" onClick={onDismiss}>{type === 'confirm' ? 'Cancel' : 'Close'}</Button>
          {type === 'confirm' ? <Button color="primary" id={btnAcceptId} onClick={onAccept}>Yes</Button> : null}
        </ModalFooter> : null
      }
    </Modal>
  )
}

ModalSpinner.propTypes = {
  isOpen: PropTypes.bool,
  message: PropTypes.string,
  type: PropTypes.oneOf(['loading', 'success', 'error', 'confirm']),
  onDismiss: PropTypes.func,
  onAccept: PropTypes.func,
}

export default ModalSpinner;