import React, { useContext } from "react";
import Layout from "../../hocs/Layout/Layout";
import { DataContext } from "../DataContext";
import "./Main.scss";

const Main = props => {
  const data = useContext(DataContext);
  console.log("MAIN DATA", data);
  return (
    <Layout>
      <div className="main-page-block">Main Page</div>
    </Layout>
  );
};

export default Main;
