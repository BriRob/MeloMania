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
import { getAllComments } from "../../store/comments";
import AddComment from "../CommentsPage/AddComment";
// import { getAllUserPlaylists } from "../../store/playlists";

const SongDetailPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const song = useSelector((state) => state.songState.songs[id]);
  // console.log("song", song)
  const playlists = useSelector((state) => state.playlistState);
  // const comments = useSelector((state) => state.commentState);

  // console.log("playlists on song detail page", playlists)
  const history = useHistory();

  const [showEditSong, setShowEditSong] = useState(false);
  const [showPlaylistsList, setShowPlaylistsList] = useState(false);
  const [showAddComment, setShowAddComment] = useState(false);

  const [showDeleteQ, setShowDeleteQ] = useState(false);

  // console.log("song comments \n\n", song.Comments)

  useEffect(() => {
    dispatch(getOneSong(id));
    dispatch(getAllPlaylists());
    // dispatch(getAllComments(id));
  }, [dispatch, id]);

  // console.log(Object.values(playlists).length === 0)

  let form = null;
  if (sessionUser && showEditSong) {
    form = <EditSong song={song} hideForm={() => setShowEditSong(false)} />;
  }

  let addComment = null;
  if (sessionUser && showAddComment) {
    addComment = (
      <AddComment songId={song.id} hideForm={() => setShowAddComment(false)} />
    );
  }

  let deleteQ = null;
  if (sessionUser && showDeleteQ) {
    deleteQ = (
      <div className="youSureDelSong">
        <div>Are you sure you want to delete this song?</div>
        <div className="yesNoBtnSong">
          <button
            className="yesDel"
            onClick={() => {
              dispatch(deleteSong(song.id));
              return history.push("/");
            }}
          >
            Yes
          </button>
          <button onClick={() => setShowDeleteQ(false)} className="noDel">
            No
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {song && (
        <div className="song-detail-page">
          <div className="titleEditDiv">
            <h2 className="title">{song.title}</h2>
            <div className="editDelBtn">
              {sessionUser !== undefined &&
                sessionUser !== null &&
                !showEditSong &&
                sessionUser.id === song.userId && (
                  <div>
                    <button
                      className="editSongBtn"
                      onClick={() => setShowEditSong(true)}
                    >
                      Edit Song
                    </button>
                  </div>
                )}
              {sessionUser !== undefined &&
                sessionUser !== null &&
                !showEditSong &&
                sessionUser.id === song.userId &&
                !showDeleteQ && (
                  <div>
                    <button
                      className="delSongBtn"
                      onClick={() => setShowDeleteQ(true)}
                      // onClick={() => {
                      //   dispatch(deleteSong(song.id));
                      //   return history.push("/");
                      // }}
                    >
                      Delete Song
                    </button>
                  </div>
                )}
              {deleteQ}
            </div>
          </div>
          <div className="song-detail-container">
            <ReactAudioPlayer src={song.url} controls />
            {form}
            {!showEditSong && (
              <div className="song-details">
                {sessionUser !== undefined &&
                  sessionUser !== null &&
                  !showPlaylistsList && (
                    <div className="songAddPlayBtn">
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
                <hr></hr>
                <div className="textDetails">
                  <div>
                    <span className="textDetLabels">Uploaded By: </span>
                    <span className="textDetVals">{song.User.username}</span>
                  </div>
                  <div>
                    <span className="textDetLabels">Added: </span>
                    <span className="textDetDate">
                      {moment(song.createdAt).format("ddd MMM D YYYY")}
                    </span>
                  </div>
                  {song.description && (
                    <div className="descLabelAndContent">
                      <div className="textDetLabels">Description:</div>
                      <div className="description">{song.description}</div>
                    </div>
                  )}
                </div>
              </div>
            )}
            <hr></hr>
            <div className="full-comment-section">
              <div className="add-comment-div">
                {sessionUser !== undefined &&
                  sessionUser !== null &&
                  !showAddComment && (
                    <div className="divForAddCommentBtn">
                      <button
                        id="addCommentButton"
                        className="form-btn"
                        onClick={() => setShowAddComment(true)}
                      >
                        Add a comment
                      </button>
                    </div>
                  )}
                {addComment}
              </div>
              <CommentsPage song={song} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SongDetailPage;
