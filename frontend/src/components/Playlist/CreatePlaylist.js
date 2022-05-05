import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { createNewPlaylist } from "../../store/playlists";

function CreatePlaylist({ hidePlaylist }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
//   const history = useHistory();

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
        {errors && (
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        )}
        <label>
          Playlist Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <button className="form-btn">Submit</button>
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

export default CreatePlaylist;