import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { Modal } from "../../context/Modal";
import { deleteComment } from "../../store/comments";

function DeleteCommentModal({comment}) {

    const dispatch = useDispatch()
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);

  const [showModal, setShowModal] = useState(false);

  //   if (!sessionUser) return <Redirect to="/login" />

  return (
    <>
      <button
        className="delSongBtn"
        onClick={() => setShowModal(true)}
      >
        <i className="fa-solid fa-trash-can"></i>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="youSureDelSong">
            <div className="delQ">Are you sure you want to delete this comment?</div>
            <div className="yourCommentDel">Your Comment: "{comment.comment}"</div>
            <div className="yesNoBtnSong">
              <button
                className="yesDel"
                onClick={() => {
                dispatch(deleteComment(comment.id));
                }}
              >
                Yes
              </button>
              <button onClick={() => setShowModal(false)} className="noDel">
                No
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default DeleteCommentModal;
