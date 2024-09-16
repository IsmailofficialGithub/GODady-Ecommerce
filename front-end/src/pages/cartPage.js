import React, {
  useEffect,
  useState,
} from "react";
import Layout from "../components/layout/Layout";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";

const Cartpage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [instance, setInstance] = useState(null);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // remove item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex(
        (item) => item._id === pid,
      );
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem(
        "cart",
        JSON.stringify(myCart),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const totalPrice = () => {
    try {
      let total = cart.reduce(
        (acc, item) => acc + item.price,
        0,
      );

      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
      return "";
    }
  };

  // get token gateway of payment

  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/token`,
      );
      setToken(
        data?.clientToken?.clientToken || "",
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  /// handle payment

  const handlePayment = async () => {
    try {
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/braintree/payment`,
        {
           nonce,
          cart,
        },
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success(
        "payment completed successfully",
      );
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center bg-light">
            <h1>
              Hello{" "}
              {auth.token && auth?.user.name}
            </h1>
            <h6>
              {cart?.length > 0
                ? `You have ${
                    cart.length
                  } items in your cart . ${
                    auth?.token
                      ? ""
                      : "Please Login to check it out"
                  }`
                : "No item in cart"}
            </h6>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-md-6">
            {cart?.map((p) => (
              <div className="row mb-2 card flex-row">
                <div className="col-md-4 ">
                  <img
                    src={`http://localhost:4500/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top "
                    alt={p.name}
                    width={"10px"}
                    height={"170px"}
                    style={{ objectFit: "cover" }}
                  />
                  <button
                    className="btn btn-danger mt-2 mb-2"
                    onClick={() => {
                      removeCartItem(p._id);
                    }}
                  >
                    {" "}
                    Delete
                  </button>
                </div>
                <div className="col-md-6">
                  <p>{p.name}</p>
                  <p>
                    {p.description.substring(
                      0,
                      100,
                    )}
                    ...
                  </p>
                  <p>Price : {p.price} $</p>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-5 text-center">
            <h4>Cart Summary</h4>
            <p>Total || Payment || Check out</p>
            <hr />
            <h4>Total : {totalPrice()}</h4>
            <>
              {auth?.user?.address ? (
                <>
                  <div className="mt-3">
                    <h4>Current Address</h4>
                    <h5>{auth?.user?.address}</h5>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => {
                        navigate(
                          "/dashboard/user/profile",
                        );
                      }}
                    >
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="mt-3">
                    {auth?.token ? (
                      <button
                        className="btn-btn-outline-warning"
                        onClick={() => {
                          navigate(
                            "/dashboard/user/profile",
                          );
                        }}
                      >
                        {" "}
                        Update Address
                      </button>
                    ) : (
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          navigate("/login", {
                            state: "/cart",
                          });
                        }}
                      >
                        Please Login To CheckOut
                      </button>
                    )}
                  </div>
                </>
              )}
            </>

            <div className="mt-2">
              {!token || !cart.length || !auth.token  ? (
                <div>Loading...</div>
              ) : (
                <>
                  {loading ? (
                    'please wait loading...'
                  ) : (
                    token && (
                      <DropIn
                        options={{
                          authorization: token,
                          paypal: {
                            flow: "vault",
                          },
                        }}
                        onInstance={(instanse) =>
                          setInstance(instanse)
                        }
                      />
                    )
                  )}
                  {auth.token ? (
                <button
                  className="btn btn-primary"
                  onClick={handlePayment}
                  disabled={
                    !instance ||
                    loading ||
                    !auth?.user?.address
                  }
                >
                  {loading
                    ? "Processing"
                    : "MakePayment"}
                </button>
              ) : (
                "Please Login "
              )}
                </>
              )}
              
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cartpage;
