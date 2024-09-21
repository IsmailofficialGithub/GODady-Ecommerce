import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
const Orders = () => {
  const [orders, setOrder] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`https://backend-n7jv.onrender.com/api/v1/auth/orders/`);
      setOrder(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <Layout title={"Your Orders - ecommerce"}>
      <div className="container-flui m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1>All orders</h1>
            {orders?.map((o, i) => {
              return (
                <div className="shadow border">
                  <table className="table responsive">
                    <thead>
                      <tr>
                        <th scope="col"></th>
                        <th scope="col">status</th>
                        <th scope="col">buyer</th>
                        <th scope="col">date</th>
                        <th scope="col">payment</th>
                        <th scope="col">quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td> {i + 1}</td>
                        <td> {o?.status}</td>
                        <td> {o?.buyer.name}</td>
                        <td> {moment(o?.createAt).fromNow()}</td>
                        <td> {o?.payment.success ? "success" : "failed"}</td>
                        <td> {o?.product.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container mb-3">
                    {o?.product?.map((p, i) => (
                      <div className="row mb-2 card flex-row">
                        <div className="col-md-4 ">
                          <img
                            src={`https://backend-n7jv.onrender.com/api/v1/product/product-photo/${p._id}`}
                            className="card-img-top "
                            alt={p.name}
                            width={"10px"}
                            height={"170px"}
                            style={{
                              objectFit: "cover",
                            }}
                          />
                        </div>
                        <div className="col-md-6">
                          <p>{p.name}</p>
                          <p>
                            {p.description.substring(0, 100)}
                            ...
                          </p>
                          <p>Price : {p.price} $</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
