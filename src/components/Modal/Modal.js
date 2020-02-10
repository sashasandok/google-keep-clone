import React from 'react';
import PropTypes from 'prop-types';
import Backdrop from '../Backdrop/Backdrop';
import './Modal.scss';

const Modal = ({ closeModal, isModalOpen, children }) => {
  return (
    <div className="modal-wrapper">
      <Backdrop isModalOpen={isModalOpen} closeModal={closeModal} />
      <div
        className="modal"
        style={{
          transform: isModalOpen ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: isModalOpen ? '1' : '0',
        }}
      >
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
