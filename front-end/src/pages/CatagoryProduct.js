import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CatagoryProduct = () => {
  const [product, setProduct] = useState([]);
  const [catagory, setCatagory] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  const getProductByCat = async () => {
    const { data } = await axios.get(
      `http://localhost:4500/api/v1/product/productCatagory/${params.slug}`
    );
    setProduct(data?.products);
    setCatagory(data?.catagory);
  };

  useEffect(() => {
    getProductByCat();
  }, []);
  return (
    <Layout>
      <div className="text-center mt-4">
        <h3>Catagory - {catagory?.name} </h3>
        <h6>{product?.length} Result found</h6>
      </div>

      <div className="d-flex flex-wrap d-flex2 container">
        {product?.map((p) => (
          <div className="card m-1" style={{ width: "18rem" }}>
            <div>
              <img
                src={`http://localhost:4500/api/v1/product/product-photo/${p._id}`}
                className="card-img-top "
                alt={p.name}
              />
              <div className="card-body">
                <h3 className="card-title">{p.name}</h3>
                <h5 className="card-title">{`${p.price} $`}</h5>
                <p className="card-text">{p.description}</p>
                <button
                  className="btn btn-primary ms-1"
                  onClick={() => {
                    navigate(`/product-detail/${p.slug}`);
                  }}
                >
                  Show Detail
                </button>
                <button className="btn btn-secondary ms-1">Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
 
    </Layout>
  );
};

export default CatagoryProduct;
