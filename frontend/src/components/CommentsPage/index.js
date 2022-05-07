import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, getAllComments } from "../../store/comments";
import AddComment from "./AddComment";

const CommentsPage = ({ song}) => {
  // console.log(song)
  const dispatch = useDispatch();


  const sessionUser = useSelector((state) => state.session.user);
  const comments = useSelector((state) => state.commentState);

  const commentsArr = Object.values(comments).reverse().filter(comment => comment.songId === song.id)
//   const [showAddComment, setShowAddComment] = useState(false);
  //   const comments = song.Comments;
  console.log("commentsArr \n\n", commentsArr)

  useEffect(() => {
    dispatch(getAllComments(song.id));
  }, [dispatch, song.id]);

//   let addComment = null;
//   if (sessionUser && showAddComment) {
//     addComment = (
//       <AddComment songId={song.id} hideForm={() => setShowAddComment(false)} />
//     );
//   }

  return (
    <>
      {/* HELLO?!?! */}
      {/* {sessionUser !== undefined && sessionUser !== null && !showAddComment && (
        <button className="form-btn" onClick={() => setShowAddComment(true)}>
          Add a comment
        </button>
      )} */}
      {/* {addComment} */}
      <h3 id="comments-title">Comments</h3>
      <div className="all-comments">
        {commentsArr
          .map((el) => (
            <div key={el.id}>
              <div className="main-comment">{el.comment}</div>
              <div className="comment-user">{el.User.username}</div>
              <div className="comment-date">
                {moment(el.createdAt).format("ddd MMM D YYYY")}
              </div>
              {sessionUser !== undefined &&
                sessionUser !== null &&
                sessionUser.id === el.userId && (
                  <button
                    className="delete-btn"
                    onClick={() => {
                      dispatch(deleteComment(el.id));
                      // return history.push("/");
                    }}
                  >
                    Delete
                  </button>
                )}
            </div>
          ))}
      </div>
    </>
  );
};

export default CommentsPage;
