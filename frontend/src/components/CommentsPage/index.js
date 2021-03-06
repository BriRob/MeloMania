import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, getAllComments } from "../../store/comments";
import AddComment from "./AddComment";
import "./CommentsPage.css";
import DeleteCommentModal from "./DeleteCommentModal";

const CommentsPage = ({ song }) => {
  // console.log(song)
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);
  const comments = useSelector((state) => state.commentState);

  const commentsArr = Object.values(comments)
    .reverse()
    .filter((comment) => comment.songId === song.id);

  //   console.log("commentsArr \n\n", commentsArr)

  useEffect(() => {
    dispatch(getAllComments(song.id));
  }, [dispatch, song.id]);

  return (
    <div className="bigComments">
      <h2 id="comments-title">Comments</h2>
      <div className="all-comments">
        {commentsArr.map((el) => (
          <div key={el.id} className="each-comment">
            <div className="main-comment">{el.comment}</div>
            <div className="userDateDeleteComment">
              <div className="comment-user">{el.User.username}</div>
              <div className="comment-date">
                {moment(el.createdAt).format("ddd MMM D YYYY")}
              </div>
            {sessionUser !== undefined &&
              sessionUser !== null &&
              sessionUser.id === el.userId && (
                <DeleteCommentModal comment={el}/>
                // <button
                //   className="delete-btn"
                //   onClick={() => {
                //     dispatch(deleteComment(el.id));
                //   }}
                // >
                //   <i className="fa-solid fa-trash-can"></i>
                // </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsPage;
