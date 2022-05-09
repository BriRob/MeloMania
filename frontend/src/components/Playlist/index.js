import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route } from "react-router-dom";
import { getAllPlaylists } from "../../store/playlists";
import CreatePlaylist from "./CreatePlaylist";
import PlaylistDetail from "./PlaylistDetail";
import moment from "moment";

import "./Playlist.css";

function Playlists() {
  const dispatch = useDispatch();
  const playlists = useSelector((state) => {
    return state.playlistState;
  });
  //   console.log(playlists)

  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);

  let createPlaylist = (
    <CreatePlaylist hidePlaylist={() => setShowCreatePlaylist(false)} />
  );

  useEffect(() => {
    dispatch(getAllPlaylists());
  }, [dispatch]);

  return (
    <>
      {playlists && (
        <main className="playlistList">
          {/* <div>HELLO?!?!?</div> */}
          <h2 className="title">Playlists by Melomaniacs</h2>
          <div className="playlist-div-submain">
            <div className="subTitle">
              Only the BEST playlists are made by melomaniacs!
              {/* Discover and create your favorite playlists! */}
            </div>
            <div className="subTitle">
              {/* Only the BEST playlists are made by melomaniacs! */}
              Discover and create your favorite playlists!
            </div>
            {!showCreatePlaylist && (
              <button
                onClick={() => setShowCreatePlaylist(true)}
                className="playlist-btn"
              >
                Create a Playlist
              </button>
            )}

            {showCreatePlaylist && createPlaylist}
          </div>
          {/* <br></br> want break line*/}
          <div className="playlists-and-details">
            <div className="playlistContainer">
              {Object.values(playlists)
                ?.reverse()
                .map((playlist) => (
                  <div key={playlist.id} className="each-playlist-div">
                    <Link
                      to={`/playlists/${playlist.id}`}
                      className="playlistTitle"
                    >
                      <div className="pTitle">{playlist.title}</div>
                      <div>
                        <div>{playlist.User.username}</div>
                        <div>
                          {moment(playlist.createdAt).format("ddd MMM D YYYY")}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
            <Route path="/playlists/:id">
              <PlaylistDetail />
            </Route>
          </div>
        </main>
      )}
    </>
  );
}

export default Playlists;
