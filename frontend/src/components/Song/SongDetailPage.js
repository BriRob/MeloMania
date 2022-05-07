import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteSong, getOneSong } from "../../store/songs";
import ReactAudioPlayer from "react-audio-player";
import moment from "moment";
import AddToPlaylist from "../Playlist/AddToPlaylist";
import { getAllPlaylists } from "../../store/playlists";
import EditSong from "./EditSong";
import CommentsPage from "../CommentsPage";
import "./SongDetailPage.css";
// import { getAllUserPlaylists } from "../../store/playlists";

const SongDetailPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const song = useSelector((state) => state.songState.songs[id]);
  // console.log("song", song)
  const playlists = useSelector((state) => state.playlistState);
  // console.log("playlists on song detail page", playlists)
  const history = useHistory();

  const [showEditSong, setShowEditSong] = useState(false);
  const [showPlaylistsList, setShowPlaylistsList] = useState(false);

  // console.log("song comments \n\n", song.Comments)

  useEffect(() => {
    dispatch(getOneSong(id));
    dispatch(getAllPlaylists());
  }, [dispatch, id]);

  // console.log(Object.values(playlists).length === 0)

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
              <div className="song-details">
                {sessionUser !== undefined &&
                  sessionUser !== null &&
                  !showPlaylistsList && (
                    <div>
                      <button
                        onClick={() => setShowPlaylistsList(true)}
                        className="form-btn"
                      >
                        Add to Playlist
                      </button>
                    </div>
                  )}
                {showPlaylistsList && (
                  <AddToPlaylist
                    hidePlaylist={() => setShowPlaylistsList(false)}
                    song={song}
                  />
                )}
                <div>User: {song.User.username}</div>
                <div>
                  Added: {moment(song.createdAt).format("ddd MMM D YYYY")}
                </div>
                {song.description && (
                  <div>
                    <div>Description:</div>
                    <div>{song.description}</div>
                  </div>
                )}
              </div>
            )}
            {/* {!sessionUser && (
              <div>HELLO</div>
            )} */}
            <div>
              {sessionUser !== undefined &&
                sessionUser !== null &&
                !showEditSong &&
                sessionUser.id === song.userId && (
                  <button
                    className="form-btn"
                    onClick={() => setShowEditSong(true)}
                  >
                    Edit
                  </button>
                )}
              {form}
              {sessionUser !== undefined &&
                sessionUser !== null &&
                !showEditSong &&
                sessionUser.id === song.userId && (
                  <button
                    className="delete-btn"
                    onClick={() => {
                      dispatch(deleteSong(song.id));
                      return history.push("/");
                    }}
                  >
                    Delete
                  </button>
                )}
            </div>
            <div>
              {song.Comments && <CommentsPage song={song}/>}
              {/* <div>Comments</div>
              <div>
                {song.Comments.map(comment => {
                  <div>Ho</div>
                })}
              </div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SongDetailPage;
