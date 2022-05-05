import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
// import * as songActions from "../../store/songs";
import { createNewSong } from "../../store/songs";
import "./UploadSong.css";

const UploadSong = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const [title, setTitle] = useState("");
  // const [url, setUrl] = useState("");
  const [song, setSong] = useState(null);
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);

  if (!sessionUser) return <Redirect to="/login" />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newSong;
    try {
      // newSong = await dispatch(createNewSong({ title, url, description }));
      newSong = await dispatch(createNewSong({ title, song, description }));
    } catch (res) {
      const data = await res.json();
      if (data && data.errors) {
        // console.log(data.errors)
        setErrors(data.errors);
      }
    }

    if (newSong) {
      setErrors([]);
      history.push(`/songs/${newSong.id}`);
    }
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setSong(file);
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    history.push(`/`);
  };

  return (
    <div className="upload-song">
      <h2 className="title">Upload Your Song</h2>
      <form onSubmit={handleSubmit} className="create-song-form">
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
            // required
            />
        </label>
        {/* <label>
          Song Url
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            // accept=".mp3, .wav"
            // required
          />
        </label> */}
        <label>
          <input type="file" onChange={updateFile} />
        </label>
        <label>
          Description
          <textarea
            className="upload-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>
        <div className="upload-button-div">
          <button type="submit" className="form-btn">
            Submit
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

export default UploadSong;
