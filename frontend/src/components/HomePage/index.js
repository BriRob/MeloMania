import ReactAudioPlayer from "react-audio-player";
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

function HomePage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div>
      <h2 className="title">Welcome to MeloMania!</h2>
      {/* <p>The perfect place to upload and share your music with the world</p> */}
      {/* <div className="songsContainer">
        <ReactAudioPlayer src="/Users/brirobin/Desktop/aA/Module-5/melomania-solo-project/frontend/public/songs/tadow-fkj-masego.mp3" controls/>
        <div>
          <div className="songTitle">Tadow</div>
          <div className="uploadedUser">fkj</div>
          <span className="detail-date">4 days ago</span>
        </div>
  </div> */}
    </div>
  );
}

export default HomePage;
