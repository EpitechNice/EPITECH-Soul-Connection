import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useLoginMutation } from "../../redux/api/authApi";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const [login, { isLoading, error }] = useLoginMutation();
    const { isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
      if (isAuthenticated) {
        navigate("/dashboard");
      }
      if (error) {
        toast.error(error?.data?.message);
      }
    }, [error, isAuthenticated, navigate]);

    const submitHandler = (e) => {
      e.preventDefault();

    const loginData = {
      email,
      password,
    };

    login(loginData);
  };

    return (
      <div className="page-container">
        <div className="col-10 col-lg-5 ">
          <form className="login_card"
          onSubmit={submitHandler}
          >
            <h2 className="mb-4"><strong>Login</strong></h2>
            <div className="mb-3">
              <label htmlFor="email_field" className="form-label">
                Email
              </label>
              <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            </div>

            <div className="mb-3">
              <label htmlFor="password_field" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              className="login_button"
              type="submit"
              disabled={isLoading}
            >
            {isLoading ? "Authenticating..." : "Login"}
            </button>

          </form>
      </div>
    </div>
    );
};


export default Login;
