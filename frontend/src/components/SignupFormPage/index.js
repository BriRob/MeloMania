import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import Footer from "../Footer";
import "./SignupForm.css";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(
        sessionActions.signup({ email, username, password })
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
        // console.log(data)
      });
    }
    return setErrors([
      "Confirm Password field must be the same as the Password field",
    ]);
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

  console.log("these are errors", errors);

  return (
    <div className="SignUpBig">
      <div className="innerSignUpDiv">
        <h2 className="title">Sign Up</h2>
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
        <form onSubmit={handleSubmit} className="signup-form">
          <label>
            Email*
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // required
            />
          </label>
          <label>
            Username*
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
          <label>
            Confirm Password*
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              // required
            />
          </label>
          <button type="submit" className="form-btn">
            Sign Up
          </button>
          <div className="req">*These areas are required</div>
          <Link to="/login" className="form-links">
            Already a melomaniac?
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

export default SignupFormPage;
