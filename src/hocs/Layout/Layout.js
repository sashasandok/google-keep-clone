import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
import './Layout.scss';

const layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <section className="layout-content">{children}</section>
    </div>
  );
};

layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default layout;
