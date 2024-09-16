import React from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/adminMenu";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {

const [auth]=useAuth();

  return (
    <Layout title={'Admin-Dashboard '}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75  p-3 m-3">
              <h3>User name : {auth?.user?.name}</h3>
              <h3>User email : {auth?.user?.email}</h3>
              <h3>User phone : {auth?.user?.phone}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
