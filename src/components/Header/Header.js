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
      <div className="user-and-settings">
        <div className="user-and-settings-icon">
          <span className="user-and-settings-icon-back">
            <Icon type="setting" />
          </span>
        </div>
        <div className="user-and-settings-icon">
          <span className="user-and-settings-icon-back">
            <Icon type="user" />
          </span>
        </div>
        <div
          className="user-and-settings-icon"
          onClick={() => firebase.auth().signOut()}
        >
          <span className="user-and-settings-icon-back">
            <Icon type="logout" />
          </span>
        </div>
      </div>
    </header>
  );
};

export default header;
