import { useState } from "react";
import { useDispatch } from "react-redux";
import { createNewComment } from "../../store/comments";

const AddComment = ({ songId, hideForm }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {comment, songId };

    let newComment;
    try {
        newComment = await dispatch(createNewComment(payload));
    } catch (res) {
      const data = await res.json();
      if (data && data.errors) {
        setErrors(data.errors);
      } else if (data && data.message) {
        setErrors([data.message]);
      }
    }

    if (newComment) {
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
      {/* ADD COMMENT FORM HERE */}
      <form onSubmit={handleSubmit}>
        <label>
          Add your comment:
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </label>

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
      </form>
    </div>
  );
};

export default AddComment;
