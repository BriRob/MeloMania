import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteSong, getOneSong } from "../../store/songs";
import ReactAudioPlayer from "react-audio-player";
import EditSong from "./EditSong";
import "./SongDetailPage.css";

const SongDetailPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const song = useSelector((state) => state.songState.songs[id]);
  // console.log("song", song)
  const history = useHistory();

  const [showEditSong, setShowEditSong] = useState(false);

  useEffect(() => {
    dispatch(getOneSong(id));
  }, [dispatch, id]);

  let form = null;
  if (sessionUser && showEditSong) {
    form = <EditSong song={song} hideForm={() => setShowEditSong(false)} />;
  }

  return (
    <>
      {song && (
        <div className="song-detail-page">
          <h2 className="title">{song.title}</h2>
          <div className="song-detail-container">
            <ReactAudioPlayer src={song.url} controls />
            {!showEditSong && (
              <div>
                <div>User: {song.User.username}</div>
                <div> Added {song.createdAt}</div>
                <div>Description: {song.description}</div>
              </div>
            )}
            {!showEditSong && sessionUser.id === song.userId && (
              <button className="form-btn" onClick={() => setShowEditSong(true)}>Edit</button>
            )}
            {form}
            {!showEditSong && sessionUser.id === song.userId && (
              <button
              className="delete-btn"
                onClick={() => {
                  dispatch(deleteSong(song.id, sessionUser.id));
                  return history.push("/");
                }}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SongDetailPage;
