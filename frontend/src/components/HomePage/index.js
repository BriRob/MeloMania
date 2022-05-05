import ReactAudioPlayer from "react-audio-player";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllSongs } from "../../store/songs";
import moment from "moment";
// import song from "../../res/tadow-fkj-masego.mp3"
import "./HomePage.css";
// import AddToPlaylist from "../Playlist/AddToPlaylist";

function HomePage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const songs = useSelector((state) => {
    //   console.log("here are songs", state.songState.songs)
    return state.songState.songs;
  });
  // const [showPlaylistsList, setShowPlaylistsList] = useState(false);

  useEffect(() => {
    dispatch(getAllSongs());
  }, [dispatch]);

  // console.log()
  return (
    <div className="home-page">
      <h2 className="title">Welcome to MeloMania!</h2>
      <p>The perfect place to upload and share your music with the world</p>
      <div>
        <ul className="songsContainer">
          {Object.values(songs).map((song) => (
            <div key={song.id} className="each-song-div">
              <Link to={`/songs/${song.id}`} className="songTitle">
                {song.title}
              </Link>
              <div className="uploadedUser">{song.User.username}</div>
              <div className="detail-date">
                {moment(song.createdAt).format("ddd MMM D YYYY")}
              </div>
              {/* {!showPlaylistsList && (
                <button
                  onClick={() => setShowPlaylistsList(true)}
                  className="form-btn"
                >
                  Add to Playlist
                </button>
              )} */}
              {/* {showPlaylistsList && <AddToPlaylist />} */}
              <ReactAudioPlayer src={song.url} controls />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HomePage;
