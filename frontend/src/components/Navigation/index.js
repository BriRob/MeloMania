import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink className="navLink" to="/login">Log In</NavLink>
        <NavLink className="navLink" to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <ul className='navigation'>
      <li>
        <NavLink exact to="/" className="navLink">MeloMania</NavLink>
        <NavLink to="/playlists" className="navLink">Playlists</NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
