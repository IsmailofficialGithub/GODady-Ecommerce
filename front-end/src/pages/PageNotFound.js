import React from "react";
import Layout from "../components/layout/Layout";
import {Link} from 'react-router-dom'

function PageNotFound() {
  return (
    <Layout title={'go back - page not found'} description={'ecommerce-store'}>
      <div className="pnf">
        <h1>404</h1>
      <p>Opps! Page Not Found</p>
      <span>The page you are looking like might not more available .We are appologies to you.</span>
      <Link to="/">HomePage</Link>
      </div>
    </Layout>
  );
}

export default PageNotFound;
