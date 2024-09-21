import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import toast from 'react-hot-toast';
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/layout/price";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";

const Homepage = () => {
  const [products, setProduct] = useState([]);
  const [catagory, setCatagory] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setloading] = useState(false);
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  //getting all catagory__________________________________
  const getAllCatagory = async (req, res) => {
    try {
      const { data } = await axios.get(
        `https://backend-n7jv.onrender.com/api/v1/catagory/get-catagory`
      );

      if (data.success) {
        setCatagory(data?.catagory);
      }
    } catch (error) {
      console.log(error);
      toast.error("something wents wrong createCatagory.js line 51");
    }
  };

  useEffect(() => {
    getAllCatagory();
    getTotal();
  }, []);

  //get all products====================

  const getProduct = async () => {
    try {
      setloading(true);
      const { data } = await axios.get(
        `https://backend-n7jv.onrender.com/api/v1/product/product-list/${page}`
      );
      setloading(false);
      setProduct(data.products);

    } catch (error) {
      console.log(error);
      setloading(false);
      toast.error("something wents wrong in getting all products");
    }
  };

  //================filtered product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        "https://backend-n7jv.onrender.com/api/v1/product/filter-product",
        { checked, radio }
      );

      setProduct(data.products);

    } catch (error) {
      console.log(error);
    }
  };

  //get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `https://backend-n7jv.onrender.com/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  //====================handle filter==========
  const handleFilter = (value, id) => {
    let all = [...checked];

    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };


  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct();
      return;
    }
    getProduct();
  }, [checked.length, radio.length]);

  // load more

  const loadMore = async () => {
    try {
      setloading(true);
      const { data } = await axios.get(
        `https://backend-n7jv.onrender.com/api/v1/product/product-list/${page}`
      );
      setProduct([...products, ...data?.products]);
      setloading(false);

    } catch (error) {
      setloading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  return (
    <Layout
      title={"All Product - Ecommerce - Best offers"}
      description={"ecommerce-store"}
    >
      <div className="row mt-3">
        <div className="col-md-3 ">
          {/* filter by catagory */}
          <div>
            <h4 className="text-center">Filter by Catagory</h4>
            {catagory?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => {
                  handleFilter(e.target.checked, c._id);
                }}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>

          {/* filter by Prices */}
          <div>
            <h4 className="text-center">Filter by Prices</h4>
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column mt-4 ml-2">
            <button
              className="btn btn-danger"
              onClick={() => {
                window.location.reload();
              }}
            >
              Reset Filter{" "}
            </button>
          </div>
        </div>

        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap d-flex2">
            {products?.map((p) => (
              <div className="card m-1" style={{ width: "18rem" }}>
                <div>
                  <img
                    src={`https://backend-n7jv.onrender.com/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top "
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h3 className="card-title">{p.name}</h3>
                    <h5 className="card-title">{`${p.price} $`}</h5>
                    <p className="card-text">
                      {p.description.substring(0, 90)}
                    </p>
                    <button
                      className="btn btn-primary ms-1"
                      onClick={() => {
                        navigate(`/product-detail/${p.slug}`);
                      }}
                    >
                      Show Detail
                    </button>
                    <button
                      className="btn btn-secondary ms-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        toast.success(`Product ${p.name} Add to Cart`);
                        localStorage.setItem('cart', JSON.stringify([...cart, p]))
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();

                  setPage(page + 1);

                }}
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
