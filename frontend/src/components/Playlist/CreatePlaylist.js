import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { createNewPlaylist } from "../../store/playlists";
import './Playlist.css'

function CreatePlaylist({ hidePlaylist }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
    const history = useHistory();

  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState([]);

  if (!sessionUser) return <Redirect to="/login" />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newPlaylist;
    try {
      newPlaylist = await dispatch(createNewPlaylist({ title }));
    } catch (res) {
      const data = await res.json();
      if (data && data.errors) {
        // console.log(data.errors)
        setErrors(data.errors);
      }
    }

    if (newPlaylist) {
      setErrors([]);
      hidePlaylist();
      history.push(`/playlists/${newPlaylist.id}`)
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    hidePlaylist();
  };

  return (
    <div className="newPlaylist">
      {/* HELLO?!?! */}
      {errors.length > 0 && (
          <div className="errorsDiv">
            <div className="followingErrors">
              The following errors have occured:{" "}
            </div>
            <ul className="loginUl">
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      <form onSubmit={handleSubmit} className="create-playlist-form">
        <label>
          Playlist Title*
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <div className="upload-button-div">
          <button className="form-btn">Submit</button>
          <button
            type="button"
            onClick={handleCancelClick}
            className="cancel-btn"
          >
            Cancel
          </button>
        </div>
        <div className="req">*This area is required</div>
      </form>
    </div>
  );
}

export default CreatePlaylist;
