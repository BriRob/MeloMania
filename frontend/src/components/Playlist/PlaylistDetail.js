import { useEffect } from "react";
import ReactAudioPlayer from "react-audio-player";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getOnePlaylist } from "../../store/playlists";

function PlaylistDetail() {
  const { id } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const playlist = useSelector((state) => state.playlistState[id]);
  console.log("playlist ===>", playlist)
  const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getOnePlaylist(id));
//   }, [dispatch, id]);

  return (
    <>
      {playlist && (
        <div>
          {/* HELLO?!?! {id} */}
          <h3>Playlist by {playlist.User.username}</h3>
          <h2>{playlist.title}</h2>
          <ul>
            {playlist.Songs?.map((song) => (
              <div key={song.id}>
                <Link to={`/songs/${song.id}`} className="">
                  {song.title}
                </Link>
                <div>User: {song.User.username}</div>
                <ReactAudioPlayer src={song.url} controls />
              </div>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default PlaylistDetail;
