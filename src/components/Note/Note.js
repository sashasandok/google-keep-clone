import React from 'react';
import PropTypes from 'prop-types';
import firebase from '../../config/firebase';
import { Icon } from 'antd';
import './Note.scss';

const iconStyle = {
  color: 'gray',
};

const Note = ({ id, title, content, openModal }) => {
  const onNoteDelete = id => {
    firebase
      .firestore()
      .collection('notes')
      .doc(id)
      .delete()
      .then(() => console.log('Document successfully deleted!'))
      .catch(error => console.error('Error removing document: ', error));
  };
  return (
    <div className="note-block">
      <Icon type="check-circle" theme="filled" className="check" />
      <div className="note-header" onClick={openModal}>
        <h2>{title}</h2>
        <div>
          <Icon type="pushpin" className="pushpin-icon" style={iconStyle} />
        </div>
      </div>
      <span onClick={openModal}>{content}</span>
      <div className="bottom-icons">
        <Icon
          type="delete"
          className="pushpin-icon"
          onClick={() => onNoteDelete(id)}
          style={iconStyle}
        />
      </div>
    </div>
  );
};

Note.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default Note;
