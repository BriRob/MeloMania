import { useState } from "react";
import { useDispatch } from "react-redux";
import { createNewComment } from "../../store/comments";

const AddComment = ({ songId, hideForm }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log("in handle submit")

    const payload = { comment, songId };

    let newComment;
    try {
      newComment = await dispatch(createNewComment(payload));
    } catch (res) {
      const data = await res.json();
      if (data && data.errors) {
        setErrors(data.errors);
        // console.log("there are errors")
      }
    }

    if (newComment) {
      setErrors([]);
      // console.log("successful submit")
      hideForm();
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    hideForm();
  };

  return (
    <div className="addCommentFormDiv">
      {/* ADD COMMENT FORM HERE */}
      <form onSubmit={handleSubmit}>
        {errors && (
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        )}
        <label>
          Your comment:
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </label>
        <div>
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

export default AddComment;
