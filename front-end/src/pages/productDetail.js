import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const ProductDetail = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const navigate = useNavigate()

  //get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `https://backend-n7jv.onrender.com/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      relatedItems(data?.product._id, data?.product.catagory._id);
    } catch (error) {
      console.log(error);
    }
  };

  // get related product
  const relatedItems = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `https://backend-n7jv.onrender.com/api/v1/product/related-product/${pid}/${cid}`
      );
      let sameProducts = data?.products;
      setRelatedProduct(data?.products || []);
    } catch (error) {
      console.log(error);
    }
  };

  useState(() => {
    if (params?.slug) getProduct();
  }, []);

  return (
    <Layout>
      <div className="row container m-4">
        <div className="col-md-5">
          <img
            src={`https://backend-n7jv.onrender.com/api/v1/product/product-photo/${product._id}`}
            className="card-img-top img-product-detail "
            alt={product.name}
          />
        </div>
        <div className="col-md-5 text-left">
          <h1>Product Detail</h1>
          <h5>Name : {product.name}</h5>
          <h5>Price : {product.price} $</h5>
          <h5>Catagory : {product?.catagory?.name}</h5>
          <h5>Details : </h5>
          <p> {product.description}</p>
          <button className="btn btn-primary"> Add to Card</button>
        </div>
      </div>
      <hr />
      <div className="row container">
        <h1>Similar Products</h1>

        {relatedProduct.length > 0 ? (
          relatedProduct.map((p) => (
            <div key={p._id} className="col-md-4">
              <div className="card m-1" style={{ width: "18rem" }}>
                <div>
                  <img
                    src={`https://backend-n7jv.onrender.com/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top "
                    alt={p.name}
                    height={260}
                    style={{ objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h3 className="card-title">{p.name}</h3>
                    <h5 className="card-title">{`${p.price} $`}</h5>
                    <p className="card-text">{p.description}</p>
                    <button
                      className="btn btn-primary ms-1"
                      onClick={() => {
                        navigate(`/product-detail/${p.slug}`);
                        window.location.reload();
                      }}
                    >
                      Show Detail
                    </button>
                    <button className="btn btn-secondary ms-1">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No related products found.</p>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;
