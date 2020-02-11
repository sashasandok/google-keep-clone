import React from 'react';
import PropTypes from 'prop-types';
import { Input, Icon } from 'antd';
import keep from '../../assets/keep.jpeg';
import firebase from '../../config/firebase';
import './Header.scss';

const header = ({ setRes }) => {
  return (
    <header className="header-block">
      <div className="logo-and-sidebar">
        <div className="sidebar-menu-icon" style={{ marginRight: '15px' }}>
          <span className="hovered-menu-icon-back">
            <Icon type="menu" className="menu-icon" />
          </span>
        </div>
        <img src={keep} className="header-logo" alt="header logo" />
        <span>Keep Clone</span>
      </div>
      <div className="search-input">
        <Input.Search
          size="default"
          placeholder="search"
          onChange={evt => setRes(evt.target.value)}
          style={{ height: '5vh' }}
        />
      </div>
      <div className="user">
        <div>Logout</div>
        <div className="user-icon" onClick={() => firebase.auth().signOut()}>
          <span className="user-icon-back">
            <Icon type="logout" />
          </span>
        </div>
      </div>
    </header>
  );
};

header.propTypes = {
  setRes: PropTypes.func.isRequired,
};

export default header;
