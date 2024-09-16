import { useState } from "react";
import React from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { useNavigate ,useLocation} from "react-router-dom";
import { toast } from "react-toastify";
import "../../style/authStyle.css";
import { useAuth } from "../../context/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth,setAuth]=useAuth();
  const navigate = useNavigate();
  const location=useLocation();

  //from function

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password }
      );
      if (res.data.success) {
          toast.success(res.data.message);
          setAuth({
            ...auth,
            user:res.data.user,
            token:res.data.token
          })
          localStorage.setItem('auth',JSON.stringify(res.data))

          setTimeout(() => {
            navigate(location.state || "/");
          }, 1000);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("SomeThing wents wrong");
    }
  };

  return (
    <Layout title={"Register - Ecommerce"}>
      <div className="form-container">
        <div className="main-form">
          <h1>Login Now</h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Email Address"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <div className="mt-3 forget">
            <p onClick={()=>{navigate('/forget-password')}}>forget Password?</p>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
