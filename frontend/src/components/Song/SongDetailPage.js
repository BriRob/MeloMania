import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneSong } from "../../store/songs";
import ReactAudioPlayer from "react-audio-player";
import EditSong from "./EditSong";

const SongDetailPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const song = useSelector((state) => state.songState.songs[id]);
  // console.log("song", song)

  const [showEditSong, setShowEditSong] = useState(false);

  useEffect(() => {
    dispatch(getOneSong(id));
  }, [dispatch, id]);

  let form = null;
  if (sessionUser && showEditSong) {
    form = <EditSong song={song} hideForm={() => setShowEditSong(false)}/>;
  }

  return (
    <>
      {song && (
        <div>
          <h2 className="">{song.title}</h2>
          <ReactAudioPlayer src={song.url} controls />
          <div>User: {song.User.username}</div>
          <div> Added {song.createdAt}</div>
          <div>Description: {song.description}</div>
          {(!showEditSong && sessionUser) && (
              <button onClick={() => (setShowEditSong(true))}>Edit</button>
          )}
          {form}
        </div>
      )}
    </>
  );
};

export default SongDetailPage;
