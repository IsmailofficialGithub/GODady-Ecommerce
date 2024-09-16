import React from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/adminMenu";
const User = () => {
  return (
    <Layout title={'Dashboard - All user'}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <AdminMenu />
          </div>
          <div className="col-9">
            <h1>user</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default User;
