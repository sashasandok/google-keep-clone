import React from 'react';
import { Spin } from 'antd';
import './Loader.scss';

const Loader = () => {
  return (
    <div className="example">
      <Spin />
    </div>
  );
};

export default Loader;
