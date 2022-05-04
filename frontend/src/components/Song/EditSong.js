import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { editOneSong } from "../../store/songs";
import "./EditSong.css"

const EditSong = ({ song, hideForm }) => {
  const dispatch = useDispatch();
  const history = useHistory();
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
        // console.log(data.errors)
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
    <div>
      {/* HELLO?!?!? */}
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
          Song Url
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>
        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>
        <button type="submit">Submit</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditSong;
