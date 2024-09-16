import React, { useEffect, useState } from "react";
import useCatagory from "../hooks/useCatagroy";
import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";

const Catagories = () => {
  const catagories = useCatagory();
  return (
    <Layout>
      <div className="row text-center">
          <div className="col-md-5 m-3">
          {catagories.map((c) => (
     
     <Link to={`/catagory/${c.slug}` }className="btn btn-primary  m-3 gx-3 gy-3" >{c.name}</Link>
 
   ))}
          </div>
      </div>
    </Layout>
  );
};

export default Catagories;
