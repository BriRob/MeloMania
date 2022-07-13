import { useState } from "react";
import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
import { editOneSong } from "../../store/songs";
import "./EditSong.css";

const EditSong = ({ song, hideForm }) => {
  const dispatch = useDispatch();
  // const history = useHistory();
  const [title, setTitle] = useState(song.title);
  const [url, setUrl] = useState(song.url);
  const [description, setDescription] = useState(song.description);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...song,
      title,
      url,
      description,
    };

    let editedSong;
    try {
      editedSong = await dispatch(editOneSong(payload));
    } catch (res) {
      const data = await res.json();
      if (data && data.errors) {
        setErrors(data.errors);
      }
    }

    if (editedSong) {
      setErrors([]);
      hideForm();
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    hideForm();
  };

  return (
    <div className="edit-big-div">
      {/* HELLO?!?!? */}
      {/* <h2>Edit Your Song</h2> */}
      <form onSubmit={handleSubmit} className="edit-song-form">
        {errors && (
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        )}
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            accept=".mp3, .wav"
          />
        </label>
        <label>
          Description
          <textarea
            className="upload-textarea edit-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>
        <div className="upload-button-div">
          <button type="submit" className="form-btn">
            Submit Edit
          </button>
          <button
            type="button"
            onClick={handleCancelClick}
            className="cancel-btn"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditSong;
