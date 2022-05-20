import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginService from "../services/loginservice";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../actions/actions";

const LoginComponent = () => {
  const navigate = useNavigate();
  const loginService = new LoginService();
  const [user, setUser] = useState({ username: "", password: "" });
  const dispatch = useDispatch();

  const handleLogin = () => {
    loginService
      .login(user)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        dispatch(setUserInfo({ token: response.data.token, isLoggedIn: true }));
        navigate("/");
      })
      .catch((error) => {
        console.log(`Error Occurred ${error}`);
      });
  };

  const handleChange = (event) => {
    if (event.target.name === "username") {
      setUser((state) => ({ ...state, username: event.target.value }));
    }
    if (event.target.name === "password") {
      setUser((state) => ({ ...state, password: event.target.value }));
    }
  };

  return (
    <Fragment>
      <div className="container mt-4">
        <h4 className="text-center">Login</h4>
        <div className="form-group mt-4">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            onChange={handleChange}
            name="username"
            value={user.username}
          />
        </div>
        <div className="form-group mt-4">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            onChange={handleChange}
            name="password"
            value={user.password}
          />
        </div>
        <div className="form-group mt-4">
          <button className="btn btn-primary" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default LoginComponent;
