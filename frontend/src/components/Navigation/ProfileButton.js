import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/");
  };

  const goToProfile = () => {
    history.push(`/users/${user.id}`)
  }

  return (
    <div className="profile-nav-div">
      <button onClick={openMenu}>
        {/* <i className="fas fa-user-circle" /> */}
      {user.username}

      </button>
      {showMenu && (
        <div className="profile-dropdown">
          {/* <li>{user.username}</li> */}
          <div>{user.email}</div>
          <button className="profBtn" onClick={goToProfile}>Profile</button>
          {/* <div> */}
            <button onClick={logout} className="logout-btn">Log Out</button>
          {/* </div> */}
        </div>
      )}
    </div>
  );
}

export default ProfileButton;
