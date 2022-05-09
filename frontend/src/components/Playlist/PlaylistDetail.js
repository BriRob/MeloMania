import { useEffect } from "react";
import ReactAudioPlayer from "react-audio-player";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { deletePlaylist } from "../../store/playlists";
// import { getOnePlaylist } from "../../store/playlists";

function PlaylistDetail() {
  const { id } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const playlist = useSelector((state) => state.playlistState[id]);
  // console.log("playlist ===>", playlist)
  const dispatch = useDispatch();
  const history = useHistory();

  // console.log("playlist.Songs reversed ===>", playlist?.Songs?.reverse())
  const newList = playlist?.Songs?.reverse()

  //   useEffect(() => {
  //     dispatch(getOnePlaylist(id));
  //   }, [dispatch, id]);

  return (
    <>
      {playlist && (
        <div className="playlist-detail">
          {/* HELLO?!?! {id} */}
          {/* <div className="playlist-positioning"> */}
            <h3>Playlist by {playlist.User.username}</h3>
            <h2>{playlist.title}</h2>
            {sessionUser !== undefined && sessionUser !== null && sessionUser.id === playlist.userId &&(
              <button
                className="delete-btn" id="playlist-delete"
                onClick={() => {
                  dispatch(deletePlaylist(playlist.id));
                  return history.push("/playlists");
                }}
              >
                Delete
              </button>
            )}
            <hr></hr>
            <div className="playlist-songs">
              {newList.map((song) => (
                <div key={song.id} className="each-playlist-song-div">
                  <Link
                    to={`/songs/${song.id}`}
                    className="playlist-song-title"
                  >
                    {song.title}
                  </Link>
                  <div className="playlistUser">User: {song.User.username}</div>
                  <ReactAudioPlayer src={song.url} controls />
                </div>
              ))}
            {/* </div> */}
          </div>
        </div>
      )}
    </>
  );
}

export default PlaylistDetail;
