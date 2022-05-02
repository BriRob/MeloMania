import ReactAudioPlayer from "react-audio-player";
import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getAllSongs } from "../../store/songs";
// import song from "../../res/tadow-fkj-masego.mp3"

function HomePage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const songs = useSelector((state) => {
    //   console.log("here are songs", state.songState.songs)
    return state.songState.songs;
  });

  useEffect(() => {
    dispatch(getAllSongs());
  }, [dispatch]);

  return (
    <div>
      <h2 className="title">Welcome to MeloMania!</h2>
      <p>The perfect place to upload and share your music with the world</p>
      <div className="songsContainer">
        <ul>
          {Object.values(songs).map((song) => (
            <div>
              <div className="songTitle">{song.title}</div>
              <div className="uploadedUser">{song.User.username}</div>
              <div className="detail-date">{song.createdAt}</div>
              <ReactAudioPlayer src={song.url} controls />
            </div>
          ))}
        </ul>

      </div>
    </div>
  );
}

export default HomePage;
