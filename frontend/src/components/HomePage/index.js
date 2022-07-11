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

  // const songsArr = Object.values(songs).reverse()
  // console.log("songsArr in homepage component \n\n", songsArr)
  useEffect(() => {
    dispatch(getAllSongs());
  }, [dispatch]);

  // console.log()
  return (
    <div className="home-page">
      {/* <div className="logoDiv">
        <img src="/images/Logo_Gry_1_Lrg.png" id="logo" />
      </div> */}
      <h2 className="title">Welcome to MeloMania!</h2>
      <p>The perfect place to upload and share your music with the world</p>
      <div>
        <ul className="songsContainer">
          <h2 className="discoverSongs">Discover Songs</h2>
          <hr></hr>
          <div className="smallerContainer">
            {Object.values(songs)
              .reverse()
              .map((song) => (
                <div key={song.id} className="each-song-div">
                  <Link to={`/songs/${song.id}`} className="songTitle">
                    {song.title}
                  </Link>
                  <div className="artist-date-div">
                    <div className="uploadedUser">{song.User.username}</div>
                    <div className="detail-date">
                      {moment(song.createdAt).format("ddd MMM D YYYY")}
                    </div>
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
                  <ReactAudioPlayer src={song.url} controls className="" />
                </div>
              ))}
          </div>
        </ul>
      </div>
    </div>
  );
}

export default HomePage;
