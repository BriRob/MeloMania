import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route } from "react-router-dom";
import { getAllPlaylists } from "../../store/playlists";
import CreatePlaylist from "./CreatePlaylist";
import PlaylistDetail from "./PlaylistDetail";

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
  }, []);

  return (
    <main>
      {/* <div>HELLO?!?!?</div> */}
      <h2>Playlists by Melomaniacs</h2>
      <div>Discover and create your favorite playlists!</div>
      {!showCreatePlaylist && (
        <button
          onClick={() => setShowCreatePlaylist(true)}
          className="form-btn"
        >
          Create a Playlist
        </button>
      )}
      {/* <Route path="/playlists/new-playlist" exact>
              <CreatePlaylist />
            </Route> */}
      {showCreatePlaylist && createPlaylist}
      <div>
        <ul className="playlistContainer">
          {Object.values(playlists).map((playlist) => (
            <div key={playlist.id} className="each-playlist-div">
              <Link to={`/playlists/${playlist.id}`} className="playlistTitle">
                {playlist.title}
              </Link>
              <div>
                <div>{playlist.User.username}</div>
                <div>{playlist.createdAt}</div>
              </div>
            </div>
          ))}
        </ul>
      </div>
      <Route path="/playlists/:id">
        <PlaylistDetail />
      </Route>
    </main>
  );
}

export default Playlists;
