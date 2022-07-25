import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import "./LoginForm.css";
import Footer from "../Footer";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  const handleDemo = (e) => {
    e.preventDefault();
    // setErrors([]);
    const credential = "Demo-Melomaniac";
    const password = "password";
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <div className="loginBig">
      <div className="innerLoginDiv">
        <h2 className="title">Log In</h2>
        {errors.length > 0 && (
          <div className="errorsDiv">
            <div className="followingErrors">
              The following errors have occured:{" "}
            </div>
            <ul className="loginUl">
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <form onSubmit={handleSubmit} className="login-form">
          <label>
            Username or Email*
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              // required
            />
          </label>
          <label>
            Password*
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              // required
            />
          </label>
          <button type="submit" className="form-btn">
            Log In
          </button>
          <div className="req">*These areas are required</div>

          <Link to="/signup" className="form-links">
            Become a melomaniac!
          </Link>
          <button
            type="submit"
            className="form-btn asDemo"
            onClick={handleDemo}
          >
            Login as Demo User
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default LoginFormPage;
