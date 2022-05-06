import moment from "moment";
import { useState } from "react";
import { useSelector } from "react-redux";
import AddComment from "./AddComment";


const CommentsPage = ({ song }) => {
    // console.log(song)
  const sessionUser = useSelector((state) => state.session.user);
  const [showAddComment, setShowAddComment] = useState(false)
  const comments = song.Comments;
  // console.log(comments)

  let addComment = null;
  if (sessionUser && showAddComment) {
      addComment = <AddComment songId={song.id} hideForm={() => setShowAddComment(false)}/>
  }

  return (
    <>
      {/* HELLO?!?! */}
      <button className="form-btn" onClick={() => setShowAddComment(true)}>Add a comment</button>
      {addComment}
      <h3 id="comments-title">Comments</h3>
      <div className="all-comments">
        {comments.map((el) => (
          <div key={el.id}>
            <div className="main-comment">{el.comment}</div>
            <div className="comment-user">{el.User.username}</div>
            <div className="comment-date">{moment(el.createdAt).format("ddd MMM D YYYY")}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CommentsPage;
