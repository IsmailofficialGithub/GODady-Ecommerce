import { useState } from "react";
import React from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import "../../style/authStyle.css";
import { useAuth } from "../../context/auth";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();


  //from function

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forget-password`,
        { email, newPassword ,answer}
      );
      if (res.data.success) {
        toast.success(res.data.message);
       
       

        setTimeout(() => {
          navigate( "/login");
        }, 1000);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      // toast.error(res.data.message);
    }
  };

  return (
    <Layout title={"forget-Password ecommerce"}>
      <div className="form-container">
        <div className="main-form">
          <h1>Reset Password</h1>

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
                type="text"
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                }}
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Last word in your father name?"
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                className="form-control"
                id="exampleInputPassword1"
                placeholder="New Password"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Reset
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ForgetPassword;
