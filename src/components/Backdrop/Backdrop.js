import React from 'react';
import PropTypes from 'prop-types';
import './Backdrop.scss';

const backdrop = ({ isModalOpen, closeModal }) =>
  isModalOpen ? <div className="backdrop" onClick={closeModal} /> : null;

backdrop.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default backdrop;
