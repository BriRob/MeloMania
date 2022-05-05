import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { createSongsPlaylistRelation, getAllUserPlaylists } from "../../store/playlists";

function AddToPlaylist({ hidePlaylist, song }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const playlists = useSelector((state) => {
    return state.playlistState;
  });
  const [selectPlaylistId, setSelectPlaylistId] = useState()
  const playlistArr = Object.values(playlists).filter((playlist) => playlist.userId === sessionUser.id)
  console.log("playlistArr", playlistArr)

//   console.log("AddToPlaylist", playlists)
  // useEffect(() => {
  //   dispatch(getAllUserPlaylists(sessionUser.id));
  // }, [dispatch, sessionUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(typeof selectPlaylistId)
    // console.log(selectPlaylistId)
    // console.log(song.id)

    let songId = song.id
    let playlistId = selectPlaylistId
    // let newPlaylist;
    // try {
      const newRelation = await dispatch(createSongsPlaylistRelation({ songId, playlistId }));
    // } catch (res) {
    //   const data = await res.json();
    //   if (data && data.errors) {
    //     // console.log(data.errors)
    //     setErrors(data.errors);
    //   }
    // }

    if (newRelation) {
      hidePlaylist();
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    hidePlaylist();
  };

  return (
    <div>
      {/* HELLO?!?! */}
      <form onSubmit={handleSubmit}>
        <select
        value={selectPlaylistId}
        onChange={(e) => setSelectPlaylistId(e.target.value)}>
          <option disabled placeholder="choose playlist">
            choose a playlist
          </option>
          {playlistArr.map((playlist) => (
            <option key={playlist.id} value={playlist.id}>{playlist.title}</option>
          ))}
        </select>
        <button type="submit" className="form-btn">
          Add to Playlist
        </button>
        <button
          type="button"
          onClick={handleCancelClick}
          className="cancel-btn"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddToPlaylist;
