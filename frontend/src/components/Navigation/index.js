import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import ProfileButton from "./ProfileButton";
// import melomanialogo from "../../images/"

import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const handleDemo = (e) => {
    e.preventDefault();
    // setErrors([]);
    const credential = "Demo-Melomaniac";
    const password = "password";
    return dispatch(sessionActions.login({ credential, password }));
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <NavLink className="navLink" to="/login">
          Log In
        </NavLink>
        <NavLink className="navLink" to="/signup">
          Sign Up
        </NavLink>
        <form onSubmit={handleDemo}>
          <button type="submit" className="demo-btn">
            Demo User
          </button>
        </form>
      </>
    );
  }



  return (
    <div className="navigation">
      <li>
        <NavLink exact to="/" className="navLink" >
          MeloMania
          {/* <img src="/images/melomania-logo.png" id="logo"/> */}
        </NavLink>
        <NavLink to="/playlists" className="navLink">
          Playlists
        </NavLink>
        <NavLink to="/new-song" className="navLink">
          Upload
        </NavLink>
        {isLoaded && sessionLinks}
      </li>
    </div>
  );
}

export default Navigation;
