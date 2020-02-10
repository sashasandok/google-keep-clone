import React from "react";
import Header from "../../components/Header/Header";
import "./Layout.scss";

const layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <section className="layout-content">{children}</section>
    </div>
  );
};

export default layout;
