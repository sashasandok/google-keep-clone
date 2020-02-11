import React from 'react';
import { Input, Icon } from 'antd';
import keep from '../../assets/keep.jpeg';
import firebase from '../../config/firebase';
import './Header.scss';

const { Search } = Input;

const header = () => {
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
        <Search
          size="default"
          placeholder="search"
          onSearch={value => console.log(value)}
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

export default header;
