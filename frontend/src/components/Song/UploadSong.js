import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
// import * as songActions from "../../store/songs";
import { createNewSong } from "../../store/songs";

const UploadSong = () => {
    const sessionUser = useSelector((state => state.session.user))
    const dispatch = useDispatch();
    const history = useHistory();


    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState([]);

    if (!sessionUser) return <Redirect to="/login"/>

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newSong;
    try {
      newSong = await dispatch(createNewSong({ title, url, description }));
    } catch (res) {
      const data = await res.json();
      if (data && data.errors) {
        // console.log(data.errors)
        setErrors(data.errors);
      }
    }

    // return await dispatch(createNewSong({ title, url, description })).catch(
    //   async (res) => {
    //     const data = await res.json();
    //     if (data && data.errors) {
    //       console.log(data.errors);
    //       setErrors(data.errors);
    //     }
    //   }
    // );

    if (newSong) {
      setErrors([]);
      history.push(`/songs/${newSong.id}`);
    }
  };

  const handleCancelClick = (e) => {
      e.preventDefault();
      history.push(`/`);
  };

  return (
    <div>
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
            accept=".mp3, .wav"
            // required
          />
        </label>
        <label>
          Song Url
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            // required
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

export default UploadSong;
