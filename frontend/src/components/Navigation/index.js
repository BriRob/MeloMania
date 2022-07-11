import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import ProfileButton from "./ProfileButton";
// import melomanialogo from "../../images/"
import melologo from "../../images/melomania_logo2.png"

import "./Navigation.css";
import NewPlaylistModal from "../Playlist/NewPlaylistModal";

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
      <div className="innerNav">
        <NavLink exact to="/" className="navLink">

          <img src={melologo} className="logo-btn"></img>

          {/* MeloMania */}
          {/* <img src="/images/melomania-logo.png" id="logo"/> */}
        </NavLink>
        <div className="playlistNav">
          <NavLink to="/playlists" className="navLink plLink">
            Playlists
          </NavLink>
          {sessionUser && <NewPlaylistModal />}
        </div>

        <NavLink to="/new-song" className="navLink">
          Upload
        </NavLink>
        {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;
