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
  const [url, setUrl] = useState(null);
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);

  if (!sessionUser) return <Redirect to="/login" />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newSong;
    try {
      // newSong = await dispatch(createNewSong({ title, url, description }));
      newSong = await dispatch(createNewSong({ title, url, description }));
    } catch (res) {
      const data = await res.json();
      // console.log(data)
      if (data && data.errors) {
        // console.log(data.errors)
        setErrors(data.errors);
      } else if (data && data.message) {
        // console.log(data)
        // console.log("data message", data.message)
        setErrors([data.message])
      }
    }

    if (newSong) {
      setErrors([]);
      history.push(`/songs/${newSong.id}`);
    }
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setUrl(file);
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    history.push(`/`);
  };

  return (
    <div className="upload-song">
      <h2 className="title">Upload Your Song</h2>
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
      <form onSubmit={handleSubmit} className="create-song-form">
        <label>
          Title*
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
        {/* <label className="file-label"> */}
          <input type="file" onChange={updateFile} accept=".mp3" id="file-upload"/>
        {/* </label> */}
        <label>
          Description
          <textarea
            className="upload-textarea"
            placeholder="optional"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>
          <div className="afterClick">After clicking "submit", please allow a few seconds for the song to upload</div>
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
        <div className="req">*These areas are required</div>
      </form>
    </div>
  );
};

export default UploadSong;
